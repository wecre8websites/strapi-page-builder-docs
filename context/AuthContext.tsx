'use client';
import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { createContext, FC, ReactNode, useCallback, useEffect, useState } from "react";
import { auth, firestore } from "../firebase/firebaseConfig";
import { useRouter } from "next/navigation";

type UserDoc = {
  stripeId: string,
  plan: "development" | "production"
  keys?: {
    name: string,
    key: string
  }[]
}

const developmentHostnames = ["localhost", "127.0.0.1"]

type AuthContextType = {
  user: User | null;
  userDoc: UserDoc | null;
  signIn: (redirect?: string) => void;
  signOut: () => void;
  createApiKey: (name: string) => Promise<void>;
  revokeApiKey: (key: string) => Promise<void>;
  /** Set when the account document could not be loaded; cleared by retryAccount. */
  accountError: string | null;
  retryAccount: () => void;
}

enum AuthErrors {
  MISSING_USER = "MISSING_URER",
  MISSING_WEB_URL = "MISSING_WEB_URL",
  INVALID_PLAN = "INVALID_PLAN",
  INVALID_HOST_NAME = "INVALID_HOST_NAME",
  REQUIRES_UPGRADE = "REQUIRES_UPGRADE",
  INVALID_KEY_NAME = "INVALID_KEY_NAME"
}

const GoogleProvider = new GoogleAuthProvider();
GoogleProvider.setCustomParameters({ context: "strapi-page-builder" });

// Override to point the account page at a local or staging licence server
const LICENCE_SERVER = process.env.NEXT_PUBLIC_LICENCE_SERVER_URL || "https://licence.wc8.io/strapi-page-builder/auth"


export const AuthContext = createContext<AuthContextType>({
  user: null,
  userDoc: null,
  signIn: () => { },
  signOut: () => { },
  createApiKey: async () => { },
  revokeApiKey: async () => { },
  accountError: null,
  retryAccount: () => { }
});

/** Thrown by createApiKey / revokeApiKey with a message that is safe to show the user. */
export class ApiKeyError extends Error { }

const LICENCE_ERRORS: Record<string, string> = {
  UPGRADE_REQUIRED: "The Development plan allows one API key. Upgrade to Production to create more.",
  KEY_LIMIT_REACHED: "You have reached the API key limit for your plan.",
  INVALID_KEY_NAME: "You already have a key with that name. Choose another name.",
};

// Calls the licence server and turns every failure (network, timeout, HTTP error) into an ApiKeyError with a readable message
const licenceRequest = async (method: "POST" | "DELETE", token: string, body: object) => {
  let response: Response;
  try {
    response = await fetch(LICENCE_SERVER, {
      method,
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(15000),
    });
  } catch (error) {
    console.error("[AuthProvider] licence server unreachable", error);
    throw new ApiKeyError("We couldn't reach the licence server. Check your connection and try again.");
  }
  if (response.ok) return;
  const code = (await response.json().catch(() => null) as { error?: string } | null)?.error;
  console.error("[AuthProvider] licence server error", response.status, code);
  if (code && LICENCE_ERRORS[code]) throw new ApiKeyError(LICENCE_ERRORS[code]);
  if (response.status === 401) throw new ApiKeyError("Your session has expired. Sign out, sign in again and retry.");
  if (response.status === 404) throw new ApiKeyError("That API key no longer exists.");
  throw new ApiKeyError(`The licence server returned an error (${response.status}). Please try again.`);
};

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { push } = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [userDoc, setUserDoc] = useState<UserDoc | null>(null);
  const [signInError, setSignInError] = useState<string | null>(null);
  const [accountError, setAccountError] = useState<string | null>(null);
  const [accountAttempt, setAccountAttempt] = useState(0);
  const [stripeCustomerSession, setStripeCustomerSession] = useState<string | null>(null);


  useEffect(() => {
    const authSubscription = auth.onAuthStateChanged(async (user) => {
      setUser(user);
    })
    return () => {
      authSubscription && authSubscription();
    }
  }, [auth]);

  useEffect(() => {
    if (!user || !user?.uid) return;
    setAccountError(null);
    const userDocSubscription = onSnapshot(doc(firestore, "strapi-page-builder", "auth", "accounts", user.uid), async (doc) => {
      const userDocData = doc.data();
      setUserDoc(userDocData as UserDoc);
      setAccountError(null);
    }, (error) => {
      console.error("[AuthProvider] account subscription error", error);
      setAccountError("We couldn't load your account details.");
    });
    return () => {
      userDocSubscription && userDocSubscription();
    }
  }, [firestore, user, accountAttempt]);

  const retryAccount = useCallback(() => setAccountAttempt((attempt) => attempt + 1), []);

  const signIn = async (redirect?: string) => {
    try {
      const result = await signInWithPopup(auth, GoogleProvider);
      window.gtag("sign_in", { user_id: result.user.uid });
      if (redirect) push(redirect);
    } catch (error) {
      console.error("[AuthProvider] signIn error", error);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      setUserDoc(null);
    } catch (error) {
      console.error("[AuthProvider] signOut error", error);
    }
  };

  const createApiKey = useCallback(async (name: string) => {
    if (!user || !user.uid) throw new ApiKeyError("You are signed out. Sign in and try again.");
    const trimmed = name.trim();
    if (!trimmed) throw new ApiKeyError("Enter a name for the key.");
    if (userDoc?.keys && userDoc.keys.find(k => k.name === trimmed)) throw new ApiKeyError(LICENCE_ERRORS.INVALID_KEY_NAME);
    await licenceRequest("POST", await user.getIdToken(), { name: trimmed });
  }, [user, userDoc]);

  const revokeApiKey = useCallback(async (key: string) => {
    if (!user || !user.uid) throw new ApiKeyError("You are signed out. Sign in and try again.");
    if (!userDoc?.keys || !userDoc.keys.find(k => k.key === key)) throw new ApiKeyError("That API key no longer exists.");
    await licenceRequest("DELETE", await user.getIdToken(), { key });
  }, [user, userDoc]);

  return (
    <AuthContext.Provider value={{ user, userDoc, signIn, signOut, createApiKey, revokeApiKey, accountError, retryAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
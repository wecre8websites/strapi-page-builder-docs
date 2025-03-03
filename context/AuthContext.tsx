'use client';
import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { createContext, FC, ReactNode, useCallback, useEffect, useState } from "react";
import { auth, firestore } from "../firebase/firebaseConfig";

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
  signIn: () => void;
  signOut: () => void;
  createApiKey: (name: string) => Promise<void>;
  revokeApiKey: (key: string) => Promise<void>;
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

// const LICENCE_SERVER = "https://licence.wc8.io/strapi-page-builder"
const LICENCE_SERVER = `http://127.0.0.1:5001/licence-server-682e3/us-central1/routes/strapi-page-builder/auth`


export const AuthContext = createContext<AuthContextType>({
  user: null,
  userDoc: null,
  signIn: () => { },
  signOut: () => { },
  createApiKey: async () => { },
  revokeApiKey: async () => { }
});

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {

  const [user, setUser] = useState<User | null>(null);
  const [userDoc, setUserDoc] = useState<UserDoc | null>(null);
  const [signInError, setSignInError] = useState<string | null>(null);
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
    if (!user || !user?.uid) {
      console.log("[AuthProvider] userDoc, missing user", user);
      return;
    } else {
      console.log("[AuthProvider] userDoc, user", user);
    }
    const userDocSubscription = onSnapshot(doc(firestore, "strapi-page-builder", "auth", "accounts", user.uid), async (doc) => {
      const userDocData = doc.data();
      console.log("[AuthProvider] userDoc", userDocData);
      setUserDoc(userDocData as UserDoc);
    });
    return () => {
      userDocSubscription && userDocSubscription();
    }
  }, [firestore, user]);

  const signIn = async () => {
    try {
      await signInWithPopup(auth, GoogleProvider);
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
    if (!user || !user.uid) throw new Error(AuthErrors.MISSING_USER);
    // if (!web_url) throw new Error(AuthErrors.MISSING_WEB_URL);
    if (!userDoc?.plan) throw new Error(AuthErrors.INVALID_PLAN);

    if (userDoc.keys && userDoc.keys.find(k => k.name === name)) throw new Error(AuthErrors.INVALID_KEY_NAME)

    const token = await user.getIdToken();
    const response = await fetch(`${LICENCE_SERVER}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name })
    })
    if (response.status < 200 || response.status >= 300) {
      console.error("[AuthProvider] createApiKey error", response.statusText);
      return;
    }
  }, [user, userDoc]);

  const revokeApiKey = useCallback(async (key: string) => {
    if (!user || !user.uid) throw new Error(AuthErrors.MISSING_USER);
    if (!userDoc?.keys || userDoc.keys.length === 0 || !userDoc.keys.find(k => k.key === key)) throw new Error(AuthErrors.INVALID_KEY_NAME);
    const token = await user.getIdToken();
    const response = await fetch(`${LICENCE_SERVER}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"

      },
      body: JSON.stringify({ key })
    })
    if (response.status < 200 || response.status >= 300) {
      console.error("[AuthProvider] revokeApiKey error", response.statusText);
      return;
    }
  }, [user, userDoc]);

  return (
    <AuthContext.Provider value={{ user, userDoc, signIn, signOut, createApiKey, revokeApiKey }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
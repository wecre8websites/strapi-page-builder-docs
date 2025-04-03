'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { AuthContext } from '@/context/AuthContext';
import { Trash2 } from "lucide-react";
import Script from "next/script";
import { FC, useContext, useState } from 'react';
import Features, { FeaturesProps } from "../Features";
import LoginButton from "../LoginButton";

type AccountProps = {}

const featuresProps: FeaturesProps = {
  features: [
    {
      forceDirection: "right",
      heading: "Sign up now for free",
      content: "No credit card required. No comittment. Get started in a few minutes. Try Page Builder today!",
      cta: {
        component: <LoginButton text="Sign in or create an account" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-feature-500 hover:bg-feature-500/90" />,
      },
      video: {
        src: "/pagebuilder_video.mp4"
      }
    },
  ]
}

const Account: FC<AccountProps> = ({ }) => {
  const { user, userDoc, signIn, signOut, createApiKey, revokeApiKey } = useContext(AuthContext);
  const [newKeyPopoverOpen, setNewKeyPopoverOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [revokeKeyPopoverOpen, setRevokeKeyPopoverOpen] = useState("");

  return (<section className="bg-neutral-900 text-white py-24 relative overflow-hidden min-h-screen" onClick={() => newKeyPopoverOpen ? setNewKeyPopoverOpen(false) : revokeKeyPopoverOpen ? setRevokeKeyPopoverOpen("") : null}>
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {user
        ? <div className='flex flex-col md:flex-row gap-24 md:gap-0'>
          <div className='flex-grow min-w-1/2 px-16'>
            <div className="flex justify-between items-center mb-8">
              <span className="text-neutral-300">Signed in as {user?.email}</span>
              <Button onClick={() => signOut()}>Sign out</Button>
            </div>
            <div className="relative max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                API Keys
              </h2>
              <p className="text-lg sm:text-xl text-neutral-300 mb-10">
                Manage your Page Builder API keys here.
              </p>
            </div>
            <Table className="w-full">
              {!userDoc?.keys || userDoc?.keys?.length <= 0 || (userDoc?.plan === "production" && userDoc?.keys?.length < 5)
                ? <TableCaption>
                  <Popover open={newKeyPopoverOpen} onOpenChange={(isOpen) => {
                    if (!isOpen) {
                      setNewKeyName("");
                    }
                  }}>
                    <PopoverTrigger onClick={() => setNewKeyPopoverOpen(true)}><div className="cursor-pointer inline-flex items-center justify-center px-6 py-2 border border-transparent text-lg font-medium rounded-md text-white bg-feature-500 hover:bg-feature-500/90 transition-all duration-300">Create an API Key</div></PopoverTrigger>
                    <PopoverContent className="w-80" onClick={(e) => e.stopPropagation()}>
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">New API Key</h4>
                        </div>
                        <div className="flex w-full max-w-sm items-center space-x-2">
                          <Input type="text" name="key_name" placeholder="Key name" value={newKeyName} onChange={(v) => setNewKeyName(v.currentTarget.value)} />
                          <Button
                            type="button"
                            disabled={!newKeyName || !!userDoc?.keys?.find(k => k.name === newKeyName)}
                            onClick={async () => {
                              await createApiKey(newKeyName);
                              setNewKeyPopoverOpen(false);
                            }}>Create</Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCaption>
                : null}
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Key</TableHead>
                  <TableHead className='text-center w-8'>Revoke</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userDoc?.keys?.map((key) => (<TableRow key={key.name}>
                  <TableCell className="font-medium">{key.name}</TableCell>
                  <TableCell>{key.key}</TableCell>
                  <TableCell className='text-center'>
                    <Popover open={revokeKeyPopoverOpen === key.key}>
                      <PopoverTrigger onClick={() => setRevokeKeyPopoverOpen(key.key)}><Trash2 size={16} /></PopoverTrigger>
                      <PopoverContent className="w-80" onClick={(e) => e.stopPropagation()}>
                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <h4 className="font-medium leading-none">Revoke API key</h4>
                            <p>This action will revoke the API key named "{key.name}" immediately. This action cannot be undone.</p>
                            <p>Are you sure you want to continue?</p>
                          </div>
                          <div className="flex w-full max-w-sm justify-between">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={async () => {
                                setRevokeKeyPopoverOpen("");
                              }}>Cancel</Button>
                            <Button
                              type="button"
                              variant={"destructive"}
                              onClick={async () => {
                                await revokeApiKey(key.key)
                                setRevokeKeyPopoverOpen("");
                              }}>Revoke</Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>))}
              </TableBody>
            </Table>
            {user && userDoc?.plan === "production" && (userDoc?.keys?.length || 0) >= 5
              ? <div className="relative text-center mt-6">
                <p className="text-base sm:text-lg text-neutral-300 mb-10">
                  API Key limit reached.
                </p>
              </div>
              : null}
            {user && userDoc?.plan !== "production" && (userDoc?.keys?.length || 0) > 0
              ? <div className="relative text-center mt-6">
                <h3 className="text-lg sm:text-1xl md:text-2xl font-bold text-white mb-6">
                  Need more keys?
                </h3>
                <p className="text-base sm:text-lg text-neutral-300 mb-10">
                  The Development tier is limited to one API key per account. Upgrade to the Production tier to unlock more keys.
                </p>
              </div>
              : null}
          </div>
          {user && userDoc?.plan !== "production" ?
            <div className="flex flex-col items-center min-w-1/2">
              <div className="relative max-w-1/2 mx-auto text-center">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6">
                  Ready for production?
                </h2>
                <p className="text-lg sm:text-xl text-neutral-300 mb-10">
                  Upgrade your Page Builder account to unlock more features.
                </p>
              </div>

              <div className="min-w-full">
                <Script src="https://js.stripe.com/v3/pricing-table.js" />
                {/* @ts-expect-error Property 'stripe-pricing-table' does not exist on type 'JSX.IntrinsicElements' */}
                <stripe-pricing-table
                  pricing-table-id={process.env.NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID}
                  publishable-key={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
                  customer-email={user.email || undefined}
                />
              </div>
            </div>
            : null}
        </div>
        : <div>
          <Features {...featuresProps} />
        </div>}
    </div>
  </section>
  );
};

export default Account;
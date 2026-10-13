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
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import Script from 'next/script';
import { FC, useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { KeyActionError, useKeyAction } from './KeyAction';

declare namespace JSX {
  interface IntrinsicElements {
    'stripe-pricing-table': {
      //key: string;
      'pricing-table-id': string;
      'publishable-key': string;
      'client-reference-id'?: string;
    };
  }
}

type SignUpFormProps = {}

export const SignUpForm: FC<SignUpFormProps> = ({ }) => {
  const { user, userDoc, signIn, signOut, createApiKey, revokeApiKey } = useContext(AuthContext);
  const [newKeyPopoverOpen, setNewKeyPopoverOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const { busy, error: actionError, run, clear: clearActionError } = useKeyAction();

  return (
    <div className='flex flex-col gap-4 w-full mb-6'>
      {!user || !user.uid
        ? <>
          <ul className="list-disc list-inside mt-6">
            <li>Quick installation and setup.</li>
            <li>Build custom components that can be reused in any template.</li>
            <li>Add, remove, change, drag and drop components and sections with an easy to use interface.</li>
            <li>Connect your CMS data and use it in your custom components with no additional coding.</li>
            <li>Reuse templates and fill them with dynamic data.</li>
            <li>Use Strapi's Role-based access control to restrict permissions to only content editors.</li>
            <li>Allows non-technical users to manage and update content quickly and easily.</li>
          </ul>
          <div className='flex gap-2 pt-4'>
            <button type="button" onClick={() => signIn()} className='button'>Sign in or create an account</button>
          </div>
        </>
        : <>
          <div className='flex gap-2 justify-end'>
            {userDoc?.plan === "production" ? <a href="https://billing.stripe.com/p/login/eVa8AgbZD2ky9sk7ss" target="_blank" className='border rounded p-2'>Manage subscription</a> : null}
            <button type="button" onClick={signOut} className='border rounded p-2'>Sign out</button>
          </div>
          {user && userDoc?.plan !== "production" ?
            <>
              <Script src="https://js.stripe.com/v3/pricing-table.js" />
              {/* @ts-expect-error Property 'stripe-pricing-table' does not exist on type 'JSX.IntrinsicElements' */}
              <stripe-pricing-table
                pricing-table-id={process.env.NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID}
                publishable-key={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
                customer-email={user.email || undefined}
              />
            </>
            : null}
          <div>
            <span className='text-xl font-bold'>Strapi Page Builder API Keys</span>
          </div>
          <Table className="w-full">
            {!userDoc?.keys || userDoc?.keys?.length <= 0 || userDoc?.plan === "production"
              ? <TableCaption>
                <Popover open={newKeyPopoverOpen} onOpenChange={(isOpen) => {
                  if (!isOpen) {
                    setNewKeyName("");
                    clearActionError();
                  }
                }}>
                  <PopoverTrigger onClick={() => setNewKeyPopoverOpen(true)}>Create an API Key</PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">New API Key</h4>
                      </div>
                      <div className="flex w-full max-w-sm items-center space-x-2">
                        <Input type="text" name="key_name" placeholder="Key name" value={newKeyName} onChange={(v) => setNewKeyName(v.currentTarget.value)} />
                        <Button
                          type="button"
                          disabled={busy || !newKeyName.trim() || !!userDoc?.keys?.find(k => k.name === newKeyName.trim())}
                          onClick={() => run(() => createApiKey(newKeyName), () => setNewKeyPopoverOpen(false))}>{busy ? "Creating…" : "Create"}</Button>
                      </div>
                      <KeyActionError error={actionError} busy={busy} retry={() => run(() => createApiKey(newKeyName), () => setNewKeyPopoverOpen(false))} />
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
                  <button type="button" onClick={() => {
                    const result = confirm(`Are you sure you want to revoke the key named ${key.name}?`);
                    if (result) {
                      run(() => revokeApiKey(key.key), () => { });
                    }
                  }}>
                    <Trash2 size={16} />
                  </button>
                  {actionError ? <KeyActionError error={actionError} busy={busy} retry={() => run(() => revokeApiKey(key.key), () => { })} /> : null}
                </TableCell>
              </TableRow>))}
            </TableBody>
          </Table>
        </>}
    </div>
  );
}
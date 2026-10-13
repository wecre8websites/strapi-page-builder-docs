'use client';
import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";

/** Runs one API key action at a time; a failure is kept as a message so the UI can show it with a retry. */
export const useKeyAction = () => {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const run = useCallback(async (action: () => Promise<void>, onSuccess: () => void) => {
    setBusy(true);
    setError(null);
    try {
      await action();
      onSuccess();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }, []);
  const clear = useCallback(() => setError(null), []);
  return { busy, error, run, clear };
};

export const KeyActionError = ({ error, busy, retry }: { error: string | null, busy: boolean, retry: () => void }) => error
  ? <div role="alert" className="rounded border border-red-500/50 bg-red-950/40 p-3 text-sm text-red-200">
    <p>{error}</p>
    <Button type="button" size="sm" variant="outline" className="mt-2" disabled={busy} onClick={retry}>Retry</Button>
  </div>
  : null;

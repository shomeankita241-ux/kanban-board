"use client";

import * as React from "react";
import { nhost } from "@/lib/nhost";
import {
  useAuthenticationStatus,
  useSignInEmailPassword,
  useSignOut,
  useSignUpEmailPassword,
} from "@nhost/react";
import { Button } from "@/components/ui/button";

export default function AuthPage() {
  const { isAuthenticated } = useAuthenticationStatus();
  const { signOut } = useSignOut();
  const {
    signInEmailPassword,
    isLoading: signingIn,
    error: signInError,
  } = useSignInEmailPassword();
  const {
    signUpEmailPassword,
    isLoading: signingUp,
    error: signUpError,
    needsEmailVerification,
  } = useSignUpEmailPassword();

  const [mode, setMode] = React.useState<"in" | "up">("in");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (mode === "in") {
      await signInEmailPassword(email, password);
    } else {
      await signUpEmailPassword(email, password, {
        displayName: email.split("@")[0],
      });
    }
  }

  if (isAuthenticated) {
    return (
      <main className="mx-auto max-w-md p-6 space-y-4">
        <h1 className="text-2xl font-bold">Auth</h1>
        <p className="text-sm">Signed in as <b>{nhost.auth.getUser()?.email}</b></p>
        <Button onClick={() => signOut()}>Sign out</Button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-md p-6 space-y-4">
      <h1 className="text-2xl font-bold">
        {mode === "in" ? "Sign in" : "Create account"}
      </h1>

      <form onSubmit={onSubmit} className="space-y-3">
        <input
          className="w-full rounded border p-2"
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          required
        />
        <input
          className="w-full rounded border p-2"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          required
        />
        <div className="flex items-center gap-3">
          <Button type="submit" disabled={signingIn || signingUp}>
            {mode === "in" ? (signingIn ? "Signing in…" : "Sign in") : (signingUp ? "Signing up…" : "Sign up")}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setMode((m) => (m === "in" ? "up" : "in"))}
          >
            {mode === "in" ? "Create account" : "Have an account? Sign in"}
          </Button>
        </div>
      </form>

      {signInError && (
        <p className="text-sm text-red-600">{signInError.message}</p>
      )}
      {signUpError && (
        <p className="text-sm text-red-600">{signUpError.message}</p>
      )}
      {needsEmailVerification && mode === "up" && (
        <p className="text-sm text-blue-700">
          Check your inbox to verify your email before signing in.
        </p>
      )}
    </main>
  );
}

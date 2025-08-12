"use client";

import * as React from "react";
import { nhost } from "@/lib/nhost";
import { useAuthenticationStatus, useSignInEmailPassword, useSignOut } from "@nhost/react";
import { Button } from "@/components/ui/button";

export default function AuthPage() {
  const { isAuthenticated } = useAuthenticationStatus();
  const { signInEmailPassword, isLoading, error } = useSignInEmailPassword();
  const { signOut } = useSignOut();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await signInEmailPassword(email, password);
  }

  return (
    <main className="mx-auto max-w-md p-6 space-y-4">
      <h1 className="text-2xl font-bold">Auth Test</h1>

      {isAuthenticated ? (
        <div className="space-y-3">
          <p className="text-sm">Signed in as <b>{nhost.auth.getUser()?.email}</b></p>
          <Button onClick={() => signOut()}>Sign out</Button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-3">
          <input
            className="w-full rounded border p-2"
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <input
            className="w-full rounded border p-2"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <div className="flex items-center gap-3">
            <Button type="submit" disabled={isLoading}>Sign in</Button>
            {error && <span className="text-sm text-red-600">{error.message}</span>}
          </div>
        </form>
      )}
    </main>
  );
}

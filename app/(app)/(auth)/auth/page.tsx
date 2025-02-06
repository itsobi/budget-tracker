'use client';

import { Button } from '@/components/ui/button';
import { GoogleLogo } from '@/components/logos/GoogleLogo';
import { GitHubLogo } from '@/components/logos/GitHubLogo';
import { useAuthActions } from '@convex-dev/auth/react';

export default function SignInPage() {
  const { signIn } = useAuthActions();

  return (
    <main className="h-screen flex justify-center pt-20">
      <div className="flex flex-col gap-2 border h-fit p-12 rounded-md shadow-md">
        <h1 className="text-2xl font-semibold italic text-center">TracKiT</h1>
        <h1 className="text-sm lg:text-2xl">Sign in or create an account</h1>

        <div className="flex items-center justify-center gap-2 mt-2">
          <Button
            onClick={() => void signIn('google', { redirectTo: '/dashboard' })}
            className="flex items-center gap-2"
          >
            <GoogleLogo />
            <span>Google</span>
          </Button>
          <Button
            onClick={() => void signIn('github', { redirectTo: '/dashboard' })}
            className="flex items-center gap-2"
          >
            <GitHubLogo />
            <span>Github</span>
          </Button>
        </div>
      </div>
    </main>
  );
}

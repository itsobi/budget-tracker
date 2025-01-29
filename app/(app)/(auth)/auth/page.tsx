'use client';

import { Button } from '@/components/ui/button';
import { GoogleLogo } from '@/components/logos/GoogleLogo';
import { GitHubLogo } from '@/components/logos/GitHubLogo';
import { useAuthActions } from '@convex-dev/auth/react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignInPage() {
  const { signIn } = useAuthActions();
  const router = useRouter();
  const userId = useQuery(api.helpers.getUserId);

  useEffect(() => {
    if (userId) {
      router.push('/dashboard');
    }
  }, [userId]);

  return (
    <main className="h-screen flex justify-center pt-20">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold italic text-center">TracKiT</h1>
        <h1 className="text-2xl">Sign in or create an account</h1>

        <div className="flex items-center gap-2 mb-4">
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

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-background px-1 text-sm">OR CONTINUE WITH</span>
          </div>
        </div>
      </div>
    </main>
  );
}

'use server';

import { signIn } from '@/auth';
import { Button } from '@/components/ui/button';

interface SignInButtonProps {
  children: React.ReactNode;
}

export async function SignInButton({ children }: SignInButtonProps) {
  return <Button>{children}</Button>;
}

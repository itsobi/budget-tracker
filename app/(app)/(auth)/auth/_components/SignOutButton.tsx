'use client';
import { Button } from '@/components/ui/button';
import { signOutAction } from '@/lib/actions/signOut';

export function SignOutButton() {
  return <Button onClick={signOutAction}>Sign Out</Button>;
}

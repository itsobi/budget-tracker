'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Id } from '@/convex/_generated/dataModel';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { useState } from 'react';
import { useAuthActions } from '@convex-dev/auth/react';

interface AvatarDropdownProps {
  user:
    | {
        _id: Id<'users'>;
        _creationTime: number;
        name?: string | undefined;
        email?: string | undefined;
        phone?: string | undefined;
        image?: string | undefined;
        emailVerificationTime?: number | undefined;
        phoneVerificationTime?: number | undefined;
        isAnonymous?: boolean | undefined;
      }
    | null
    | undefined;
  isMember: boolean | undefined;
}

export function AvatarDropdown({ user, isMember }: AvatarDropdownProps) {
  console.log(user);
  const [open, setOpen] = useState(false);
  const { signOut } = useAuthActions();

  const handleSignOut = () => {
    setOpen(false);
    void signOut();
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <div className="relative">
        {isMember && <span className="absolute -top-2 -left-1.5 z-10">⭐</span>}
        <DropdownMenuTrigger>
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src={user?.image} alt={user?.name} />
              <AvatarFallback>
                {user?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:flex flex-col text-left text-xs">
              <p>{user?.name}</p>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
            {open ? (
              <ChevronUpIcon className="w-4 h-4" />
            ) : (
              <ChevronDownIcon className="w-4 h-4" />
            )}
          </div>
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <div className="md:hidden">
            <p>{user?.name}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
          <p className="hidden md:block">My Account</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

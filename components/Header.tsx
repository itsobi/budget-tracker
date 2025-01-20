'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import {
  ArrowRightLeft,
  CircleGauge,
  LogOut,
  MenuIcon,
  Settings,
} from 'lucide-react';

import { ThemeButton } from './ThemeButton';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import { UserButton, useUser } from '@clerk/nextjs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useEffect, useState } from 'react';

const tabs = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: CircleGauge,
  },
  {
    label: 'Transactions',
    href: '/transactions',
    icon: ArrowRightLeft,
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

export function Header() {
  const pathname = usePathname();
  const { user } = useUser();

  const [isOpen, setIsOpen] = useState(false);

  const name =
    user?.fullName ||
    user?.firstName ||
    user?.primaryEmailAddress?.emailAddress;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className={cn(
        'max-w-7xl mx-auto px-4 py-2 xl:px-0',
        (pathname === '/sign-up' || pathname === '/sign-in') && 'hidden'
      )}
    >
      <nav className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/dashboard" className="text-xl font-bold italic mr-16">
            TrackIt
          </Link>

          <div className="hidden md:flex items-center gap-4">
            {tabs.map((tab) => (
              <Link
                href={tab.href}
                key={tab.label}
                className={cn(
                  'flex items-center gap-2 text-sm text-muted-foreground hover:text-black dark:hover:text-white',
                  pathname === tab.href &&
                    'text-black dark:text-white underline underline-offset-4'
                )}
              >
                {tab.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeButton />

          <UserButton />

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="md:hidden" asChild>
              <Button variant="ghost">
                <MenuIcon className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full">
              <SheetHeader>
                <SheetTitle className="flex justify-start pb-4 border-b dark:border-zinc-600">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={user?.imageUrl || ''} />
                      <AvatarFallback>
                        {name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <span className="italic">{name}</span>
                  </div>
                </SheetTitle>
                <div className="flex flex-col items-start h-[calc(100vh-8rem)]">
                  <div className="w-full">
                    {tabs.map((tab) => (
                      <Button
                        key={tab.label}
                        asChild
                        variant="ghost"
                        onClick={() => setIsOpen(false)}
                        className="w-full justify-start"
                      >
                        <Link
                          href={tab.href}
                          className="flex items-center gap-2 w-full text-sm text-muted-foreground hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-600 p-2 rounded"
                        >
                          <tab.icon className="w-4 h-4" />
                          <p className="text-lg">{tab.label}</p>
                        </Link>
                      </Button>
                    ))}
                  </div>
                  <div className="mt-auto w-full">
                    <Button className="w-full mt-4">
                      <LogOut />
                      Sign out
                    </Button>
                  </div>
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  );
}

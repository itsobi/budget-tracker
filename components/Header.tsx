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
  ArrowDown,
  ArrowRightLeft,
  ChartLine,
  CircleDollarSign,
  CircleGauge,
  Coins,
  LogOut,
  MenuIcon,
} from 'lucide-react';

import { useMedia } from 'react-use';

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
];

export function Header() {
  const pathname = usePathname();
  const { user } = useUser();

  const [isOpen, setIsOpen] = useState(false);
  const isLarge = useMedia('(min-width: 768px)', false);

  const name =
    user?.fullName ||
    user?.firstName ||
    user?.primaryEmailAddress?.emailAddress;

  useEffect(() => {
    if (isLarge) {
      setIsOpen(false);
    }
  }, [isLarge]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-2 xl:px-0">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <h1 className="lg:text-2xl italic">BudgetTracker</h1>
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
                      <Link
                        href={tab.href}
                        key={tab.label}
                        className="flex items-center gap-2 w-full text-sm text-muted-foreground hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-600 p-2 rounded"
                      >
                        <tab.icon className="w-4 h-4" />
                        <p className="text-lg">{tab.label}</p>
                      </Link>
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

      <div className="hidden md:flex items-center gap-2 py-2 text-zinc">
        {tabs.map((tab) => (
          <Link
            href={tab.href}
            key={tab.label}
            className={cn(
              'flex items-center gap-2 py-1 text-muted-foreground rounded px-2 hover:text-black/60 hover:bg-zinc-200 dark:hover:bg-zinc-600 dark:hover:text-white',
              pathname === tab.href &&
                'bg-zinc-200 dark:bg-zinc-600 font-semibold text-black/60 dark:text-white'
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

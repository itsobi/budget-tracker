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
  Mail,
  MenuIcon,
  Settings,
  Sparkles,
} from 'lucide-react';

import { ThemeButton } from './ThemeButton';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useEffect, useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { AvatarDropdown } from './AvatarDropdown';
import { useAuthActions } from '@convex-dev/auth/react';
import { motion } from 'motion/react';

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
    label: 'Preferences',
    href: '/preferences',
    icon: Settings,
  },
  {
    label: 'Pro',
    href: '/pro',
    icon: Sparkles,
  },
  {
    label: 'Contact',
    href: '/contact',
    icon: Mail,
  },
];

export function Header() {
  const currentUser = useQuery(api.helpers.currentUser);
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { signOut } = useAuthActions();

  const handleSignOut = () => {
    setIsOpen(false);
    void signOut();
  };

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
    <div className="max-w-7xl mx-auto px-4 py-2 xl:px-0 relative">
      <nav className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/dashboard" className="text-xl font-bold italic mr-16">
            TracKiT
          </Link>

          <div className="hidden md:flex items-center gap-4 relative">
            {tabs.map((tab) => (
              <Link
                href={tab.href}
                key={tab.label}
                className={cn(
                  'flex items-center gap-2 text-sm text-muted-foreground hover:text-black dark:hover:text-white relative',
                  pathname === tab.href && 'text-black dark:text-white'
                )}
              >
                {tab.label}
                {pathname === tab.href && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-foreground"
                    layoutId="underline"
                    transition={{ type: 'spring', bounce: 0.25, duration: 0.2 }}
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeButton />

          <AvatarDropdown user={currentUser} />

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
                      <AvatarImage src={currentUser?.image} />
                      <AvatarFallback>
                        {currentUser?.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <span className="italic">{currentUser?.name}</span>
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
                    <Button onClick={handleSignOut} className="w-full">
                      <LogOut className="w-4 h-4" />
                      Sign Out
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

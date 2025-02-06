'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon, Loader } from 'lucide-react';
import { Button } from './ui/button';
import { useEffect } from 'react';
import { useState } from 'react';
import { Tooltip, TooltipContent } from './ui/tooltip';
import { TooltipProvider } from './ui/tooltip';
import { TooltipTrigger } from './ui/tooltip';

export function ThemeButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <Button variant="ghost" disabled>
        <Loader className="animate-spin" />
      </Button>
    );

  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            {theme === 'light' ? <Moon /> : <Sun />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>Toggle Theme</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

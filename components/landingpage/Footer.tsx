'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:gap-0 items-center justify-between">
      <span className="text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} TracKiT. All rights reserved.
      </span>

      <p className="text-sm text-muted-foreground">
        brought to you by{' '}
        <a
          href="https://justobii.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          @justobii
        </a>
      </p>
    </div>
  );
}

'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AnimatedCTAButton } from '@/components/AnimatedCTAButton';

export function ContactForm() {
  return (
    <div>
      <div className="flex justify-center pb-4">
        <AnimatedCTAButton text="Upgrade to Pro" href="/pro" />
      </div>
      <Card className="w-full shadow-md">
        <CardHeader>
          <CardTitle>Contact us 📧</CardTitle>
          <CardDescription>
            Complete the form below about your issue feature request or issue,
            and we'll get back to you within 2 hours!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action="">
            <div className="flex flex-col gap-2">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" />
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full mt-4 font-bold bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-500 hover:scale-105"
            >
              Send
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

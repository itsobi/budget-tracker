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
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { sendEmail } from '@/lib/actions/sendEmail';
import { toast } from 'sonner';

export function ContactForm() {
  const isMember = useQuery(api.helpers.isMember);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const response = await sendEmail(formData);

    if (!response.success) {
      return;
    }
    form.reset();
  };

  if (isMember) {
    return (
      <div>
        <Card className="w-full shadow-md">
          <CardHeader>
            <CardTitle>Contact us 📧</CardTitle>
            <CardDescription>
              Complete the form below about feature request or issue, and
              we&apos;ll get back to you within 2 hours!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) =>
                toast.promise(() => handleSubmit(e), {
                  loading: 'Sending email... 📧',
                  success: 'Email sent successfully 💪',
                  error: 'Error sending email ❌',
                })
              }
            >
              <div className="flex flex-col gap-2">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" required />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required />
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" required />
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
  } else {
    return (
      <div>
        <div className="flex justify-center pb-4">
          <AnimatedCTAButton text="Become a Member" href="/membership" />
        </div>
        <Card className="w-full shadow-md">
          <CardHeader>
            <CardTitle>Contact us 📧</CardTitle>
            <CardDescription>
              Sorry, in order to request new features you must become a member.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-2">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" disabled />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" disabled />
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" disabled />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full mt-4 font-bold bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-500 hover:scale-105"
                disabled
              >
                Send
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}

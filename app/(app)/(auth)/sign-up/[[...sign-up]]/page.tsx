import { ClerkLoading, ClerkLoaded, SignUp } from '@clerk/nextjs';
import { ChartLine, Loader } from 'lucide-react';

export default function SignUpPage() {
  return (
    <>
      <ClerkLoading>
        <div className="h-screen flex flex-col justify-center items-center gap-2">
          <Loader className="animate-spin text-muted-foreground" />
          <p className="text-xs text-muted-foreground">Loading...</p>
        </div>
      </ClerkLoading>
      <ClerkLoaded>
        <div className="h-screen flex justify-center items-center">
          <SignUp />
        </div>
      </ClerkLoaded>
    </>
  );
}

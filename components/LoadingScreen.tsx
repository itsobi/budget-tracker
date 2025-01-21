import { Loader } from 'lucide-react';

export function LoadingScreen() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-1">
        <Loader className="animate-spin text-muted-foreground" />
        <p className="text-xs text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

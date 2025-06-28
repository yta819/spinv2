
import {Suspense} from 'react';
import WheelPage from '@/components/wheel-page';
import { Skeleton } from '@/components/ui/skeleton';

function WheelPageFallback() {
  return (
    <div className="flex w-full flex-1 flex-col md:flex-row bg-background text-foreground">
      <main className="w-full md:w-2/3 flex flex-col items-center justify-start p-4 md:p-8">
        <div className="relative flex items-center justify-center w-full max-w-[400px] md:max-w-[600px] aspect-square">
            <div className="absolute top-0 right-0 z-10 flex gap-2 p-2">
              <Skeleton className="h-10 w-10 rounded-md" />
              <Skeleton className="h-10 w-10 rounded-md" />
            </div>
            <Skeleton className="w-full h-full rounded-full" />
            <div className="absolute inset-0 flex items-center justify-center">
                <Skeleton className="h-32 w-32 rounded-full" />
            </div>
        </div>
      </main>
      
      <aside className="w-full md:w-1/3 bg-card text-card-foreground md:border-l border-t md:border-t-0 p-4 md:p-6 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-6">
          <Skeleton className="h-[270px] w-full rounded-lg" />
          <Skeleton className="h-[180px] w-full rounded-lg" />
          <Skeleton className="h-[150px] w-full rounded-lg" />
        </div>
      </aside>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<WheelPageFallback />}>
      <WheelPage />
    </Suspense>
  );
}

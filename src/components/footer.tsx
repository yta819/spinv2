import Link from 'next/link';

interface FooterProps {
  version: string;
}

export default function Footer({ version }: FooterProps) {
  return (
    <footer className="w-full border-t bg-card text-card-foreground">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Spin The Wheel. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">
            v{version}
            </p>
        </div>
      </div>
    </footer>
  );
}

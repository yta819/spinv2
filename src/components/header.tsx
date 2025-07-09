import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-primary"
          >
            <path d="M12 2a10 10 0 1 0 10 10" />
            <path d="M12 2a10 10 0 0 1 10 10" />
            <path d="m22 12-4-4" />
          </svg>
          <span className="text-lg font-bold">Spin The Wheel</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/blog">Blog</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/how-to-spin">How to Spin</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/faq">FAQ</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}

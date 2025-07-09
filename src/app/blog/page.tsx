import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog | Spin The Wheel',
  description: 'Explore creative ideas, tips, and tutorials on how to make the most of our random name picker and decision wheel. Find inspiration for games, classrooms, and more.',
  keywords: ['blog', 'spinning wheel ideas', 'decision making help', 'classroom games', 'giveaway ideas', 'Spin the Wheel', 'Wheel of name', 'Random name picker'],
};

const blogPosts = [
  {
    slug: 'creative-ways-to-use-a-spinning-wheel',
    title: '5 Creative Ways to Use a Spinning Wheel',
    description: 'Move beyond just picking names and discover fun, creative applications for a random wheel in your daily life, from game nights to workout routines.',
    image: {
      src: 'https://placehold.co/600x400.png',
      hint: 'creative idea',
    },
    date: 'October 26, 2023',
  },
  {
    slug: 'making-decisions-fun',
    title: 'How to Make Tough Decisions Fun',
    description: 'Feeling overwhelmed by choices? Learn how gamifying your decision-making process can reduce stress and make life a little more exciting.',
    image: {
      src: 'https://placehold.co/600x400.png',
      hint: 'decision fun',
    },
    date: 'October 22, 2023',
  },
];

export default function BlogIndexPage() {
  return (
    <div className="container mx-auto max-w-5xl py-8 md:py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Spin The Wheel Blog</h1>
        <p className="text-lg text-muted-foreground">
          Tips, ideas, and inspiration for making decisions fun.
        </p>
      </header>
      
      <div className="grid gap-8 md:grid-cols-2">
        {blogPosts.map((post) => (
          <Card key={post.slug} className="flex flex-col overflow-hidden">
            <Link href={`/blog/${post.slug}`} className="block">
              <Image
                src={post.image.src}
                alt={post.title}
                width={600}
                height={400}
                className="w-full h-48 object-cover"
                data-ai-hint={post.image.hint}
              />
            </Link>
            <CardHeader>
              <CardTitle>
                <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                  {post.title}
                </Link>
              </CardTitle>
              <p className="text-sm text-muted-foreground pt-1">{post.date}</p>
              <CardDescription className="pt-2">{post.description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <Button asChild variant="outline">
                <Link href={`/blog/${post.slug}`}>
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

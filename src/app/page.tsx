import { Container } from '@/components/ui/container';
import { Lead } from '@/components/ui/text';
import React from 'react';
import { Hero } from '@/components/features/hero/hero';

export default function HomePage() {
  return (
    <main className={'min-h-svh w-full overflow-hidden'}>
      <Hero />
      <Container>
        <Lead className="mt-6 max-w-3xl">Resources for ankle pain.</Lead>
      </Container>
    </main>
  );
}

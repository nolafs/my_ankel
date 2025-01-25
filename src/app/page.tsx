import {GradientBackground} from '@/components/ui/gradient';
import {Container} from '@/components/ui/container';
import {Heading, Lead, Subheading} from '@/components/ui/text';

export default function HomePage() {
  return (
      <main className="overflow-hidden">
        <GradientBackground/>
        <Container>
          <Subheading className="mt-16">Home</Subheading>
          <Heading as="h1" className="mt-2">
            My Ankle
          </Heading>
          <Lead className="mt-6 max-w-3xl">
            Resources for ankle pain.
          </Lead>
        </Container>
      </main>
    );
}

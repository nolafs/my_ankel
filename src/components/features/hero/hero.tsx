import { Container } from '@/components/ui/container';
import { Gradient } from '@/components/ui/gradient';

export function Hero() {
  return (
    <div className="relative">
      <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-inset ring-black/5" />
      <Container className="relative">
        <div className="pb-24 pt-16 sm:pb-32 sm:pt-24 md:pb-48 md:pt-52">
          <h1 className="font-display text-balance text-6xl/[0.9] font-medium tracking-tight text-gray-950 sm:text-8xl/[0.8] md:text-9xl/[0.8]">
            Expert Advice for Ankle Health
          </h1>
          <p className="mt-8 max-w-lg text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8">
            Discover trusted guidance on sprains, arthritis, Achilles tendon issues, and more – including the latest
            treatment trials.
          </p>
          <div className="mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row"></div>
        </div>
      </Container>
    </div>
  );
}

import { Nav } from "@/components/chrome/Nav";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main data-nav-theme="dark" className="flex min-h-[100svh] items-center bg-navy-900 text-white">
        <Container className="py-40 text-center">
          <h1 className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[1] tracking-[-0.025em]">That page isn&apos;t here.</h1>
          <p className="mx-auto mt-6 max-w-[36ch] text-white/65">The link may be old, or the page may have moved.</p>
          <div className="mt-10 flex justify-center">
            <Button href="/" variant="lime">
              Back to the home page
            </Button>
          </div>
        </Container>
      </main>
    </>
  );
}

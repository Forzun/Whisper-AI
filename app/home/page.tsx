import AiInput from "@/components/AiInput";
import Container from "@/components/container";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="relative w-full">
      <div
        className="absolute inset-0 -z-10 bg-neutral-50 dark:bg-black bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(120,180,255,0.25)_0%,transparent_70%)]" 
      />

      <Container className="">
        <Navbar />
        <AiInput />
      </Container>
    </div>
  );
}

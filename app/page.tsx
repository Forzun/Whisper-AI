import Hero from "@/components/Hero";
import Container from "@/components/container";
import Navbar from "@/components/navbar";

export default function Home() {
  return <div className="min-h-screen h-full flex flex-col items-center">
       <Container>
          <Navbar />
          <Hero />
       </Container>
  </div>
}

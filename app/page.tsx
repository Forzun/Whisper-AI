import Hero from "@/components/Hero";
import LogoCloudTwo from "@/components/LogoCloude";
import Container from "@/components/container";
import Features from "@/components/features-2";
import Navbar from "@/components/navbar";

export default function Home() {
  return <div className="min-h-screen h-full flex flex-col items-center">
       <Container>
          <Navbar />
          <Hero />
          <LogoCloudTwo />
          <Features />
       </Container>
  </div>
}

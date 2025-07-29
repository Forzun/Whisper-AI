import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="container-wrapper relative">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(120, 180, 255, 0.25), transparent 70%), #000000",
          }}
        />
      <Navbar />
    </div>
  );
}

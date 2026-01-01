import AiInput from "@/components/AiInput";
import Navbar from "@/components/navbar";

export default function DemoPgae() {
  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10 bg-neutral-50 dark:bg-black bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(120,180,255,0.25)_0%,transparent_70%)]" />
      <div>
        <Navbar />
        <AiInput />
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";

export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("max-w-full relative mx-auto min-h-screen ", className)}>
      {children}
    </div>
  );
}

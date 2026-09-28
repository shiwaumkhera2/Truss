import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "nav";
};

/** 1200px column with wide gutters: 24px on phones, 40px on tablets, 48px on desktop. */
export function Container({ children, className, as: Comp = "div" }: ContainerProps) {
  return <Comp className={cn("mx-auto w-full max-w-container px-6 sm:px-10 lg:px-12", className)}>{children}</Comp>;
}

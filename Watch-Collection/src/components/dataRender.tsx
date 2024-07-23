import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DataRendererProps {
  children: ReactNode;
  error: string | null;
  isLoading: boolean;
  className?: string;
}

const DataRenderer = ({
  children,
  error,
  isLoading,
  className,
}: DataRendererProps) => {
  if (isLoading) {
    return (
      <div className={cn("flex justify-center", className)}>
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return <div className={cn("text-center", className)}>{error}</div>;
  }

  return <div className={cn(className)}>{children}</div>;
};

export default DataRenderer;

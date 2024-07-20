import { ReactNode } from "react";

interface DataRendererProps {
  children: ReactNode;
  error: string | null;
  isLoading: boolean;
}

const DataRenderer = ({ children, error, isLoading }: DataRendererProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center">{error}</div>;
  }

  return children;
};

export default DataRenderer;

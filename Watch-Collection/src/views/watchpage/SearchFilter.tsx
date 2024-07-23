import { Button, Input } from "@/components/ui";
import { Search } from "lucide-react";
import { memo, useState } from "react";
import { cn } from "@/lib/utils";

type SearchFilterProps = {
  onChange: (watchName: string) => void;
  className?: string;
};

/*eslint-disable*/
const SearchFilter: React.FC<SearchFilterProps> = ({ onChange, className }) => {
  const [watchName, setWatchName] = useState<string>("");

  const handleSubmit = () => {
    onChange(watchName);
  };

  return (
    <div
      className={cn(
        "flex flex-col items-start justify-start gap-2 sm:flex-row sm:items-center",
        className
      )}
    >
      <Input
        className="w-full sm:w-[400px]"
        placeholder="Search watch"
        value={watchName}
        onChange={(e) => setWatchName(e.target.value)}
      />
      <Button className="w-full sm:w-auto" onClick={handleSubmit}>
        <Search className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default memo(SearchFilter);

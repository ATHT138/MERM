import { Settings } from "lucide-react";

const SettingManage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Settings className="gap-5 text-gray-500 size-36" />
      <div className="text-3xl font-semibold text-gray-400">Setting Page</div>
    </div>
  );
};

export default SettingManage;

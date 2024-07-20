import { Album, CircleUser, Settings, Watch } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui";
import { Link } from "react-router-dom";

const SiderBar = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>DASHBOARD</CardTitle>
      </CardHeader>
      <CardContent className="mt-10">
        <nav>
          <div className="flex flex-col gap-5">
            <Link
              to="/dashboard/watches"
              className="flex items-center p-2 text-black rounded hover:bg-gray-400"
            >
              <Watch className="w-6 h-6 mr-2" />
              Watch
            </Link>
            <Link
              to="/dashboard/brands"
              className="flex items-center p-2 text-black rounded hover:bg-gray-400"
            >
              <Album className="w-6 h-6 mr-2" />
              Brand
            </Link>
            <Link
              to="/dashboard/members"
              className="flex items-center p-2 text-black rounded hover:bg-gray-400"
            >
              <CircleUser className="w-6 h-6 mr-2" />
              User
            </Link>
            <Link
              to="/dashboard/settings"
              className="flex items-center p-2 text-black rounded hover:bg-gray-400"
            >
              <Settings className="w-6 h-6 mr-2" />
              Setting
            </Link>
          </div>
        </nav>
      </CardContent>
    </Card>
  );
};

export default SiderBar;

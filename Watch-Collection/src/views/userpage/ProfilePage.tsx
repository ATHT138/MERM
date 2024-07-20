import DataRenderer from "@/components/dataRender";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui";
import useFetch from "@/hooks/useFetch";
import Show from "@/lib/show";
import { User } from "@/models";
import { useState } from "react";
import FormProfile from "./FormProfile";
import FormPassword from "./FormPassword";
import { useNavigate } from "react-router-dom";

export interface ProfileEdit {
  name: string;
  YOB: number;
}

const ProfilePage = () => {
  const [editProfile, setEditProfile] = useState<number>(0);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch user data
  const {
    data: user,
    loading,
    error,
    refetch,
  } = useFetch<User>("/members/profile");

  const userProfile: ProfileEdit = {
    name: user?.name || "",
    YOB: user?.YOB || 0,
  };

  const handleProfileUpdate = () => {
    refetch();
  };

  return (
    <div className="container p-20">
      <div className={`grid ${editProfile ? "grid-cols-2 gap-4" : ""}`}>
        <div
          className={`${
            editProfile
              ? "w-full flex justify-center"
              : "col-span-2 w-full flex justify-center"
          }`}
        >
          <DataRenderer error={error} isLoading={loading}>
            <Card className="w-96">
              <CardHeader className="text-center">
                <Avatar className="mt-2 mb-2 size-28 place-self-center">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <CardTitle>{user?.name}</CardTitle>
                <CardDescription>{user?.memberName}</CardDescription>
                <CardDescription>{user?.YOB}</CardDescription>
              </CardHeader>

              <CardContent className="flex justify-center">
                <Show>
                  <Show.When isTrue={editProfile === 0}>
                    <Button onClick={() => setEditProfile(1)}>
                      <span>Edit Profile</span>
                    </Button>
                  </Show.When>
                  <Show.Else>
                    <div className="flex flex-col gap-3">
                      <Button onClick={() => setEditProfile(2)}>
                        <span>Change Password</span>
                      </Button>
                      <Button onClick={() => setEditProfile(1)}>
                        <span>Edit Profile</span>
                      </Button>
                    </div>
                  </Show.Else>
                </Show>
              </CardContent>
            </Card>
          </DataRenderer>
        </div>
        <Show>
          <Show.When isTrue={editProfile === 1}>
            <div className="col-span-1">
              <FormProfile
                userProfile={userProfile}
                setEditProfile={setEditProfile}
                onProfileUpdate={handleProfileUpdate}
              />
            </div>
          </Show.When>
          <Show.When isTrue={editProfile === 2}>
            <div className="col-span-1">
              <FormPassword
                setEditProfile={setEditProfile}
                setDialogOpen={setDialogOpen}
              />
            </div>
          </Show.When>
        </Show>
      </div>
      {isDialogOpen && (
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogTitle>Success</DialogTitle>
            <DialogDescription>
              Your password has been changed successfully.
            </DialogDescription>
            <DialogFooter>
              <Button
                onClick={() => {
                  setDialogOpen(false);
                  navigate("/login"); // Điều hướng về trang login
                }}
              >
                Go to Login
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ProfilePage;

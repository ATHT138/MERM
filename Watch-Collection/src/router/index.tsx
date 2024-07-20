import ErrorPage from "@/components/errorPage";
import MainLayout from "@/components/layouts";
import LoginPage from "@/views/authpage/LoginPage";
import RegisterPage from "@/views/authpage/RegisterPage";
import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

/*eslint-disable*/
const HomePage = lazy(() => import("@/views/homepage/HomePage"));
const WatchPage = lazy(() => import("@/views/watchpage/WatchPage"));
const WatchDetail = lazy(() => import("@/views/watchpage/WatchDetail"));
const ProfilePage = lazy(() => import("@/views/userpage/ProfilePage"));
const DashboardPage = lazy(
  () => import("@/components/layouts/dashboardLayout")
);
const BrandManage = lazy(() => import("@/views/dashboardpage/BrandManage"));
const WatchManage = lazy(() => import("@/views/dashboardpage/WatchManage"));
const MemberManage = lazy(() => import("@/views/dashboardpage/MemberManage"));
const SettingManage = lazy(() => import("@/views/dashboardpage/SettingManage"));
/*eslint-enable*/

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<div>Loading</div>}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "watches",
        element: (
          <Suspense fallback={<div>Loading</div>}>
            <WatchPage />
          </Suspense>
        ),
      },
      {
        path: "watch/:id",
        element: (
          <Suspense fallback={<div>Loading</div>}>
            <WatchDetail />
          </Suspense>
        ),
      },
      {
        path: "profile",
        element: (
          <Suspense fallback={<div>Loading</div>}>
            <ProfilePage />
          </Suspense>
        ),
      },
      {
        path: "dashboard",
        element: (
          <Suspense fallback={<div>Loading</div>}>
            <DashboardPage />
          </Suspense>
        ),
        children: [
          {
            path: "watches",
            element: (
              <Suspense fallback={<div>Loading</div>}>
                <WatchManage />
              </Suspense>
            ),
          },
          {
            path: "brands",
            element: (
              <Suspense fallback={<div>Loading</div>}>
                <BrandManage />
              </Suspense>
            ),
          },
          {
            path: "members",
            element: (
              <Suspense fallback={<div>Loading</div>}>
                <MemberManage />
              </Suspense>
            ),
          },
          {
            path: "settings",
            element: (
              <Suspense fallback={<div>Loading</div>}>
                <SettingManage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

export default routes;

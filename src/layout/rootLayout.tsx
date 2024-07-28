import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div className="min-h-screen w-full">
      <Outlet />
    </div>
  );
};

export default RootLayout;

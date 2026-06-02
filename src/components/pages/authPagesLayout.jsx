import { Outlet, useLocation } from "react-router-dom";
import BackNavigationBar from "./backNavigation";
import { Grid } from "antd";
const { useBreakpoint } = Grid;

const AppAuthLayout = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const { pathname } = useLocation();
  // Login/Signup render their own header (the mobile .bfa-topbar), so the
  // BackNavigationBar would duplicate the logo + Login/Register buttons.
  const hasOwnHeader = pathname === "/auth/login" || pathname === "/auth/signup";
  return (
    <>
      {isMobile && !hasOwnHeader && <BackNavigationBar />}
      <Outlet />
    </>
  );
};

export default AppAuthLayout;

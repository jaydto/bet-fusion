import { Outlet } from "react-router-dom";
import BackNavigationBar from "./backNavigation";
import { Grid } from "antd";
const { useBreakpoint } = Grid;

const AppAuthLayout = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  return (
    <>
      {isMobile && <BackNavigationBar />}
      <Outlet />
    </>
  );
};

export default AppAuthLayout;

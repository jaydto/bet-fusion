import { Outlet } from "react-router-dom";
import { Grid } from "antd";
import HeaderBreadCrumb from "../../shared/headerBreadCrumb";
import { Suspense } from "react";
import LoadingPage from "../casino/loadingPage";
const { useBreakpoint } = Grid;

const AppPromo = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  return (
    <div style={{ padding: "0 5px" }}>
      <Suspense fallback={<LoadingPage />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default AppPromo;

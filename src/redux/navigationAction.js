import useWindowDimensions from "../components/header/Dimensions";

export const shouldShowMobileNav = (pathname) => (dispatch, getState)=>{
    if (!pathname) return true;
    const state=getState()
    const navigationConfig=state.navigations.notShowMobileNav
    return !navigationConfig?.some(path => path && pathname.includes(path));
};
export const shouldShowSearch = (pathname) => (dispatch, getState)=>{
    if (!pathname) return true;
    const state=getState()
    const navigationConfig=state.navigations.notShowSearch
    return !navigationConfig?.some(path => path && pathname.includes(path));
};
export const shouldShowHeader = (pathname) => (dispatch, getState)=>{
    const state=getState()
    const {width}=useWindowDimensions()
    const navigationConfig=state.navigations.notShowHeader
    

    return (!navigationConfig?.some(path => pathname.includes(path))|| width>992);
};

export const shouldShowDownload = (pathname) => (dispatch, getState)=>{
    const state=getState()
    const navigationConfig=state.navigations.showDownload
    const trimmedPathname = pathname?.substring(1);

    return navigationConfig?.some(path => trimmedPathname.includes(path));
};

export const checkNavigation = (pathname) => (dispatch, getState)=>{
    const state=getState()
    const navigationConfig=state.navigations.changeMobileNav

    const trimmedPathname = pathname?.substring(1);

    return navigationConfig?.some(path => trimmedPathname.includes(path));
};

export const checkDesktopTopNavigation = (pathname) => (dispatch, getState)=>{
    const state=getState()
    const navigationConfig=state.navigations.modifiedHeaderDesktop

    const trimmedPathname = pathname?.substring(1);

    return navigationConfig?.some(path => trimmedPathname.includes(path));
};

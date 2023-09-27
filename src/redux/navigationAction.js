
export const shouldShowMobileNav = (pathname) => (dispatch, getState)=>{
    const state=getState()
    const navigationConfig=state.navigations.notShowMobileNav

    return !navigationConfig?.some(path => pathname.includes(path));
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

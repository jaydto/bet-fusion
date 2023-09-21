
export const shouldShowMobileNav = (pathname) => (dispatch, getState)=>{
    const state=getState()
    console.log("state", state)
    const navigationConfig=state.navigations.notShowMobileNav
    console.log("navigationMobilew",navigationConfig )
    console.log("mobilepathname",pathname)
    console.log("!navigationConfig?.some(path => pathname.includes(path));",!navigationConfig?.some(path => pathname.includes(path)))

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

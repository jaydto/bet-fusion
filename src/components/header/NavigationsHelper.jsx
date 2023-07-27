import navigationConfig from './HeaderDataFiles';

export const shouldShowMobileNav = (pathname) => {
	return !navigationConfig.notShowMobileNav.some(path => pathname.includes(path));
};

export const shouldShowDownload = (pathname) => {
	const trimmedPathname = pathname.substring(1);
	console.log("pathname",pathname)
	console.log("trimmedPath", trimmedPathname)
	return navigationConfig.showDownload.some(path => trimmedPathname.includes(path));
};

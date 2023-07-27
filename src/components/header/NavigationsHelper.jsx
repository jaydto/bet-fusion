import navigationConfig from './HeaderDataFiles';

export const shouldShowMobileNav = (pathname) => {
	return !navigationConfig.notShowMobileNav.some(path => pathname.includes(path));
};

export const shouldShowDownload = (pathname) => {
	const trimmedPathname = pathname.substring(1);
	return navigationConfig.showDownload.some(path => trimmedPathname.includes(path));
};

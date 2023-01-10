import React, {useEffect, useState} from 'react';
import {Capacitor} from '@capacitor/core';
import {Filesystem} from '@capacitor/filesystem';
import {App} from "@capacitor/app"

import {toast,} from 'react-toastify';
import {BASE_URL} from "../utils/fetch-request";
import axios from "axios";
import {ProgressBar} from "loading-animations-react";
import {getFromLocalStorage, setLocalStorage} from "../utils/local-storage";


const {FilesystemDirectory} = Capacitor;

export function AppUpdater() {
    // const { addToast } = useToasts();;

    const [currentAppVersion, setCurrentAppVersion] = useState(null);
    const [latestAppVersion, setLatestAppVersion] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // const [showtoast, setShowToast] = useState(false);
    const [shouldShowToast, setShouldShowTaost] = useState(false)

    async function checkForUpdates() {
        try {
            // Get the current app version from the device
            if (Capacitor.isNativePlatform()) {
                if (Capacitor.getPlatform().toString().toLowerCase() === "android") {
                    const info = await App.getInfo();
                    setCurrentAppVersion(info.version);
                    // console.log("android_version", info.version)
                    //checking what platform we are using
                    // console.log("app  version", Capacitor.getPlatform().toString().toLowerCase());


                    axios.get(BASE_URL + '/android/version')
                        .then(response => {
                            setLatestAppVersion(response.data.version);
                            // console.log("response", response.data.version)

                        }).catch(error => {
                        toast.warn("cant fetch version at the moment");
                    });


                    // console.log("currentAppVersion_latestAppVersion ", currentAppVersion + " " + latestAppVersion)

                }
            }
        } catch (e) {
            // console.log("error", e)
        }
    }

    // const handleDismiss = () => {
    //     toast.dismiss();
    //     setCookie('toastDismissed', true, { maxAge: 43200 }); // 12 hours in seconds
    // }

    // useEffect(() => {
    //     if (!cookies.toastDismissed) {
    //         toast('An update is available. Click here to update the app.', { onClick: handleDismiss });
    //     }
    // }, []);

    useEffect(() => {
        checkForUpdates();
    }, []);
    // const fileUrl = 'https://testapi.betnare.co.ke/download/betnare.apk';
    const fileUrl = 'https://www.betnare.com/android/download'

    const handleUpdate = async () => {
        // Download the updated app package from the Flask endpoint
        // Compare the current app version with the latest app version
        if (currentAppVersion !== latestAppVersion) {
            // Download the updated app package from the Flask endpoint
            try {
                setIsLoading(true);
                // This method will throw an error if the user denies the permission request. You can use this method before attempting to download and write the updated app package to the file system.
                const {granted} = await Filesystem.requestPermissions({write: true});

                // If the user denies the permission request, show an error message
                if (granted === false) {
                    toast.warn('Write permission is required to update the app', {
                        appearance: 'error',
                        autoDismiss: true
                    });
                    return;
                }
                // Make the API call to download the updated app package
                const fileBlob = await fetch(fileUrl).then(response => response.blob());
                await Filesystem.writeFile({
                    path: 'updated-app.apk',
                    data: fileBlob,
                    directory: FilesystemDirectory.External
                });

                // Install the updated app package
                await App.installApp({
                    filePath: 'file:///storage/emulated/0/updated-app.apk'
                });

                toast(<><a href={fileUrl} onClick={() => toast.info("update starting")}>Initiate the download
                    process</a></>)
                // );

                // Quit the app and relaunch it, which will trigger the update process
                // await App.exitApp();
                // }

            } catch (e) {
                toast.error('An error occurred while updating the app', {
                    appearance: 'error',
                    autoDismiss: true
                });
                // console.log("never got to this point", e)

            }
            setIsLoading(false);
        }
        if (isLoading) {
            return <ProgressBar
                borderColor=""
                sliderColor="#242e3a"
                sliderBackground="rgb(0,0,0)"
            />
        }
    }

    // Function to handle closing the toast
    // Function to handle closing the toast
    const handleClose = () => {
        // Store the current timestamp in local storage as a number
        localStorage.setItem('toastClosedAt', Date.now());
        toast("Update has been postponed we will show you an update after 24hrs")
    }

// Function to check if the toast should be shown

    const handleDismiss = () => {
        // console.log("Handling dismiss ,,, ")
        // setShowToast(false);
        //2 mins
        // 120000
        //3 hours
        // 60 * 60 * 3 * 1000
        setLocalStorage('updateToastTimestamp', new Date().getTime() + 60 * 60 * 3 * 1000)
        // localStorage.setItem();
        // localStorage.setItem('dismissedToast', true);
    }

    const showToast = () => {

        let toastUpdateTimestamp = getFromLocalStorage('updateToastTimestamp')

        if (toastUpdateTimestamp === null) {
            // this guy has not disabled toast update
            setShouldShowTaost(true)
        } else {
            // this guy has toast update timestamp set in local storage...
            let now = Date.now() // current time in milliseconds ...

            // console.log("Now", now)

            let toastTime = (Number(toastUpdateTimestamp)) // time to show toast

            {/*console.log("Toast Time", toastTime)*/}

            let diff = toastTime - now

            {/*console.log("Time Diff", diff)*/}

            if (diff <= 0) {
                setLocalStorage('updateToastTimestamp', null)
                setShouldShowTaost(true)
            }

        }
        // const dismissedToast = localStorage.getItem('dismissedToast');
        // const dismissedToastTimestamp = localStorage.getItem('dismissedToastTimestamp');
        // const currentTimestamp = new Date().getTime();
        //
        // // Check if the toast has been dismissed within the last 12 hours
        // if (!dismissedToast || (currentTimestamp - dismissedToastTimestamp > 43200000)) {
        //     setShowToast(true);
        // }
    }

    useEffect(() => {
        showToast();
    }, []);

    return (
        <div>
            {currentAppVersion && latestAppVersion ? (
                currentAppVersion !== latestAppVersion && shouldShowToast && toast.info(
                    <>
                        <a
                            href={fileUrl}
                            onClick={() => toast.info('Update starting...')}
                        >
                            An update is available. Please click here to update!
                        </a>
                    </>,
                    {
                        position: toast.POSITION.TOP_LEFT,
                        autoClose: false,
                        onClick: () => handleDismiss()
                    }
                )

            ) : (
                ''
            )}
            {/*/!*{console.log('showToast', showtoast)}*!/*/}
            {/*{console.log("versions_current: ", currentAppVersion + " new: " + latestAppVersion)}*/}

        </div>
    );


}

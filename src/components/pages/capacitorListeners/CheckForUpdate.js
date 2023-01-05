import React, {useEffect, useState} from 'react';
import {Capacitor, Plugins} from '@capacitor/core';
import {Filesystem} from '@capacitor/filesystem';
import {App} from "@capacitor/app"
import {toast, } from 'react-toastify';

import {getFromLocalStorage, setLocalStorage} from "../../utils/local-storage";
import makeRequest, {BASE_URL} from "../../utils/fetch-request";
import axios from "axios";

const {FilesystemDirectory} = Capacitor;

export function AppUpdater() {
    // const { addToast } = useToasts();;

    const [currentAppVersion, setCurrentAppVersion] = useState(null);
    const [latestAppVersion, setLatestAppVersion] = useState(null);
    async function checkForUpdates() {
        try {
            // Get the current app version from the device
            if (Capacitor.isNativePlatform())
            {
                if (Capacitor.getPlatform().toString().toLowerCase() === "android")
                {
                    const info = await App.getInfo();
                    setCurrentAppVersion(info.version);
                    console.log("android_version", info.version)
                    //checking what platform we are using
                    console.log("app  version", Capacitor.getPlatform().toString().toLowerCase());

                    //no caches involved
                    // try{
                    //     // Get the latest app version from the Flask endpoint
                    //     const response = await fetch('https://api.betnare.com/android/version');
                    //     const json = await response.json();
                    //     setLatestAppVersion(json.version);
                    // }catch (e) {
                    //     console.error(e)
                    // }

                    // Check if the latest app version is cached
                    // const cacheKey = 'latestAppVersion';
                    // let latestAppVersion = await getFromLocalStorage(cacheKey);

                    // If the cache is expired or non-existent, make an API call to get the latest app version
                    // const cacheTimeout = 1000 * 60 * 60; // 1 hour
                    // if (!latestAppVersion || Date.now() - latestAppVersion.timestamp > cacheTimeout)
                    {
                    // const response = await fetch('https://api.betnare.com/android/version');


                    // await makeRequest({url: endpoint, method: method, data: []}).then(([status, result]) => {
                    //     console.log("response",result)
                    //     if (status === 200) {
                    //         latestAppVersion = {
                    //             version: result?.data, timestamp: Date.now()
                    //         };
                    //     }
                    //     else{
                    //         console.log("app_result",result);
                    //     }
                    //
                    // });

                    axios.get(BASE_URL+'/android/version')
                        .then(response => {
                            setLatestAppVersion(response.data.version);
                            console.log("response", response.data.version)
                            // console.log("latest_app_version", latestAppVersion)
                        }).catch(error => {
                        console.error(error);
                    });


                    // await setLocalStorage(cacheKey, latestAppVersion);
                }

                // setLatestAppVersion(latestAppVersion);
                // console.log("latest_version", latestAppVersion)

                // }
                // }


                //auto update

                // // Compare the current app version with the latest app version
                // if (currentAppVersion !== latestAppVersion) {
                //     // Download the updated app package from the Flask endpoint
                //     const response = await fetch('http://example.com/download/app.apk');
                //     const fileBlob = await response.blob();
                //
                //     // Write the downloaded app package to a file on the device
                //     const filePath = 'app.apk';
                //     await Filesystem.writeFile({
                //         path: filePath,
                //         data: fileBlob,
                //         directory: FilesystemDirectory.Data
                //     });
                //
                //     // Quit the app and relaunch it, which will trigger the update process
                //     await App.exitApp();
                // }
            console.log("currentAppVersion_latestAppVersion ",currentAppVersion+ " "+latestAppVersion)

            }}
        } catch (e) {
            console.log("error",e)
        }}
        useEffect(() => {
            checkForUpdates();
        }, []);

        const handleUpdate = async () => {
            // Download the updated app package from the Flask endpoint
            // Compare the current app version with the latest app version
            if (currentAppVersion !== latestAppVersion) {
                // Download the updated app package from the Flask endpoint
                try {
                    // const response = await fetch('https://www.betnare.com/betnare.apk');


                    // await makeRequest({url: endpoint, method: method, data: []}).then(async ([status, result]) =>



                    // This method will throw an error if the user denies the permission request. You can use this method before attempting to download and write the updated app package to the file system.
                    //
                    //     If you want to check if the app already has permission to write to the file system, you can use the getPermissions method from the Filesystem API:

                    const { granted } = await Filesystem.requestPermissions({ write: true });

                    // console.log('granted',granted.prop)

                    if (typeof granted!=="undefined") {
                        toast.warning('Write permission is required to update the app', {
                            appearance: 'error',
                            autoDismiss: true
                        })
                        return;
                    //     await Filesystem.requestPermissions({ write: true,read:true });
                    }

                    // This method returns an object with a permissions property, which is an object containing properties for each of the permissions that have been granted (read and write in this case). If the write property is true, it means that the app has permission to write to the file system.

                        // axios.get('https://www.betnare.com/betnare.apk')
                    //     .then(async response => {
                    //         {
                    //             const fileBlob = await response
                    //             // Write the downloaded app package to a file on the device
                    //             console.log("filesystems",response)
                    //             const filePath = 'app.apk';
                    //             try {
                    //                 await Filesystem.writeFile({
                    //                     path: filePath, data: fileBlob, directory: FilesystemDirectory.Data
                    //                 });
                    //
                    //             } catch (e) {
                    //                 // toast.warning('Please check if write permissions for the application are enabled.', {
                    //                 //     autoClose: 3000,position: "top-left"
                    //                 // })
                    //                 console.log("error",e)
                    //             }
                    //         }
                    //         // console.log("response", response.data.version)
                    //         // console.log("latest_app_version", latestAppVersion)
                    //     }).catch(error => {
                    //     console.error(error);
                    // });
                    const fileUrl = 'https://testapi.betnare.co.ke/download/betnare.apk';

                    // async function getFileSize(url) {
                    //     try {
                    //         const response = await axios.head(url);
                    //         const fileSize = response.headers['content-length'];
                    //         return fileSize
                    //         console.log(`File size: ${fileSize} bytes`);
                    //     } catch (error) {
                    //         console.error(error);
                    //     }
                    // }
                    // 'Content-length': getFileSize(fileUrl),

                    const apkResponse = await axios.get(fileUrl, { responseType: 'blob',crossdomain:true,headers:{
                            "Cache-Control": "must-revalidate, post-check=0, pre-check=0",
                            "access-control-allow-origin":"http://betnare",
                            'access-control-allow-headers':'Content-Type',
                            'Content-type': 'application/vnd.android.package-archive',
                            'Content-Disposition': 'attachment; filename=betnare.apk"',

                        } });
                    // const fileBlob = apkResponse.data;
                    // const apkResponse=axios.get (fileUrl,{responseType:'blob'})
                    const fileBlob=apkResponse.data

                    // console.log("apk_response",apkResponse)

                    // Write the downloaded app package to a file on the device
                    const filePath = 'betnare.apk';
                    await Filesystem.writeFile({
                        path: filePath,
                        data: fileBlob,
                        directory: FilesystemDirectory.Data
                    });
                    console.log("filesystem", FilesystemDirectory)
                    // Quit the app and relaunch it, which will trigger the update process
                    await App.exitApp();

                    {
                        // if (status == 200)
                        // {
                        //     const fileBlob = await result?.blob
                        //     // Write the downloaded app package to a file on the device
                        //     const filePath = 'app.apk';
                        //     try {
                        //         await Filesystem.writeFile({
                        //             path: filePath, data: fileBlob, directory: FilesystemDirectory.Data
                        //         });
                        //
                        //     } catch (e) {
                        //         // toast.warning('Please check if write permissions for the application are enabled.', {
                        //         //     autoClose: 3000,position: "top-left"
                        //         // })
                        //         console.log(e)
                        //     }
                        // }
                    }
                    // );

                    // Quit the app and relaunch it, which will trigger the update process
                    await App.exitApp();
                    // }

                } catch (e) {
                    // toast.warn('Update failed.', {
                    //     autoClose: 3000, position: "top-left"
                    // })
                    console.log("never got to this point",e)

                }
            }
        }



    return (<div>
            {currentAppVersion && latestAppVersion ? (currentAppVersion === latestAppVersion ? toast.success('Your app is up to date!', {
                position: toast.POSITION.TOP_LEFT, autoClose: 1000
            }) : toast.info('An update is available. click here to update.', {
                position: toast.POSITION.TOP_LEFT, autoClose: false, onClick: handleUpdate
            })) : ''}
        {console.log("latest_app_version_current ",latestAppVersion+" "+currentAppVersion)}
        </div>);
}

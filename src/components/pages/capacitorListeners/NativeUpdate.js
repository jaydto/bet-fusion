import React, {useEffect, useState} from 'react';
// import { Plugins } from '@capacitor/core';
// const { AppUpdate } = Plugins;
import {AppUpdate} from "@capawesome/capacitor-app-update";

import useInterval from "../hooks/set-interval.hook";
const NativeUdate = () => {
    const [updateAvailable, setUpdateAvailable] = useState(false);
    useInterval(async () => {
        const update = await AppUpdate.checkForUpdate();
        setUpdateAvailable(update);
    }, 60000);
    useEffect(() => {
        const checkAndUpdate = async () => {
            try {
                if (updateAvailable) {
                    console.log('Update available');
                    await AppUpdate.downloadUpdate();
                    console.log('Update downloaded');
                    await AppUpdate.applyUpdate();
                    console.log('Update applied');
                } else {
                    console.log('No update available');
                }
            } catch (err) {
                console.error(err);
            }
        };
        checkAndUpdate()

    }, []);
    return (
        updateAvailable ? (
            <p className="text-warning">Update available</p>
        ) : (
            ""
        )
    );

};

export default NativeUdate;

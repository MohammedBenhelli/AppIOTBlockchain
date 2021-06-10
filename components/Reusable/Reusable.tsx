import React, {useEffect, useState} from "react";
import {ProgressBar} from "react-native-paper";

export const Loader = () => {
    const [progress, setProgress] = useState(1);

    const changeProgress = () => {
        if (progress === 10) setProgress(1)
        else setProgress(progress + 1);
    }

    useEffect(() => {
        setTimeout(() => changeProgress(), 200);
    });

    return (
        <ProgressBar progress={progress / 10}/>
    )
}

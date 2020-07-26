import React, {FC} from "react";
import {IonSpinner} from "@ionic/react"


const LoadingSpinner: FC = () => {
    return (
        <IonSpinner id="loading-spinner" name="crescent"/>
    )
}

export default LoadingSpinner
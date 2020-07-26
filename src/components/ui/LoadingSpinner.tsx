import React, {FC} from "react";
import {IonSpinner} from "@ionic/react"
import "./LoadingSpinner.css"


const LoadingSpinner: FC = () => {
    return (
        <IonSpinner id="loading-spinner" name="crescent"/>
    )
}

export default LoadingSpinner
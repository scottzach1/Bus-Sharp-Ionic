import React, {FC} from "react";
import {IonSpinner} from "@ionic/react"
import "./LoadingSpinner.css"

interface Props {
    hidden?: boolean,
}

const LoadingSpinner: FC<Props> = (props) => {
    return (
        <>
            {!props.hidden && <IonSpinner id="loading-spinner" name="crescent"/>}
        </>
    )
}

export default LoadingSpinner
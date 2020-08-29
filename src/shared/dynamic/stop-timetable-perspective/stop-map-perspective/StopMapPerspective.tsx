import React, {FC} from "react";
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import BackButton from "../../../static/ui/BackButton";
import MetlinkStopMap from "./MetlinkStopMap";

const StopMapPerspective: FC<any> = ({match}) => {
    const {params: {stopCode}} = match

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <BackButton/>
                    <IonTitle>Stop Map: {stopCode}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Stop Map</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <MetlinkStopMap stopCode={stopCode}/>
            </IonContent>
        </IonPage>
    )
}

export default StopMapPerspective;

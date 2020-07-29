import React, {FC} from "react";
import {IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import MetlinkStopView from "../components/metlink/MetlinkStopView";

const StopPerspective: FC<any> = ({match}) => {
    const {params: {stopCode}} = match

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton/>
                    </IonButtons>
                    <IonTitle>Stop: {stopCode}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Map</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <MetlinkStopView stopCode={stopCode}/>
            </IonContent>
        </IonPage>
    )
}

export default StopPerspective;
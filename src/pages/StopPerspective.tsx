import React, {FC} from "react";
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import MetlinkStopTable from "../components/metlink/stop/MetlinkStopTable";
import MetlinkStopInfo from "../components/metlink/stop/MetlinkStopInfo";
import BackButton from "../components/ui/BackButton";

const StopPerspective: FC<any> = ({match}) => {
    const {params: {stopCode}} = match

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <BackButton/>
                    <IonTitle>Stop: {stopCode}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Map</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <MetlinkStopInfo stopCode={stopCode}/>
                <MetlinkStopTable stopCode={stopCode}/>
            </IonContent>
        </IonPage>
    )
}

export default StopPerspective;
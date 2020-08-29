import React, {FC} from "react";
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import MetlinkStopTable from "./MetlinkStopTable";
import MetlinkStopInfo from "./MetlinkStopInfo";
import BackButton from "../../static/ui/BackButton";

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
                        <IonTitle size="large">Stop</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <MetlinkStopInfo stopCode={stopCode}/>
                <MetlinkStopTable stopCode={stopCode}/>
            </IonContent>
        </IonPage>
    )
}

export default StopPerspective;

import React, {FC, useState} from "react";
import {IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import MetlinkStopTable from "../components/metlink/stop/MetlinkStopTable";
import MetlinkStopInfo from "../components/metlink/stop/MetlinkStopInfo";
import BackButton from "../components/ui/BackButton";
import {add, informationOutline, removeOutline} from "ionicons/icons";

const StopPerspective: FC<any> = ({match}) => {
    const [showCard, setShowCard] = useState<boolean>(false)

    const {params: {stopCode}} = match

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <BackButton/>
                    <IonTitle>Stop: {stopCode}</IonTitle>
                    <IonFab horizontal="end" slot="start">
                        <IonFabButton onClick={e => setShowCard(!showCard)} size={"small"} activated={showCard}>
                            <IonIcon icon={informationOutline}/>
                        </IonFabButton>
                    </IonFab>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Map</IonTitle>
                    </IonToolbar>
                </IonHeader>
                {showCard && (<MetlinkStopInfo stopCode={stopCode}/>)}
                <MetlinkStopTable stopCode={stopCode}/>
            </IonContent>
        </IonPage>
    )
}

export default StopPerspective;
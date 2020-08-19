import React, {FC, useState} from "react";
import {IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import MetlinkServiceView from "../components/metlink/service/MetlinkServiceView";
import MetlinkServiceInfo from "../components/metlink/service/MetlinkServiceInfo";
import BackButton from "../components/ui/BackButton";
import {add, informationOutline, removeOutline} from "ionicons/icons";

const ServicePerspective: FC<any> = ({match}) => {
    const [showCard, setShowCard] = useState<boolean>(true)
    const {params: {serviceCode}} = match

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <BackButton/>
                    <IonTitle>Service: {serviceCode}</IonTitle>
                    <IonFab horizontal="end" slot="start">
                        <IonFabButton onClick={e => setShowCard(!showCard)} size={"small"} activated={showCard}>
                            <IonIcon icon={informationOutline}/>
                        </IonFabButton>
                    </IonFab>
                </IonToolbar>
            </IonHeader>
            <IonContent scrollX={false} scrollY={false}>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Map</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <MetlinkServiceView serviceCode={serviceCode}/>
                {showCard && (<MetlinkServiceInfo serviceCode={serviceCode}/>)}
            </IonContent>
        </IonPage>)
}

export default ServicePerspective
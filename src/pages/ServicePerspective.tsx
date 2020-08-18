import React, {FC, useState} from "react";
import {IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import MetlinkServiceView from "../components/metlink/service/MetlinkServiceView";
import MetlinkServiceInfo from "../components/metlink/service/MetlinkServiceInfo";
import BackButton from "../components/ui/BackButton";
import {add, informationOutline, removeOutline} from "ionicons/icons";

const ServicePerspective: FC<any> = ({match}) => {
    const [showCard, setShowCard] = useState<boolean>(false)
    const {params: {serviceCode}} = match

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <BackButton/>
                    <IonTitle>Service: {serviceCode}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent scrollX={false} scrollY={false}>
                <IonFab vertical="bottom" horizontal={"start"} slot="fixed">
                    <IonFabButton onClick={e => setShowCard(!showCard)} size={"small"}>
                        <IonIcon icon={showCard ? removeOutline : informationOutline}/>
                    </IonFabButton>
                </IonFab>
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
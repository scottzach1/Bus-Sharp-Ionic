import React, {FC} from "react";
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import MetlinkServiceView from "../components/metlink/service/MetlinkServiceView";
import MetlinkServiceInfo from "../components/metlink/service/MetlinkServiceInfo";
import BackButton from "../components/ui/BackButton";

const ServicePerspective: FC<any> = ({match}) => {
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
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Map</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <MetlinkServiceInfo serviceCode={serviceCode}/>
                <MetlinkServiceView serviceCode={serviceCode}/>
            </IonContent>
        </IonPage>)
}

export default ServicePerspective
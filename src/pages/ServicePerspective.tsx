import React, {FC} from "react";
import {IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import MetlinkServiceView from "../components/metlink/service/MetlinkServiceView";
import MetlinkServiceInfo from "../components/metlink/service/MetlinkServiceInfo";

const ServicePerspective: FC<any> = ({match}) => {
    const {params: {serviceCode}} = match

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton/>
                    </IonButtons>
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
        </IonPage>    )
}

export default ServicePerspective
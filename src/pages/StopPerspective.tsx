import React, {FC, useState} from "react";
import {IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import MetlinkStopTable from "../components/metlink/MetlinkStopTable";
import MetlinkStopInfo from "../components/metlink/MetlinkStopInfo";

const StopPerspective: FC<any> = ({match}) => {
    const {params: {stopCode}} = match
    const [stopName, setStopName] = useState<string>("");

    async function getStopName() {
        const proxy = "https://cors-anywhere.herokuapp.com/";
        const url = 'https://www.metlink.org.nz/api/v1/Stop/';

        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve
        fetch(proxy + url + stopCode)
            .then(resp => {
                if (resp.ok) Promise.resolve(resp.json())
                    .then(data => setStopName(" - " + data.Name));
            });
    }

    if (!stopName) getStopName().then();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton/>
                    </IonButtons>
                    <IonTitle>Stop: {stopCode}{stopName}</IonTitle>
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
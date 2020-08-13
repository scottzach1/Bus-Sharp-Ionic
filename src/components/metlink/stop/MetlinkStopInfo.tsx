import React, {FC, useState} from 'react';
import {
    IonActionSheet,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle
} from "@ionic/react";
import LoadingSpinner from "../../ui/LoadingSpinner";
import {heart, share, close, map} from "ionicons/icons";

interface Props {
    stopCode: string;
}

const MetlinkStopInfo: FC<Props> = ({stopCode}) => {
    const [stopData, setStopData] = useState<any>(null);
    const [showActionSheet, setShowActionSheet] = useState<boolean>(false);

    async function getStopName() {
        const proxy = "https://cors-anywhere.herokuapp.com/";
        const url = 'https://www.metlink.org.nz/api/v1/Stop/';

        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve
        fetch(proxy + url + stopCode)
            .then(resp => {
                if (resp.ok) Promise.resolve(resp.json())
                    .then(data => setStopData(data));
            });
    }

    function toggleFavouriteStop() {
        let saved: any = JSON.parse(localStorage.saved);

        if (saved.stops.includes(stopCode))
            saved.stops.splice(saved.stops.indexOf(stopCode));
        else
            saved.stops.push(stopCode);

        localStorage.saved = JSON.stringify(saved);
    }

    getStopName().then();

    return (
        <div>
            {stopData && (
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>{stopData.Name}</IonCardTitle>
                        <IonCardSubtitle>Code: {stopData.Sms}</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                        Fare zone: {stopData.Farezone}
                        <IonButton onClick={() => setShowActionSheet(true)} expand="block">
                            Actions
                        </IonButton>
                        <IonActionSheet
                            isOpen={showActionSheet}
                            onDidDismiss={() => setShowActionSheet(false)}
                            cssClass='action-sheet'
                            buttons={[{
                                text: 'Share',
                                icon: share,
                                handler: () => console.log('Share clicked')
                            }, {
                                text: 'View on Map',
                                icon: map,
                                handler: () => console.log('Map clicked')
                            }, {
                                text: 'Favorite',
                                icon: heart,
                                handler: () => toggleFavouriteStop()
                            }, {
                                text: 'Cancel',
                                icon: close,
                                role: 'cancel',
                                handler: () => console.log('Closed clicked')
                            }]}
                        >
                        </IonActionSheet>
                    </IonCardContent>
                </IonCard>
            )}
            {!stopData && (
                <LoadingSpinner/>
            )}
        </div>
    )
}

export default MetlinkStopInfo;
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
import {close, heart, heartOutline, map, share} from "ionicons/icons";
import AsyncStorage from "@react-native-community/async-storage";

interface Props {
    stopCode: string;
}

const MetlinkStopInfo: FC<Props> = ({stopCode}) => {
    const [stopData, setStopData] = useState<any>(null);
    const [showActionSheet, setShowActionSheet] = useState<boolean>(false);

    // Get Stop Data
    if (!stopData) AsyncStorage.getItem('stops').then(stops => {
        if (stops) setStopData(JSON.parse(stops)[stopCode]);
    });

    function toggleFavouriteStop() {
        let saved: any = JSON.parse(localStorage.saved);

        if (saved.stops.includes(stopCode))
            saved.stops.splice(saved.stops.indexOf(stopCode));
        else
            saved.stops.push(stopCode);

        localStorage.saved = JSON.stringify(saved);
    }

    function generateActionSheet() {
        const saved: boolean = JSON.parse(localStorage.saved).stops.includes(stopCode);

        return (
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
                    text: saved ? 'Unfavourite' : 'Favourite',
                    icon: saved ? heartOutline : heart,
                    handler: () => toggleFavouriteStop()
                }, {
                    text: 'Cancel',
                    icon: close,
                    role: 'cancel',
                    handler: () => console.log('Closed clicked')
                }]}
            />
        )
    }

    return (
        <div>
            {stopData && (
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>{stopData.stop_name}</IonCardTitle>
                        <IonCardSubtitle>Code: {stopData.stop_id}</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                        Fare zone: {stopData.zone_id}
                        <IonButton onClick={() => setShowActionSheet(true)} expand="block">
                            Actions
                        </IonButton>
                        {generateActionSheet()}
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
import React, {FC, useState} from "react"
import {
    IonActionSheet,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle
} from "@ionic/react";
import {close, heart, share} from "ionicons/icons";
import LoadingSpinner from "../../ui/LoadingSpinner";

interface Props {
    serviceCode: string
}

const MetlinkServiceInfo: FC<Props> = ({serviceCode}) => {
    const [serviceData, setServiceData] = useState<any>(null);
    const [showActionSheet, setShowActionSheet] = useState<boolean>(false);

    console.log(serviceData)

    async function getServiceName() {
        const proxy = "https://cors-anywhere.herokuapp.com/";
        const url = "https://www.metlink.org.nz/api/v1/ServiceMap/";

        fetch(proxy + url + serviceCode)
            .then(resp => {
                if (resp.ok) Promise.resolve(resp.json())
                    .then(data => setServiceData(data));
            })
    }

    function toggleFavouriteService() {
        let saved: any = JSON.parse(localStorage.saved);

        if (saved.services.includes(serviceCode))
            saved.services.splice(saved.services.indexOf(serviceCode));
        else
            saved.services.push(serviceCode);

        localStorage.saved = JSON.stringify(saved);
    }

    getServiceName().then()

    return (
        <div>
            {serviceData && (
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>{serviceData.Name}</IonCardTitle>
                        <IonCardSubtitle>Code: {serviceData.TrimmedCode}</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
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
                                text: 'Favorite',
                                icon: heart,
                                handler: () => toggleFavouriteService()
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
            {!serviceData && (
                <LoadingSpinner/>
            )}
        </div>
    )
}

export default MetlinkServiceInfo
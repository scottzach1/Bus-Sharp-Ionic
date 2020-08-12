import React, {FC, useState} from 'react';
import {IonBadge, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonLabel, IonList} from "@ionic/react";
import LoadingSpinner from '../ui/LoadingSpinner';

interface Props {
    stopCode: string;
}

const MetlinkStopTable: FC<Props> = ({stopCode}) => {
    const [stopData, setStopData] = useState<any>()
    const [errorMessage, setErrorMessage] = useState<string>()

    async function getStopData() {
        const proxy = "https://cors-anywhere.herokuapp.com/";
        const url = 'https://www.metlink.org.nz/api/v1/StopDepartures/';

        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve
        fetch(proxy + url + stopCode)
            .then(resp => {
                if (!resp.ok) setErrorMessage(resp.statusText);
                else Promise.resolve(resp.json())
                    .then(data => setStopData(data));
            });
    }

    function getTimeRemaining(arrivalTime: string) {
        const arrivalDate: Date = new Date(arrivalTime);
        const currentDate: Date = new Date();

        let timeRemaining: number | string = Math.round((arrivalDate.getTime() - currentDate.getTime()) / 60000);
        return (timeRemaining < 0) ? 'due' : timeRemaining + ' mins';
    }

    function generateStopCards() {
        // This will contain `IonItem`s which will be entries in the `IonList` returned by this function.
        const cards = [];

        let services = stopData.Services;
        services.sort(function (a: { AimedArrival: number; }, b: { AimedArrival: number; }) {
            return a.AimedArrival - b.AimedArrival;
        })

        let counter: number = 0;
        for (const service of services) {
            // Parse the time information from the response json.
            const timeRemaining: string = getTimeRemaining(service.AimedArrival);
            const serviceName: string[] = service.Service.Name.split("-");

            // Check whether the data from the feed was live.
            let realTime: string = (service.IsRealtime) ? ' live' : '';

            cards.push(
                <IonItem key={counter++ + '-' + timeRemaining} href={"/service/" + service.ServiceID}>
                    <IonBadge slot="start">{service.ServiceID}</IonBadge>
                    <IonLabel>{serviceName[1]} - {timeRemaining}</IonLabel>
                    <IonBadge slot="end" color="success">{realTime}</IonBadge>
                </IonItem>
            )
        }

        return (
            <div>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Upcoming Services</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonList lines="full">
                            {cards}
                        </IonList>
                    </IonCardContent>
                </IonCard>
            </div>
        )
    }

    // Call the async method to update the page when data arrives.
    getStopData().then();

    return (
        <div>
            {stopData && (
                // Generate the `IonList` for all upcoming times.
                generateStopCards()
            )}
            {errorMessage && (
                <p>Failed: {errorMessage}</p>
            )}
            {(!stopData && !errorMessage) && (
                <LoadingSpinner/>
            )}
        </div>
    );
}

export default MetlinkStopTable;
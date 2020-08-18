import React, {FC, useState} from 'react';
import {IonBadge, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonLabel, IonList} from "@ionic/react";
import LoadingSpinner from '../../ui/LoadingSpinner';

interface Props {
    stopCode: string;
}

const MetlinkStopTable: FC<Props> = ({stopCode}) => {
    const [stopTimetableData, setStopTimetableData] = useState<any>()
    const [errorMessage, setErrorMessage] = useState<string>()

    const proxy = "https://cors-anywhere.herokuapp.com/";
    const url = 'https://www.metlink.org.nz/api/v1/StopDepartures/';

    // Download Stop Timetable
    if (!stopTimetableData) fetch(proxy + url + stopCode).then(resp => {
        if (!resp.ok) setErrorMessage(resp.statusText);
        else Promise.resolve(resp.json()).then(data => setStopTimetableData(data));
    });

    function getTimeRemaining(arrivalTime: string) {
        const arrivalDate: Date = new Date(arrivalTime);
        const currentDate: Date = new Date();

        let timeRemaining: number | string = Math.round((arrivalDate.getTime() - currentDate.getTime()) / 60000);
        return (timeRemaining < 0) ? 'due' : timeRemaining + ' mins';
    }

    function generateStopCards() {
        // This will contain `IonItem`s which will be entries in the `IonList` returned by this function.
        const cards = [];

        let services = stopTimetableData.Services;
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
            <IonList lines="full">
                {cards}
            </IonList>
        )
    }

    return (
        <div>
            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>Upcoming Services</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    {stopTimetableData && (
                        generateStopCards()
                    )}
                    {errorMessage && (
                        <p>Failed: {errorMessage}</p>
                    )}
                    {(!stopTimetableData && !errorMessage) && (
                        <LoadingSpinner/>
                    )}
                </IonCardContent>
            </IonCard>
        </div>
    );
}

export default MetlinkStopTable;
import React, {FC, useState} from 'react';
import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonItem,
    IonLabel,
    IonList,
    IonToggle
} from "@ionic/react";
import LoadingSpinner from '../../ui/LoadingSpinner';
import ListComponent from "../../ui/ListComponent";

interface Props {
    stopCode: string;
}

const MetlinkStopTable: FC<Props> = ({stopCode}) => {
    const [stopTimetableData, setStopTimetableData] = useState<any>();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [showHours, setShowHours] = useState<boolean>(false);

    const proxy = "https://cors-anywhere.herokuapp.com/";
    const url = 'https://www.metlink.org.nz/api/v1/StopDepartures/';

    // Download Stop Timetable
    if (!stopTimetableData) fetch(proxy + url + stopCode).then(resp => {
        if (!resp.ok) setErrorMessage(resp.statusText);
        else Promise.resolve(resp.json()).then(data => setStopTimetableData(data));
    });

    function getHoursRemaining(arrivalTime: string) {
        const arrivalDate: Date = new Date(arrivalTime);
        const currentDate: Date = new Date();

        let timeRemaining: number | string = Math.round((arrivalDate.getTime() - currentDate.getTime()) / 60000);
        return (timeRemaining < 0) ? 'due' : timeRemaining + ' mins';
    }

    function getTime(arrivalTime: string) {
        const arrivalDate: Date = new Date(arrivalTime);
        const dateTimeFormat = new Intl.DateTimeFormat('en', {
            month: 'short',
            day: '2-digit',
            hour: 'numeric',
            minute: 'numeric'
        })
        return dateTimeFormat.format(arrivalDate);
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

            const serviceName: string[] = service.Service.Name.split("-");

            const timeRemaining: string = (showHours) ? getHoursRemaining(service.AimedArrival) : getTime(service.AimedArrival);

            cards.push(
                <ListComponent
                    isStop={true}
                    code={service.ServiceID}
                    key={counter++ + ' - ' + serviceName[0]}
                    title={serviceName[0]}
                    remaining={timeRemaining}
                    isLive={service.IsRealtime}
                />
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
                    <IonCardSubtitle>
                        <IonItem onClick={() => setShowHours(!showHours)}>
                            <IonLabel>Toggle Hours / Time</IonLabel>
                            <IonToggle checked={showHours}/>
                        </IonItem>
                    </IonCardSubtitle>
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
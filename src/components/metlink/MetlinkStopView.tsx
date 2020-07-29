import React, {FC, useState} from 'react';
import {IonContent, IonItem, IonLabel, IonList, IonPage} from "@ionic/react";
import LoadingSpinner from '../ui/LoadingSpinner';

interface Props {
    stopCode: string;
}

const MetlinkStopView: FC<Props> = ({stopCode}) => {
    const [stopData, setStopData] = useState<any>()
    const [errorMessage, setErrorMessage] = useState<string>()

    async function getStopData() {
        console.log(stopCode)
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

    function generateStopCards() {
        // This will contain `IonItem`s which will be entries in the `IonList` returned by this function.
        const cards = [];

        let count: number = 0;
        const currentDate: Date = new Date();

        let services = stopData.Services;
        services.sort(function (a: { AimedArrival: number; }, b: { AimedArrival: number; }) {
            return a.AimedArrival - b.AimedArrival;
        })

        for (const service of services) {
            // Parse the time information from the response json.
            const arrivalDate: Date = new Date(service.AimedArrival);
            let timeRemaining: number | string = Math.round((arrivalDate.getTime() - currentDate.getTime()) / 60000);
            timeRemaining = (timeRemaining < 0) ? 'due' : timeRemaining + ' mins';

            // Check whether the data from the feed was live.
            let realTime: string = (service.IsRealtime) ? ' (live)' : '';

            cards.push(
                <IonItem key={count}>
                    <IonLabel>
                        {service.ServiceID} - {service.Service.Name} {realTime} - {timeRemaining}.
                    </IonLabel>
                </IonItem>
            )

            count++;
        }

        return (
            <IonList lines="full">
                {cards}
            </IonList>
        )
    }

    // Call the async method to update the page when data arrives.
    getStopData()

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

export default MetlinkStopView;
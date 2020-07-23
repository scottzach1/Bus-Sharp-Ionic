import React, {FC, useState} from 'react';
import {IonItem, IonLabel, IonList} from "@ionic/react";

interface Props {
    stopName: string;
}

const MetlinkStopView: FC<Props> = ({stopName}) => {
    const [stopData, setStopData] = useState<any>()
    const [errorMessage, setErrorMessage] = useState<string>()

    async function getStopData() {
        const proxy = "https://cors-anywhere.herokuapp.com/";
        const url = 'https://www.metlink.org.nz/api/v1/StopDepartures/';

        try {
            setStopData(await (await fetch(proxy + url + stopName)).json());
        } catch (e) {
            setErrorMessage(e);
        }
    }

    function generateStopCards() {
        const cards = [];

        let count: number = 0;
        const currentDate: Date = new Date();

        let services = stopData.Services;
        services.sort(function (a: { AimedArrival: number; }, b: { AimedArrival: number; }) {
            return a.AimedArrival - b.AimedArrival;
        })

        for (const service of services) {
            const date: Date = new Date(service.AimedArrival);
            let mins: number | string = Math.round((date.getTime() - currentDate.getTime()) / 60000);
            mins = (mins < 0) ? 'due' : mins + ' mins';

            let realTime: string = (service.IsRealtime) ? ' (live)' : '';

            cards.push(
                <IonItem key={count}>
                    <IonLabel>
                        {service.ServiceID} - {service.Service.Name} {realTime} - {mins}.
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

    getStopData()

    return (
        <div>
            <h3>Stop {stopName}</h3>
            {stopData && (
                generateStopCards()
            )}
            {errorMessage && (
                <p>{errorMessage}</p>
            )}
        </div>
    );
}

export default MetlinkStopView;
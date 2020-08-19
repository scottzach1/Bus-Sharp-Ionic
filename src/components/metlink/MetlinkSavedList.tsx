import React, {Component} from 'react';
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonItem,
    IonLabel,
    IonList
} from "@ionic/react";
import {Plugins} from '@capacitor/core';
import ListComponent from "../ui/ListComponent";

const {Storage} = Plugins;

interface State {
    savedStopCards: any[] | null,
    savedServiceCards: any[] | null,
    stopData: any[] | null,
    serviceData: any[] | null,
}

class MetlinkSavedList extends Component<{}, State> {
    // Can be true or false, flipping it causes the component to refresh.
    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            savedStopCards: null,
            savedServiceCards: null,
            stopData: null,
            serviceData: null,
        }
    }

    componentDidMount() {
        if (!this.state.stopData) Storage.get({key: 'stops'}).then(res => {
            if (res.value) this.setState({stopData: JSON.parse(res.value)});
        })

        if (!this.state.serviceData) Storage.get({key: 'services'}).then(res => {
            if (res.value) this.setState({serviceData: JSON.parse(res.value)});
        })

        this.updateSavedCards();
    }

    clearSavedStops() {
        Storage.set({key: 'savedStops', value: JSON.stringify([])})
            .then(() => this.updateSavedCards())
            .catch(e => console.error(e));
    }

    clearSavedServices() {
        Storage.set({key: 'savedServices', value: JSON.stringify([])})
            .then(() => this.updateSavedCards())
            .catch(e => console.error(e));
    }

    updateSavedCards() {
        Storage.get({key: 'savedStops'}).then(res => {
            if (!res.value) return;
            let stopCards: any[] = [];

            let counter: number = 0;
            for (const stopCode of JSON.parse(res.value)) {

                let stopName: string = (this.state.stopData) ? this.state.stopData[stopCode].stop_name : '';

                stopCards.push(
                    <ListComponent
                        isStop={true}
                        code={stopCode}
                        title={stopName}
                        key={counter++ + ' - ' + stopCode}
                    />
                );
            }
            if (stopCards.length === 0) stopCards.push(
                <IonItem key='empty-services'>
                    <IonLabel>Empty</IonLabel>
                </IonItem>
            )
            this.setState({savedStopCards: stopCards});
        });

        Storage.get({key: 'savedServices'}).then(res => {
            if (!res.value) return;
            let serviceCards: any[] = [];

            let counter: number = 0;
            for (const serviceCode of JSON.parse(res.value)) {
                let serviceName: string = (this.state.serviceData) ? this.state.serviceData[serviceCode].route_long_name : '';

                serviceCards.push(
                    <ListComponent
                        isStop={false}
                        code={serviceCode}
                        title={serviceName}
                        key={counter++ + ' - ' + serviceCode}
                    />
                )
            }
            if (serviceCards.length === 0) serviceCards.push(
                <IonItem key='empty-services'>
                    <IonLabel>Empty</IonLabel>
                </IonItem>
            )
            this.setState({savedServiceCards: serviceCards});
        });
    }

    render() {
        return (
            <div>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Stops</IonCardTitle>
                        <IonCardSubtitle>
                            <IonButton onClick={() => this.clearSavedStops()}>Clear</IonButton>
                        </IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonList lines="full">
                            {this.state.savedStopCards ? this.state.savedStopCards :
                                <IonItem><IonLabel>Failed to load!</IonLabel></IonItem>}
                        </IonList>
                    </IonCardContent>
                </IonCard>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Services</IonCardTitle>
                        <IonCardSubtitle>
                            <IonButton onClick={() => this.clearSavedServices()}>Clear</IonButton>
                        </IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonList lines="full">
                            {this.state.savedServiceCards ? this.state.savedServiceCards :
                                <IonItem><IonLabel>Failed to load!</IonLabel></IonItem>}
                        </IonList>
                    </IonCardContent>
                </IonCard>
            </div>
        )
    }
}

export default MetlinkSavedList;
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
import ListComponent from "../ui/ListComponent";
import {
    getSavedServices,
    getSavedStops, getServices,
    getStops,
    setSavedServices,
    setSavedStops
} from "../../services/StorageManager";
import {UserContext} from "../../providers/UserProvider";

interface State {
    savedStopCards: any[] | null,
    savedServiceCards: any[] | null,
    stopData: any[] | null,
    serviceData: any[] | null,
}

class MetlinkSavedList extends Component<{}, State> {
    static contextType = UserContext;

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
        if (!this.state.stopData) getStops().then(stops => this.setState({stopData: stops}));
        if (!this.state.serviceData) getServices().then(services => this.setState({serviceData: services}));

        this.updateSavedCards();
    }

    clearSavedStops() {
        setSavedStops([], this.context).then(() => this.updateSavedCards);
    }

    clearSavedServices() {
        setSavedServices([], this.context).then(() => this.updateSavedCards);
    }

    updateSavedCards() {
        getSavedStops().then((stops) => {
            let stopCards: any[] = [];

            let counter: number = 0;
            for (const stopCode of stops) {
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
                <IonItem key='empty-stops'>
                    <IonLabel>Empty</IonLabel>
                </IonItem>
            )
            this.setState({savedStopCards: stopCards});
        });

        getSavedServices().then((services) => {
            let serviceCards: any[] = [];

            let counter: number = 0;
            for (const serviceCode of services) {
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
                                <IonItem key={"failed to load stops"}><IonLabel>Failed to load!</IonLabel></IonItem>}
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
                                <IonItem key={"failed to load services"}><IonLabel>Failed to load!</IonLabel></IonItem>}
                        </IonList>
                    </IonCardContent>
                </IonCard>
            </div>
        )
    }
}

export default MetlinkSavedList;
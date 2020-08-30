import React, {Component} from 'react';
import {
    IonAlert,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonItem,
    IonLabel,
    IonList,
    IonToast
} from "@ionic/react";
import {UserContext} from "../providers/UserProvider";
import {getSavedServices, getServices, setSavedServices,} from "../external/StorageManager";
import ListComponent from "../shared/static/ui/ListComponent";

interface State {
    savedStopCards: any[] | null,
    savedServiceCards: any[] | null,
    stopData: any[] | null,
    serviceData: any[] | null,
    showClearedSuccess: boolean,
    showClearAlert: boolean,
}

class MetlinkSavedServiceList extends Component<{}, State> {
    static contextType = UserContext;

    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            savedStopCards: null,
            savedServiceCards: null,
            stopData: null,
            serviceData: null,
            showClearedSuccess: false,
            showClearAlert: false,
        }
    }

    componentDidMount() {
        if (!this.state.serviceData) getServices().then(services => this.setState({serviceData: services}));

        this.updateSavedCards();
    }

    clearSavedServices() {
        setSavedServices([], this.context)
            .then(() => this.updateSavedCards())
            .then(() => this.setState({showClearedSuccess: true}));
    }

    updateSavedCards() {
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
            <>
                <IonCard>
                    <IonCardHeader>
                        <IonItem>
                            <IonCardTitle>Services</IonCardTitle>
                            <IonButton onClick={() => this.setState({showClearAlert: true})}
                                       slot={"end"}>Clear</IonButton>
                        </IonItem>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonList lines="full">
                            {this.state.savedServiceCards ? this.state.savedServiceCards :
                                <IonItem key={"failed to load services"}><IonLabel>Failed to load!</IonLabel></IonItem>}
                        </IonList>
                    </IonCardContent>
                </IonCard>
                <IonToast
                    isOpen={this.state.showClearedSuccess}
                    onDidDismiss={() => this.setState({showClearedSuccess: false})}
                    message={"Services Cleared!"}
                    duration={1200}
                />
                <IonAlert
                    isOpen={this.state.showClearAlert}
                    onDidDismiss={() => this.setState({showClearAlert: false})}
                    header={'Clear Services'}
                    subHeader={'Are you sure?'}
                    message={'This will loose all of the user saved services both locally and on your account.'}
                    buttons={[{text: 'Cancel', role: 'cancel'}, {
                        text: 'Clear',
                        handler: () => this.clearSavedServices()
                    }]}
                />
            </>
        )
    }
}

export default MetlinkSavedServiceList;

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
import {getSavedStops, getStops, setSavedStops} from "../external/StorageManager";
import ListComponent from "../shared/static/ui/ListComponent";

interface State {
    savedStopCards: any[] | null,
    savedServiceCards: any[] | null,
    stopData: any[] | null,
    serviceData: any[] | null,
    showClearedSuccess: boolean,
    showClearAlert: boolean,
}

class MetlinkSavedStopList extends Component<{}, State> {
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
        if (!this.state.stopData) getStops().then(stops => this.setState({stopData: stops}));

        this.updateSavedCards();
    }

    clearSavedStops() {
        setSavedStops([], this.context)
            .then(() => this.updateSavedCards())
            .then(() => this.setState({showClearedSuccess: true}));
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
    }

    render() {
        return (
            <>
                <IonCard>
                    <IonCardHeader>
                        <IonItem>
                            <IonCardTitle>Stops</IonCardTitle>
                            <IonButton onClick={() => this.setState({showClearAlert: true})}
                                       slot={"end"}>Clear</IonButton>
                        </IonItem>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonList lines="full">
                            {this.state.savedStopCards ? this.state.savedStopCards :
                                <IonItem key={"failed to load stops"}><IonLabel>Failed to load!</IonLabel></IonItem>}
                        </IonList>
                    </IonCardContent>
                </IonCard>
                <IonToast
                    isOpen={this.state.showClearedSuccess}
                    onDidDismiss={() => this.setState({showClearedSuccess: false})}
                    message={"Stops Cleared!"}
                    duration={1200}
                />
                <IonAlert
                    isOpen={this.state.showClearAlert}
                    onDidDismiss={() => this.setState({showClearAlert: false})}
                    header={'Clear Stops'}
                    subHeader={'Are you sure?'}
                    message={'This will loose all of the user saved stops both locally and on your account.'}
                    buttons={[{text: 'Cancel', role: 'cancel'}, {
                        text: 'Clear',
                        handler: () => this.clearSavedStops()
                    }]}
                />
            </>
        )
    }
}

export default MetlinkSavedStopList;

import React, {Component} from 'react';
import {
    IonActionSheet,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonToast
} from "@ionic/react";
import {close, heart, heartOutline, map, share} from "ionicons/icons";
import {Plugins} from '@capacitor/core';
import LoadingSpinner from "../../ui/LoadingSpinner";

const {Storage, Share} = Plugins;


interface Props {
    stopCode: string;
}

interface State {
    stopData: any | null,
    showActionSheet: boolean,
    showToast: boolean,
    saved: boolean
}

class MetlinkStopInfo extends Component<Props, State> {

    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            stopData: null,
            showActionSheet: false,
            showToast: false,
            saved: false
        };
    };

    componentDidMount() {
        if (!this.state.stopData) Storage.get({key: 'stops'}).then(res => {
            if (res.value) this.setState({
                stopData: JSON.parse(res.value)[this.props.stopCode],
            });
        }).catch(e => console.log(e));

        Storage.get({key: 'savedStops'}).then(res => {
            if (res.value) {
                let saved: boolean = JSON.parse(res.value).includes(this.props.stopCode)
                if (this.state.saved !== saved) this.setState({
                    saved: saved,
                })
            }
        }).catch(e => console.log(e));
    }

    toggleFavouriteStop() {
        Storage.get({key: 'savedStops'}).then(res => {
            if (res.value) {
                let savedStops: any[] = JSON.parse(res.value);
                if (savedStops.includes(this.props.stopCode))
                    savedStops.splice(savedStops.indexOf(this.props.stopCode));
                else
                    savedStops.push(this.props.stopCode);
                Storage.set({
                    key: 'savedStops',
                    value: JSON.stringify(savedStops)
                }).then(() => this.setState({
                    saved: savedStops.includes(this.props.stopCode)
                })).catch(e => console.log(e));
            }
        });
    }

    generateActionSheet() {
        return (
            <IonActionSheet
                isOpen={this.state.showActionSheet}
                onDidDismiss={() => this.setState({showActionSheet: false})}
                cssClass='action-sheet'
                buttons={[{
                    text: 'Share',
                    icon: share,
                    handler: () => Share.share({
                        title: 'Metlink Stop: ' + this.props.stopCode,
                        text: this.state.stopData.stop_name,
                        url: window.location.toString(),
                        dialogTitle: 'Share with your buddies'
                    }).catch(err => {
                        // Failed to open share API, resort to clipboard share.
                        navigator.clipboard.writeText(window.location.toString())
                            .then(() => this.setState({showToast: true}))
                            .catch(() => console.log('Failed to copy to clipboard'));
                    })
                }, {
                    text: 'View on Map',
                    icon: map,
                    handler: () => console.log('Map clicked')
                }, {
                    text: this.state.saved ? 'Unfavourite' : 'Favourite',
                    icon: this.state.saved ? heartOutline : heart,
                    handler: () => this.toggleFavouriteStop()
                }, {
                    text: 'Cancel',
                    icon: close,
                    role: 'cancel',
                    handler: () => console.log('Closed clicked')
                }]}
            />
        )
    }

    render() {
        return (
            <div>
                {(this.state && this.state.stopData) && (
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>{this.state.stopData.stop_name}</IonCardTitle>
                            <IonCardSubtitle>Code: {this.state.stopData.stop_id}</IonCardSubtitle>
                            <IonCardSubtitle>Fare zone: {this.state.stopData.zone_id}</IonCardSubtitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonButton onClick={() => this.setState({showActionSheet: true})} expand="block">
                                Actions
                            </IonButton>
                            {this.generateActionSheet()}
                        </IonCardContent>
                    </IonCard>
                )}
                {!this.state.stopData && (
                    <LoadingSpinner/>
                )}
                <IonToast
                    isOpen={this.state.showToast}
                    onDidDismiss={() => this.setState({showToast: false})}
                    message="Copied to clipboard!"
                    duration={1200}
                />
            </div>
        )
    }
}

export default MetlinkStopInfo;
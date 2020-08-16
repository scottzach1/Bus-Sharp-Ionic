import React, {Component, FC, useState} from "react"
import {
    IonActionSheet,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle
} from "@ionic/react";
import {close, heart, heartOutline, map, share} from "ionicons/icons";
import {Plugins} from '@capacitor/core';
import LoadingSpinner from "../../ui/LoadingSpinner";

const {Storage} = Plugins;


interface Props {
    serviceCode: string
}

interface State {
    serviceData: any | null,
    showActionSheet: boolean,
    saved: boolean
}

class MetlinkServiceInfo extends Component<Props, State> {

    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            serviceData: null,
            showActionSheet: false,
            saved: false
        }
    }


    componentDidMount() {
        if (!this.state.serviceData) Storage.get({key: 'services'}).then(res => {
            if (res.value) this.setState({
                serviceData: JSON.parse(res.value)[this.props.serviceCode],
            });
        }).catch(e => console.log(e));

        Storage.get({key: 'savedStops'}).then(res => {
            if (res.value) {
                let saved: boolean = JSON.parse(res.value).includes(this.props.serviceCode)
                if (this.state.saved !== saved) this.setState({
                    saved: saved,
                })
            }
        }).catch(e => console.log(e));
    }

    toggleFavouriteStop() {
        Storage.get({key: 'savedServices'}).then(res => {
            if (res.value) {
                let savedServices: any[] = JSON.parse(res.value);
                if (savedServices.includes(this.props.serviceCode))
                    savedServices.splice(savedServices.indexOf(this.props.serviceCode));
                else
                    savedServices.push(this.props.serviceCode);
                Storage.set({
                    key: 'savedServices',
                    value: JSON.stringify(savedServices)
                }).then(() => this.setState({
                    saved: savedServices.includes(this.props.serviceCode)
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
                    handler: () => console.log('Share clicked')
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
                {(this.state && this.state.serviceData) && (
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>{this.state.serviceData.route_long_name}</IonCardTitle>
                            <IonCardSubtitle>Code: {this.state.serviceData.route_short_name}</IonCardSubtitle>
                            <IonCardSubtitle>Agency: {this.state.serviceData.agency_id}</IonCardSubtitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonButton onClick={() => this.setState({showActionSheet: true})} expand="block">
                                Actions
                            </IonButton>
                            {this.generateActionSheet()}
                        </IonCardContent>
                    </IonCard>
                )}
                {!this.state.serviceData && (
                    <LoadingSpinner/>
                )}
            </div>
        )
    }
}

export default MetlinkServiceInfo
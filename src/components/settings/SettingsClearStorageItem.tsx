import React, {Component} from "react";
import {IonAlert, IonButton, IonIcon, IonItem, IonLabel, IonToast} from "@ionic/react";
import {trashBinSharp} from "ionicons/icons";
import {Plugins} from "@capacitor/core";

const {Storage} = Plugins;

interface Props {
}

interface State {
    showClearAlert: boolean,
    showClearedToastSuccess: boolean,
    showClearedToastFailure: boolean,
}


class SettingsClearStorageItem extends Component<Props, State> {
    constructor(props: Readonly<Props>) {
        super(props);

        this.state = {
            showClearAlert: false,
            showClearedToastSuccess: false,
            showClearedToastFailure: false,
        }
    }

    clearStorage() {
        Storage.clear()
            .then(() => this.setState({showClearedToastSuccess: true}))
            .catch(() => this.setState({showClearedToastFailure: true}));
    }


    render() {
        return (
            <div>
                <IonItem
                    onClick={() => this.setState({showClearAlert: true})}
                >
                    <IonIcon icon={trashBinSharp}/>
                    <span>&nbsp;&nbsp;</span>
                    <IonLabel>Clear Storage</IonLabel>
                    <IonButton expand="block"><IonLabel>Clear</IonLabel></IonButton>
                </IonItem>
                <IonAlert
                    isOpen={this.state.showClearAlert}
                    onDidDismiss={() => this.setState({showClearAlert: false})}
                    cssClass='my-custom-class'
                    header={'Clear Storage'}
                    subHeader={'Are you sure?'}
                    message={'This will loose all user saved preferences such as saved stops, services and selected theme.'}
                    buttons={[{text: 'Cancel', role: 'cancel'}, {
                        text: 'Clear',
                        handler: () => this.clearStorage()
                    }]}
                />
                <IonToast
                    isOpen={this.state.showClearedToastSuccess}
                    onDidDismiss={() => this.setState({showClearedToastSuccess: false})}
                    message={"Success"}
                    duration={1200}
                />
                <IonToast
                    isOpen={this.state.showClearedToastFailure}
                    onDidDismiss={() => this.setState({showClearedToastFailure: false})}
                    color={"danger"}
                    message={"Failure"}
                    duration={1200}
                />

            </div>
        );
    }
}

export default SettingsClearStorageItem;
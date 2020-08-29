import React, {Component} from "react";
import {UserContext} from "../providers/UserProvider";
import {IonButton, IonIcon, IonItem, IonLabel} from "@ionic/react";
import {personCircleSharp} from "ionicons/icons";

class SettingsAccountItem extends Component {
    static contextType = UserContext;

    render() {
        return (
            <IonItem href={this.context?.uid ? '/account' : '/login'}>
                <IonIcon icon={personCircleSharp}/>
                <span>&nbsp;&nbsp;</span>
                <IonLabel>User Account</IonLabel>
                <IonButton expand={"block"} slot={"end"}>
                    <IonLabel>{this.context?.uid ? 'Account' : 'Login'}</IonLabel>
                </IonButton>
            </IonItem>
        );
    }
}

export default SettingsAccountItem;

import React, {Component} from "react";
import {IonBackButton, IonButtons, IonContent, IonHeader, IonLabel, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import {UserContext} from "../providers/UserProvider";

interface Props {

}

interface State {

}

class AccountInfoPerspective extends Component {
    static contextType = UserContext;

    componentDidMount() {
    }

    render() {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton/>
                        </IonButtons>
                        <IonTitle>Account Info</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">Account Info</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    {this.context && <IonLabel>{this.context.displayName}</IonLabel>}
                </IonContent>
            </IonPage>
        );
    }
}
// AccountInfoPerspective.contextType = UserContext;

export default AccountInfoPerspective;
import React, {Component} from "react";
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonLabel,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {auth} from "../services/Firebase";

interface Props {

}

interface State {

}

class AccountLogoutPerspective extends Component<Props, State> {
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
                    <IonButton onClick={() => auth.signOut()}>Logout</IonButton>
                </IonContent>
            </IonPage>
        );
    }

}

export default AccountLogoutPerspective;
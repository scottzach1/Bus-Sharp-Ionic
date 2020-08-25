import React, {Component} from "react";
import {
    IonBackButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {UserContext} from "../providers/UserProvider";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import LogoutButton from "../components/account/LogoutButton";

class AccountInfoPerspective extends Component {
    static contextType = UserContext;

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
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>
                                {this.context && this.context.displayName}
                            </IonCardTitle>
                            <IonCardSubtitle>
                                {this.context && this.context.email}
                            </IonCardSubtitle>
                        </IonCardHeader>
                        <IonCardContent>
                            {!this.context?.uid && <LoadingSpinner/>}
                            <LogoutButton/>
                        </IonCardContent>
                    </IonCard>
                </IonContent>
            </IonPage>
        );
    }
}

export default AccountInfoPerspective;
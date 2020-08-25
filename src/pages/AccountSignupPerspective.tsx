import React, {Component} from "react";
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";

interface Props {

}

interface State {

}

class AccountSignupPerspective extends Component<Props, State> {
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
                    <form method={"post"}>
                        <IonItem>
                            <IonLabel>Email</IonLabel>
                            <IonInput inputmode={"email"} pattern={"email"} placeholder={"user@example.com"}/>
                        </IonItem>
                        <IonItem>
                            <IonLabel>Password</IonLabel>
                            <IonInput type={"password"} autocomplete={"new-password"}/>
                        </IonItem>
                        <IonItem>
                            <IonLabel>Confirm Password</IonLabel>
                            <IonInput type={"password"} autocomplete={"new-password"}/>
                        </IonItem>
                        <IonButton expand={"block"} type={"submit"}>
                            Login
                        </IonButton>
                    </form>
                </IonContent>
            </IonPage>
        );
    }
}

export default AccountSignupPerspective;
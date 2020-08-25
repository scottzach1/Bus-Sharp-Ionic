import React, {Component} from "react";
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCheckbox,
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

class AccountLoginPerspective extends Component<Props, State> {
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
                            <IonInput inputmode={"email"} placeholder={"user@example.com"}/>
                        </IonItem>
                        <IonItem>
                            <IonLabel>Password</IonLabel>
                            <IonInput type={"password"} autocomplete={"current-password"}/>
                        </IonItem>
                        <IonItem>
                            <IonLabel>Remember me</IonLabel>
                            <IonCheckbox slot={"start"} defaultChecked={true}/>
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

export default AccountLoginPerspective;
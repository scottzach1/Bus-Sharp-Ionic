import React, {FC} from "react";
import {IonCard, IonCardContent, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import BackButton from "../../components/ui/BackButton";

const AccountWaitingPerspective: FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <BackButton/>
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
                    <IonCardContent>
                        <LoadingSpinner/>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
}

export default AccountWaitingPerspective;
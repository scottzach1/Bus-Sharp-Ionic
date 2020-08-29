import React, {FC} from "react";
import {IonCard, IonCardContent, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import BackButton from "../../shared/static/ui/BackButton";
import LoadingSpinner from "../../shared/static/ui/LoadingSpinner";

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

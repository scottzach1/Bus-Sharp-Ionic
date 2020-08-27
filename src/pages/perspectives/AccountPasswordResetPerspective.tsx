import React, {FC, useState} from "react";
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {auth} from "../../services/Firebase";
import BackButton from "../../components/ui/BackButton";

const AccountPasswordResetPerspective: FC = () => {
    const [userEmail, setUserEmail] = useState<string>('');
    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    async function passwordResetHandler(email: string) {
        setError(null);
        setShowSuccess(false);
        auth.sendPasswordResetEmail(email)
            .then(() => setShowSuccess(true))
            .catch((e) => setError(e.message));
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <BackButton/>
                    <IonTitle>Password Reset</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Password Reset</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonCard>
                    <IonCardContent>
                        <IonItem>
                            <IonLabel>Email</IonLabel>
                            <IonInput
                                inputmode={"email"}
                                autocomplete={"email"}
                                placeholder={"user@example.com"}
                                value={userEmail}
                                onIonChange={(e) => setUserEmail(e.detail.value!)}
                            />
                        </IonItem>
                        <IonButton
                            expand={"block"}
                            type={"submit"}
                            onClick={() => passwordResetHandler(userEmail)}
                        >
                            Reset password
                        </IonButton>
                    </IonCardContent>
                </IonCard>
                {showSuccess &&
                <IonCard color={"success"}>
                    <IonCardHeader>
                        Password reset link has been sent to your email.
                    </IonCardHeader>
                </IonCard>}
                {error &&
                <IonCard color={"danger"}>
                    <IonCardHeader>
                        {error}
                    </IonCardHeader>
                </IonCard>}
            </IonContent>
        </IonPage>
    );
}

export default AccountPasswordResetPerspective;
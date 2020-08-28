import React, {FC, useState} from "react";
import {IonButton, IonCard, IonCardContent, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import {auth} from "../../services/Firebase";
import BackButton from "../../components/ui/BackButton";
import ErrorCard from "../../components/ui/ErrorCard";
import SuccessCard from "../../components/ui/SuccessCard";
import AccountEmailField from "../../components/account/AccountEmailField";

const AccountPasswordResetPerspective: FC = () => {
    const [userEmail, setUserEmail] = useState<string>('');
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    async function passwordResetHandler(email: string) {
        setError(null);
        setSuccess(null);
        auth.sendPasswordResetEmail(email)
            .then(() => setSuccess("Success!"))
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
                        <AccountEmailField
                            value={userEmail}
                            handler={(email) => setUserEmail(email)}
                        />
                        <IonButton
                            expand={"block"}
                            type={"submit"}
                            onClick={() => passwordResetHandler(userEmail)}
                        >
                            Reset password
                        </IonButton>
                    </IonCardContent>
                </IonCard>
                <SuccessCard successMessage={success}/>
                <ErrorCard errorMessage={error}/>
            </IonContent>
        </IonPage>
    );
}

export default AccountPasswordResetPerspective;
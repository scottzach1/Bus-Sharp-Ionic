import {IonButton, IonIcon, IonLabel} from "@ionic/react";
import {logoGoogle} from "ionicons/icons";
import React, {FC} from "react";
import {signInWithGoogle} from "../../external/Firebase";

const AccountSignInWithGoogleButton: FC = () => {
    return (
        <IonButton color={"danger"} expand={"block"} type={"submit"} onClick={signInWithGoogle}>
            <IonIcon icon={logoGoogle}/>
            <span>&nbsp;&nbsp;</span>
            <IonLabel>Sign in with Google</IonLabel>
        </IonButton>
    )
}

export default AccountSignInWithGoogleButton;

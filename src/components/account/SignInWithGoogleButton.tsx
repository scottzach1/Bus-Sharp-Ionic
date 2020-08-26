import {IonButton, IonIcon, IonLabel} from "@ionic/react";
import {signInWithGoogle} from "../../services/Firebase";
import {logoGoogle} from "ionicons/icons";
import React, {FC} from "react";

const SignInWithGoogleButton: FC = () => {
    return (
        <IonButton color={"danger"} expand={"block"} type={"submit"} onClick={signInWithGoogle}>
            <IonIcon icon={logoGoogle}/>
            <span>&nbsp;&nbsp;</span>
            <IonLabel>Sign in with Google</IonLabel>
        </IonButton>
    )
}

export default SignInWithGoogleButton;
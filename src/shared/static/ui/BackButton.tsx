import React, {FC} from "react"
import {IonButton, IonButtons, IonIcon} from "@ionic/react";
import {caretBackOutline} from "ionicons/icons";

const BackButton: FC = () => {

    return (
        <IonButtons slot={"start"}>
            <IonButton onClick={() => window.history.back()}>
                <IonIcon icon={caretBackOutline}/>
            </IonButton>
        </IonButtons>
    );
}

export default BackButton
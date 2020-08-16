import React, {FC} from "react"
import {IonBackButton, IonButton, IonButtons, IonIcon} from "@ionic/react";
import {caretBackOutline} from "ionicons/icons";

const BackButton: FC = () => {

    return (
        <IonButtons slot={"start"}>
            <IonButton onClick={e => window.history.back()}>
                <IonIcon icon={caretBackOutline}/>
            </IonButton>
        </IonButtons>
    );
}

export default BackButton
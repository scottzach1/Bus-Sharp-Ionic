import React, {FC} from "react";
import {IonIcon, IonItem, IonLabel} from "@ionic/react";
import {alertCircleSharp, logoTwitter} from "ionicons/icons";

const SettingsTwitterFeedContainer: FC = () => {
    return (
        <IonItem href={"/twitter"}>
            <IonIcon icon={logoTwitter}/>
            <span>&nbsp;&nbsp;</span>
            <IonLabel>Twitter Update Feed</IonLabel>
            <IonIcon icon={alertCircleSharp}/>
        </IonItem>
    )
};

export default SettingsTwitterFeedContainer;
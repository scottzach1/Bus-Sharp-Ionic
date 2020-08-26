import React, {FC} from "react";
import {IonIcon, IonItem, IonLabel} from "@ionic/react";
import {logoTwitter, mailSharp} from "ionicons/icons";

const SettingsTwitterFeedItem: FC = () => {
    return (
        <IonItem href={"/twitter"}>
            <IonIcon icon={logoTwitter}/>
            <span>&nbsp;&nbsp;</span>
            <IonLabel>Twitter Update Feed</IonLabel>
            <IonIcon icon={mailSharp}/>
        </IonItem>
    )
};

export default SettingsTwitterFeedItem;
import React, {FC} from "react";
import {IonIcon, IonItem, IonLabel} from "@ionic/react";
import {helpCircleSharp, mailSharp} from "ionicons/icons";

const SettingsFeedbackItem: FC = () => {
    return (
        <IonItem href={"mailto:feedback@welly.live"}>
            <IonIcon icon={helpCircleSharp}/>
            <span>&nbsp;&nbsp;</span>
            <IonLabel>Help and Feedback</IonLabel>
            <IonIcon icon={mailSharp}/>
        </IonItem>
    )
};

export default SettingsFeedbackItem;
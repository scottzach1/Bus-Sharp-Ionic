import React, {FC} from "react";
import {IonIcon, IonItem, IonLabel} from "@ionic/react";
import {codeSlashSharp, logoGitlab} from "ionicons/icons";

const SettingsSourceCodeItem: FC = () => {
    return (
        <IonItem href={"https://gitlab.ecs.vuw.ac.nz/late-for-the-bus/bus-sharp"}>
            <IonIcon icon={logoGitlab}/>
            <span>&nbsp;&nbsp;</span>
            <IonLabel>View Source Code</IonLabel>
            <IonIcon icon={codeSlashSharp}/>
        </IonItem>
    )
}

export default SettingsSourceCodeItem;
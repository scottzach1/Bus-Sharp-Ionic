import React, {FC} from "react";
import {IonInput, IonItem, IonLabel} from "@ionic/react";

interface Props {
    value: string,
    handler: (email: string) => void,
}

const AccountEmailField: FC<Props> = (props) => {
    return (
        <IonItem>
            <IonLabel>Email</IonLabel>
            <IonInput
                inputmode={"email"}
                autocomplete={"email"}
                placeholder={"user@example.com"}
                value={props.value}
                onIonChange={(e) => props.handler(e.detail.value!)}
            />
        </IonItem>
    )
}

export default AccountEmailField;

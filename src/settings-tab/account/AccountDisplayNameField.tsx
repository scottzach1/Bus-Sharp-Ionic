import React, {FC} from "react";
import {IonInput, IonItem, IonLabel} from "@ionic/react";

interface Props {
    value: string,
    handler: (displayName: string) => void,
}

const AccountDisplayNameField: FC<Props> = (props) => {
    return (
        <IonItem>
            <IonLabel>Display Name</IonLabel>
            <IonInput
                inputmode={"text"}
                autocomplete={"name"}
                placeholder={"Bobby"}
                value={props.value}
                onIonChange={(e) => props.handler(e.detail.value!)}
            />
        </IonItem>
    )
}

export default AccountDisplayNameField;
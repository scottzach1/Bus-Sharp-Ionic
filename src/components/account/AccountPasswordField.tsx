import React, {FC} from "react";
import {IonInput, IonItem, IonLabel} from "@ionic/react";

interface Props {
    value: string,
    handler: (password: string) => void,
    new?: boolean,
    confirmation?: boolean,
}

const AccountPasswordField: FC<Props> = (props) => {
    let placeholder: string;

    if (!props.new)
        placeholder = "password"
    else {
        if (props.confirmation)
            placeholder = "re-enter password";
        else
            placeholder = "new password";
    }

    return (
        <IonItem>
            <IonLabel>Password</IonLabel>
            <IonInput
                type={"password"}
                autocomplete={(props.new) ? "new-password" : "current-password"}
                placeholder={placeholder}
                value={props.value}
                onIonChange={(e) => props.handler(e.detail.value!)}
            />
        </IonItem>
    )
}

export default AccountPasswordField;
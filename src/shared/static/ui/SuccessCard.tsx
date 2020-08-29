import React, {FC} from "react";
import {IonCard, IonIcon, IonItem, IonLabel} from "@ionic/react";
import {checkmarkCircleSharp} from "ionicons/icons";

interface Props {
    successMessage: string | boolean | null | undefined,
}

const SuccessCard: FC<Props> = (props) => {
    return (
        <>
            {props.successMessage &&
            <IonCard color={"success"}>
                <IonItem color={"success"}>
                    <IonLabel>
                        {(typeof (props.successMessage) == "string") ? props.successMessage : "Success!"}
                    </IonLabel>
                    <IonIcon icon={checkmarkCircleSharp}/>
                </IonItem>
            </IonCard>}
        </>
    )
}

export default SuccessCard;
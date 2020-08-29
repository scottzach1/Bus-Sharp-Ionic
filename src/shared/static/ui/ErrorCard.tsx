import React, {FC} from "react";
import {IonCard, IonIcon, IonItem, IonLabel} from "@ionic/react";
import {alertCircleSharp} from "ionicons/icons";

interface Props {
    errorMessage: string | boolean | null | undefined,
}

const ErrorCard: FC<Props> = (props) => {
    return (
        <>
            {props.errorMessage &&
            <IonCard color={"danger"}>
                <IonItem color={"danger"}>
                    <IonLabel>
                        {(typeof (props.errorMessage) == "string") ? props.errorMessage : "Failed!"}
                    </IonLabel>
                    <IonIcon icon={alertCircleSharp}/>
                </IonItem>
            </IonCard>}
        </>
    )
}

export default ErrorCard;
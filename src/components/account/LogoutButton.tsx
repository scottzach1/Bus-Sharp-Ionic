import React, {FC} from "react";
import {IonButton} from "@ionic/react";
import {auth} from "../../services/Firebase";

const LogoutButton: FC = () => {
    return (
        <IonButton onClick={() => auth.signOut()} expand={"block"}>Logout</IonButton>
    )
}

export default LogoutButton;
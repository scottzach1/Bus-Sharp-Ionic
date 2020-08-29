import React, {FC, useState} from "react";
import {IonButton, IonToast} from "@ionic/react";
import {auth} from "../../external/Firebase";

const AccountLogoutButton: FC = () => {
    const [showToast, setShowToast] = useState<boolean>(false);

    return (
        <div>
            <IonButton
                onClick={() => auth.signOut().then(() => setShowToast(true))}
                expand={"block"}>
                Logout
            </IonButton>
            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message="Sign out successful!"
                duration={1200}
            />
        </div>
    );
}

export default AccountLogoutButton;

import React, {Component} from "react";
import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonItem,
    IonPage,
    IonTextarea,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {UserContext} from "../providers/UserProvider";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import AccountLogoutButton from "../components/account/AccountLogoutButton";
import {getUserDocument} from "../services/Firebase";
import BackButton from "../components/ui/BackButton";

interface Props {
}

interface State {
    userData: any | null;
}

class AccountInfoPerspective extends Component<Props, State> {
    static contextType = UserContext;

    constructor(props: Readonly<Props>) {
        super(props);

        this.state = {
            userData: null,
        }
    }

    componentDidMount() {
        getUserDocument(this.context).then((doc: any | null) => {
            if (!doc) return;
            this.setState({userData: JSON.stringify(doc, null, 4)});
        })
    }

    render() {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <BackButton/>
                        <IonTitle>Account Info</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">Account Info</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>
                                {this.context && this.context.displayName}
                            </IonCardTitle>
                            <IonCardSubtitle>
                                {this.context && this.context.email}
                            </IonCardSubtitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonItem>
                                <IonTextarea autoGrow={true} value={this.state.userData} inputmode={"none"}>
                                    User Data
                                </IonTextarea>
                            </IonItem>
                            {!this.context?.uid && <LoadingSpinner/>}
                            <AccountLogoutButton/>
                        </IonCardContent>
                    </IonCard>
                </IonContent>
            </IonPage>
        );
    }
}

export default AccountInfoPerspective;
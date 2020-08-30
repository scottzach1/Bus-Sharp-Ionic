import React, {Component} from "react";
import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonItem,
    IonPage,
    IonRow,
    IonText,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {UserContext} from "../../providers/UserProvider";
import AccountLogoutButton from "./AccountLogoutButton";
import {getUserDocument} from "../../external/Firebase";
import BackButton from "../../shared/static/ui/BackButton";
import LoadingSpinner from "../../shared/static/ui/LoadingSpinner";

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
            // this.setState({userData: JSON.stringify(doc, null, '')});
            this.setState({userData: doc});
        })

    }

    generateUserTable() {
        if (!this.state.userData) return;

        let rows: any[] = []

        // Create array of arrays [key, value]
        for (const attr in this.state.userData)
            if (this.state.userData.hasOwnProperty(attr))
                rows.push([attr, this.state.userData[attr]])

        // Sort array alphabetically, then convert into grid rows.
        rows = rows.sort(((a, b) => a[0].localeCompare(b[0]))).map((row) => (
            <IonRow>
                <IonCol>{row[0]}:</IonCol>
                <IonCol><IonText>{row[1]}</IonText></IonCol>
            </IonRow>
        ));

        return <IonGrid>{rows}</IonGrid>;
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
                            <IonItem>User Saved Data:</IonItem>
                            {this.generateUserTable()}
                            <LoadingSpinner hidden={this.context?.uid}/>
                            <AccountLogoutButton/>
                        </IonCardContent>
                    </IonCard>
                </IonContent>
            </IonPage>
        );
    }
}

export default AccountInfoPerspective;

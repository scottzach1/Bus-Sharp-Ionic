import React, {Component} from "react";
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCheckbox,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import AuthenticationResponse, {signInWithCredentials} from "../../services/Firebase";
import AccountSignInWithGoogleButton from "../../components/account/AccountSignInWithGoogleButton";
import BackButton from "../../components/ui/BackButton";
import AccountEmailField from "../../components/account/AccountEmailField";
import AccountPasswordField from "../../components/account/AccountPasswordField";

interface Props {
}

interface State {
    email: string,
    password: string,
    error: string | null,
    rememberMe: boolean,
}

class AccountLoginPerspective extends Component<Props, State> {
    constructor(props: Readonly<Props>) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error: null,
            rememberMe: true,
        }
    }

    async signInUserAccountHandler() {
        this.setState({error: null});

        const resp: AuthenticationResponse = await signInWithCredentials(this.state.email, this.state.password);

        if (resp.success)
            this.setState({email: '', password: ''});
        else
            this.setState({error: resp.errorMessage});
    }

    render() {

        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <BackButton/>
                        <IonTitle>Account Login</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">Account Login</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonCard>
                        <IonCardContent>
                            <AccountEmailField
                                value={this.state.email}
                                handler={(email => this.setState({email: email}))}
                            />
                            <AccountPasswordField
                                value={this.state.password}
                                handler={(password) => this.setState({password: password})}
                            />
                            <IonItem>
                                <IonLabel>Remember me</IonLabel>
                                <IonCheckbox
                                    slot={"start"}
                                    checked={this.state.rememberMe}
                                    onIonChange={(e) => this.setState({rememberMe: e.detail.checked!})}
                                />
                            </IonItem>
                            <IonButton
                                expand={"block"}
                                type={"submit"}
                                onClick={() => this.signInUserAccountHandler()}
                            >
                                Login
                            </IonButton>
                            <IonItem>
                                <IonLabel>
                                    Don't have an account? <a href="/signup">Sign up here</a>.
                                </IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel>
                                    Otherwise, forgot your password? <a href="/reset">Reset it here</a>.
                                </IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel>
                                    Optionally, you can
                                </IonLabel>
                            </IonItem>
                            <AccountSignInWithGoogleButton/>
                        </IonCardContent>
                    </IonCard>
                    {this.state.error &&
                    <IonCard color={"danger"}>
                        <IonCardHeader>
                            {this.state.error}
                        </IonCardHeader>
                    </IonCard>}
                </IonContent>
            </IonPage>
        );
    }
}

export default AccountLoginPerspective;
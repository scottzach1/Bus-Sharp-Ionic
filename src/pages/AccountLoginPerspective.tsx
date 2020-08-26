import React, {Component} from "react";
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCheckbox,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {auth} from "../services/Firebase";
import SignInWithGoogleButton from "../components/account/SignInWithGoogleButton";

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

    signInWithEmailAndPasswordHandler = (email: string, password: string) => {
        auth.signInWithEmailAndPassword(email, password)
            .then(r => console.log(r))
            .catch(error => {
                this.setState({error: error.message});
                console.error("Error signing in with password and email", error);
            });
    };

    render() {

        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton/>
                        </IonButtons>
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
                            <IonItem>
                                <IonLabel>Email</IonLabel>
                                <IonInput
                                    inputmode={"email"}
                                    autocomplete={"email"}
                                    placeholder={"user@example.com"}
                                    value={this.state.email}
                                    onIonChange={(e) => this.setState({email: e.detail.value!})}
                                />
                            </IonItem>
                            <IonItem>
                                <IonLabel>Password</IonLabel>
                                <IonInput
                                    type={"password"}
                                    autocomplete={"current-password"}
                                    placeholder={"password"}
                                    value={this.state.password}
                                    onIonChange={(e) => this.setState({password: e.detail.value!})}
                                />
                            </IonItem>
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
                                onClick={() => this.signInWithEmailAndPasswordHandler(this.state.email, this.state.password)}
                            >
                                Login
                            </IonButton>
                            <IonItem>
                                <IonLabel>Don't have an account? <a href="/signup">Sign up here</a></IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel>
                                    Optionally, you can
                                </IonLabel>
                            </IonItem>
                            <SignInWithGoogleButton/>
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
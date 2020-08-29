import React, {Component} from "react";
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import AccountSignInWithGoogleButton from "./AccountSignInWithGoogleButton";
import AccountEmailField from "./AccountEmailField";
import AccountPasswordField from "./AccountPasswordField";
import AccountDisplayNameField from "./AccountDisplayNameField";
import AuthenticationResponse, {createUserWithCredentials} from "../../external/Firebase";
import BackButton from "../../shared/static/ui/BackButton";

interface Props {
}

interface State {
    email: string,
    password: string,
    passwordConfirmation: string,
    displayName: string,
    error: string | null,
}

class AccountSignupPerspective extends Component<Props, State> {
    constructor(props: Readonly<Props>) {
        super(props);

        this.state = {
            email: '',
            password: '',
            passwordConfirmation: '',
            displayName: '',
            error: null,
        }
    }

    async createUserAccountHandler() {
        this.setState({
            error: null,
        });

        const resp: AuthenticationResponse = await createUserWithCredentials(
            this.state.email,
            this.state.password,
            this.state.passwordConfirmation,
            this.state.displayName,
        );

        if (resp.success) {
            this.setState({
                email: '',
                password: '',
                passwordConfirmation: '',
                displayName: '',
            });
        } else {
            this.setState({
                error: resp.errorMessage,
            });
        }
    }

    render() {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <BackButton/>
                        <IonTitle>Account Signup</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">Account Signup</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonCard>
                        <IonCardContent>
                            <AccountDisplayNameField
                                value={this.state.displayName}
                                handler={(displayName) => this.setState({displayName: displayName})}
                            />
                            <AccountEmailField
                                value={this.state.email}
                                handler={(email => this.setState({email: email}))}
                            />
                            <AccountPasswordField
                                value={this.state.password}
                                handler={(password) => this.setState({password: password})}
                                new={true}
                            />
                            <AccountPasswordField
                                value={this.state.passwordConfirmation}
                                handler={(password) => this.setState({passwordConfirmation: password})}
                                new={true}
                                confirmation={true}
                            />
                            <IonButton
                                expand={"block"}
                                type={"submit"}
                                onClick={() => this.createUserAccountHandler()}
                            >
                                Signup
                            </IonButton>
                            <IonItem>
                                <IonLabel>Already have an account? <a href="/login">Login here</a></IonLabel>
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

export default AccountSignupPerspective;

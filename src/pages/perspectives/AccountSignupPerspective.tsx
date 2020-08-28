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
import {auth, generateUserDocument} from "../../services/Firebase";
import AccountSignInWithGoogleButton from "../../components/account/AccountSignInWithGoogleButton";
import {getSavedServices, getSavedStops} from "../../services/StorageManager";
import BackButton from "../../components/ui/BackButton";
import AccountEmailField from "../../components/account/AccountEmailField";
import AccountPasswordField from "../../components/account/AccountPasswordField";
import AccountDisplayNameField from "../../components/account/AccountDisplayNameField";

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

    createUserWithCredentials = async (email: string, password: string, passwordConfirmation: string) => {
        if (password !== passwordConfirmation) {
            this.setState({error: "Passwords don't match!"})
            return;
        }

        try {
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            const stopList = JSON.stringify(await getSavedStops());
            const serviceList = JSON.stringify(await getSavedServices());
            console.log('additional', stopList, serviceList)
            await generateUserDocument(user, {
                displayName: this.state.displayName,
                savedStops: stopList,
                savedServices: serviceList,
            });
            this.setState({error: null});
        } catch (error) {
            this.setState({error: error.message});
            console.error('Error Signing up with email and password', error);
        }

        this.setState({
            email: "",
            password: "",
            passwordConfirmation: "",
            displayName: "",
        })
    };

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
                                onClick={() =>
                                    this.createUserWithCredentials(this.state.email, this.state.password, this.state.passwordConfirmation)}
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
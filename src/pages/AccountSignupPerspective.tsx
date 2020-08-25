import React, {Component} from "react";
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {auth, generateUserDocument} from "../services/Firebase";

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

    createUserWithEmailAndPasswordHandler = async (event: any, email: string, password: string, passwordConfirmation: string) => {
        event.preventDefault();

        if (password !== passwordConfirmation) {
            this.setState({error: "Passwords don't match!"})
            return;
        }

        this.setState({error: null});

        try {
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            await generateUserDocument(user, {displayName: this.state.displayName});
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
                        <IonButtons slot="start">
                            <IonBackButton/>
                        </IonButtons>
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
                            <IonItem>
                                <IonLabel>Display Name</IonLabel>
                                <IonInput
                                    inputmode={"text"}
                                    autocomplete={"name"}
                                    placeholder={"Bobby"}
                                    value={this.state.displayName}
                                    onIonChange={(e) => this.setState({displayName: e.detail.value!})}
                                />
                            </IonItem>
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
                                    autocomplete={"new-password"}
                                    placeholder={"new password"}
                                    value={this.state.password}
                                    onIonChange={(e) => this.setState({password: e.detail.value!})}
                                />
                            </IonItem>
                            <IonItem>
                                <IonLabel>Password</IonLabel>
                                <IonInput
                                    type={"password"}
                                    autocomplete={"new-password"}
                                    placeholder={"re-enter password"}
                                    value={this.state.passwordConfirmation}
                                    onIonChange={(e) => this.setState({passwordConfirmation: e.detail.value!})}
                                />
                            </IonItem>
                            <IonButton
                                expand={"block"}
                                type={"submit"}
                                onClick={(e) =>
                                    this.createUserWithEmailAndPasswordHandler(
                                        e, this.state.email, this.state.password, this.state.passwordConfirmation)}
                            >
                                Signup
                            </IonButton>
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
import React, {Component, createContext} from "react";
import {auth, generateUserDocument} from "../services/Firebase";
import firebase from "firebase";
import {syncSavedData} from "../services/StorageManager";

/**
 * NOTE: This file was heavily inspired from the following blog post (as well as official documentation):
 * - "https://blog.logrocket.com/user-authentication-firebase-react-apps/"
 * The code was listed under MIT, and has been heavily altered to meet this projects requirements.
 */

export const UserContext = createContext<firebase.User | null>(null);
export const UserContextConsumer = UserContext.Consumer;

class UserProvider extends Component {
    state = {
        user: null,
    };

    async componentDidMount() {
        auth.onAuthStateChanged(async (userAuth) => {
            generateUserDocument(userAuth)
                .then((user) => this.setState({user}))
                .then(() => syncSavedData(this.state.user!))
                .catch((e) => console.error('Failed to get user document', e))
        });
    };

    render() {
        return (
            <UserContext.Provider value={this.state.user}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

export default UserProvider;
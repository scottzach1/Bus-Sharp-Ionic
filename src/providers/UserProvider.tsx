import React, {Component, createContext} from "react";
import {auth, generateUserDocument} from "../services/Firebase";
import firebase from "firebase";

export const UserContext = createContext<firebase.User | null>(null);
export const UserContextConsumer = UserContext.Consumer;

class UserProvider extends Component {
    state = {
        user: null,
    };

    async componentDidMount() {
        auth.onAuthStateChanged(async (userAuth) => {
            generateUserDocument(userAuth)
                .then((user) => {
                    this.setState({user})
                    console.log('User change detected:', {user});
                })
                .catch((e) => console.error('failed to get user document', e))
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

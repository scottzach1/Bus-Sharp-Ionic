import React, {Component, createContext} from "react";
import {auth, generateUserDocument} from "../services/Firebase";
import firebase from "firebase";

export const UserContext = createContext<firebase.User | null>(null);
export const UserContextConsumer = UserContext.Consumer;

class UserProvider extends Component {
    state = {
        user: null
    };

    async componentDidMount() {
        auth.onAuthStateChanged(async userAuth => {
            try {
                console.log('userAuth:', userAuth)
                const user = await generateUserDocument(userAuth);
                this.setState({user});
                console.log('User signed in!', {user});
            } catch (error) {console.error('failed to get user document', error)}
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

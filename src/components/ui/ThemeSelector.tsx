import React, {Component} from "react";
import {Plugins} from "@capacitor/core";
import {IonLabel, IonSegment, IonSegmentButton} from "@ionic/react";

const {Storage} = Plugins;

interface Props {
}

interface State {
    userTheme: string
}

class ThemeSelector extends Component<Props, State> {
    constructor(props: Readonly<Props>) {
        super(props);

        this.state = {
            userTheme: "auto"
        }
    }

    componentDidMount() {
        Storage.get({key: "theme"}).then(res => {
            if (res.value) this.setState({userTheme: res.value});
        })
    }

    async changeTheme(newTheme: string | undefined) {
        if (!newTheme) return;
        Storage.set({key: "theme", value: newTheme}).then(() =>
            this.setState({userTheme: newTheme})
        )
    }

    render() {
        return (
            <IonSegment onIonChange={(e) => {this.changeTheme(e.detail.value).then()}} value={this.state.userTheme}>
                <IonSegmentButton value="auto">
                    <IonLabel>auto</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="dark">
                    <IonLabel>dark</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="light">
                    <IonLabel>light</IonLabel>
                </IonSegmentButton>
            </IonSegment>
        )
    }
}

export default ThemeSelector;
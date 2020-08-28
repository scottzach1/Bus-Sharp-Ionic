import React, {Component} from "react";
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import BackButton from "../../components/ui/BackButton";
import TwitterFeed from "../../components/twitter/TwitterFeed";

interface Props {
}

interface State {
}

class TwitterFeedPerspective extends Component<Props, State> {
    render() {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <BackButton/>
                        <IonTitle>Twitter Feed</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent scrollX={false} scrollY={false}>
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">Twitter Feed</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                </IonContent>
                <TwitterFeed/>
            </IonPage>
        );
    }
}

export default TwitterFeedPerspective;
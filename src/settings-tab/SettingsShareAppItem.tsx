import React, {Component} from "react";
import {IonIcon, IonItem, IonLabel, IonToast} from "@ionic/react";
import {shareSharp, shareSocialSharp} from "ionicons/icons";
import {Plugins} from "@capacitor/core";

const {Share} = Plugins;

interface Props {
}

interface State {
    showToast: boolean,
}

class SettingsShareAppItem extends Component<Props, State> {
    constructor(props: Readonly<Props>) {
        super(props);

        this.state = {
            showToast: false,
        }
    }

    render() {
        return (
            <div>
                <IonItem
                    onClick={() =>
                        Share.share({
                            title: 'Bus Sharp',
                            text: 'The new way to track your public transport in Wellington, NZ.',
                            url: 'https://welly.live',
                            dialogTitle: 'Share with your buddies'
                        }).catch(() =>
                            // Failed to open share API, resort to clipboard share.
                            navigator.clipboard.writeText('https://welly.live')
                                .then(() => this.setState({showToast: true}))
                                .catch((e) => console.error(e))
                        )
                    }>
                    <IonIcon icon={shareSocialSharp}/>
                    <span>&nbsp;&nbsp;</span>
                    <IonLabel>Share</IonLabel>
                    <IonIcon icon={shareSharp}/>
                </IonItem>
                <IonToast
                    isOpen={this.state.showToast}
                    onDidDismiss={() => this.setState({showToast: false})}
                    message={"Copied to clipboard!"}
                    duration={1200}
                />
            </div>
        )
    }
}

export default SettingsShareAppItem;
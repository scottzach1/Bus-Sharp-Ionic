import React, {Component} from "react";
import {
    IonAlert,
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonPage,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonToast,
    IonToolbar
} from "@ionic/react";
import {Plugins} from '@capacitor/core';
import {
    codeSlashSharp,
    colorPaletteSharp,
    helpCircleSharp,
    logoGitlab,
    mailSharp,
    shareSharp,
    shareSocialSharp,
    trashBinSharp
} from "ionicons/icons";

const {Storage, Share} = Plugins;

interface Props {
}

interface State {
    selectedTheme: string | null,
    showClearAlert: boolean,
    showClearedToastSuccess: boolean,
    showClearedToastFailure: boolean,
    showShareClipboardToast: boolean,
}

class SettingsTab extends Component<Props, State> {

    constructor(props: Readonly<Props>) {
        super(props);

        this.state = {
            selectedTheme: null,
            showClearAlert: false,
            showClearedToastSuccess: false,
            showClearedToastFailure: false,
            showShareClipboardToast: false,
        }
    }

    componentDidMount() {
        Storage.get({key: 'theme'}).then(res => {
            if (res.value) this.setState({selectedTheme: res.value});
        });
    }

    selectTheme(newTheme: string) {
        Storage.set({key: 'theme', value: newTheme}).catch((e) => console.error(e));
        this.setState({selectedTheme: newTheme});
    }

    clearStorage() {
        Storage.clear()
            .then(() => this.setState({showClearedToastSuccess: true}))
            .catch(() => this.setState({showClearedToastFailure: true}));
    }

    // doShare() {
    //
    // }

    render() {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton/>
                        </IonButtons>
                        <IonTitle>Settings</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">Settings</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    {/* CLEAR STORAGE */}
                    <IonItem
                        onClick={() => this.setState({showClearAlert: true})}
                    >
                        <IonIcon icon={trashBinSharp}/>
                        <span>&nbsp;&nbsp;</span>
                        <IonLabel>Clear Storage</IonLabel>
                        <IonButton expand="block"><IonLabel>Clear</IonLabel></IonButton>
                    </IonItem>
                    <IonAlert
                        isOpen={this.state.showClearAlert}
                        onDidDismiss={() => this.setState({showClearAlert: false})}
                        cssClass='my-custom-class'
                        header={'Clear Storage'}
                        subHeader={'Are you sure?'}
                        message={'This will loose all user saved preferences such as saved stops, services and selected theme.'}
                        buttons={[{text: 'Cancel', role: 'cancel'}, {
                            text: 'Clear',
                            handler: () => this.clearStorage()
                        }]}
                    />
                    <IonToast
                        isOpen={this.state.showClearedToastSuccess}
                        onDidDismiss={() => this.setState({showClearedToastSuccess: false})}
                        message={"Success"}
                        duration={1200}
                    />
                    <IonToast
                        isOpen={this.state.showClearedToastFailure}
                        onDidDismiss={() => this.setState({showClearedToastFailure: false})}
                        color={"danger"}
                        message={"Failure"}
                        duration={1200}
                    />
                    {/* THEME SELECTION */}
                    <IonItem>
                        <IonIcon icon={colorPaletteSharp}/>
                        <span>&nbsp;&nbsp;</span>
                        <IonLabel>Theme Selector</IonLabel>
                        <IonSelect value={this.state.selectedTheme}
                                   onIonChange={(e) => this.selectTheme(e.detail.value)}>
                            <IonSelectOption value={"auto"}>Auto</IonSelectOption>
                            <IonSelectOption value={"dark"}>Dark</IonSelectOption>
                            <IonSelectOption value={"light"}>Light</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                    {/* SOURCE CODE */}
                    <IonItem href={"https://gitlab.ecs.vuw.ac.nz/late-for-the-bus/bus-sharp"}>
                        <IonIcon icon={logoGitlab}/>
                        <span>&nbsp;&nbsp;</span>
                        <IonLabel>View Source Code</IonLabel>
                        <IonIcon icon={codeSlashSharp}/>
                    </IonItem>
                    {/* SHARE APP */}
                    <IonItem onClick={() =>
                        Share.share({
                            title: 'Bus Sharp',
                            text: 'The new way to track your public transport in Wellington, NZ.',
                            url: 'https://welly.live',
                            dialogTitle: 'Share with your buddies'
                        }).catch(() =>
                            // Failed to open share API, resort to clipboard share.
                            navigator.clipboard.writeText('https://welly.live')
                                .then(() => this.setState({showShareClipboardToast: true}))
                                .catch((e) => console.error(e))
                        )
                    }>
                        <IonIcon icon={shareSocialSharp}/>
                        <span>&nbsp;&nbsp;</span>
                        <IonLabel>Share</IonLabel>
                        <IonIcon icon={shareSharp}/>
                    </IonItem>
                    <IonToast
                        isOpen={this.state.showShareClipboardToast}
                        onDidDismiss={() => this.setState({showShareClipboardToast: false})}
                        message={"Copied to clipboard!"}
                        duration={1200}
                    />
                    {/* FEEDBACK */}
                    <IonItem href={"mailto:feedback@welly.live"}>
                        <IonIcon icon={helpCircleSharp}/>
                        <span>&nbsp;&nbsp;</span>
                        <IonLabel>Help and Feedback</IonLabel>
                        <IonIcon icon={mailSharp}/>
                    </IonItem>
                </IonContent>
            </IonPage>
        );
    }
}

export default SettingsTab;
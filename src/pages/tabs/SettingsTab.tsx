import React, {Component} from "react";
import {IonBackButton, IonButtons, IonCard, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import SettingsFeedbackItem from "../../components/settings/SettingsFeedbackItem";
import SettingsShareAppItem from "../../components/settings/SettingsShareAppItem";
import SettingsClearStorageItem from "../../components/settings/SettingsClearStorageItem";
import SettingsThemeSelector from "../../components/settings/SettingsThemeSelector";
import SettingsSourceCodeItem from "../../components/settings/SettingsSourceCodeItem";
import SettingsAccountItem from "../../components/settings/SettingsAccountItem";
import SettingsTwitterFeedContainer from "../../components/settings/SettingsTwitterFeedContainer";

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
                    <IonCard>
                        <SettingsClearStorageItem/>
                        <SettingsThemeSelector/>
                        <SettingsSourceCodeItem/>
                        <SettingsTwitterFeedContainer/>
                        <SettingsShareAppItem/>
                        <SettingsFeedbackItem/>
                        <SettingsAccountItem/>
                    </IonCard>
                </IonContent>
            </IonPage>
        );
    }
}

export default SettingsTab;
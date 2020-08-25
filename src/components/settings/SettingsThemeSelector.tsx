import React, {Component} from "react";
import {IonIcon, IonItem, IonLabel, IonSelect, IonSelectOption} from "@ionic/react";
import {colorPaletteSharp} from "ionicons/icons";
import {Plugins} from "@capacitor/core";

const {Storage} = Plugins;

interface Props {
}

interface State {
    selectedTheme: string | undefined,
}

class SettingsThemeSelector extends Component<Props, State> {

    constructor(props: any) {
        super(props);

        this.state = {
            selectedTheme: undefined,
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

    render() {
        return (
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
        );
    }
}

export default SettingsThemeSelector;
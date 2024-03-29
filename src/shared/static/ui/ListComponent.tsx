import React, {Component} from 'react';
import {IonBadge, IonIcon, IonItem, IonLabel} from "@ionic/react";
import {getSavedServices, getSavedStops, toggleSavedService, toggleSavedStop} from "../../../external/StorageManager";
import {starOutline, starSharp} from "ionicons/icons";
import {UserContext} from "../../../providers/UserProvider";

interface State {
    saved: boolean,
}

interface Props {
    isStop: boolean,
    code: string,
    title: string,
    remaining?: string,
    isLive?: boolean,
}

class ListComponent extends Component<Props, State> {
    static contextType = UserContext;

    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            saved: false
        }
    }

    async componentDidMount() {
        this.setState({
            saved: await this.checkSaved()
        });
    }

    async checkSaved() {
        return ((this.props.isStop) ? getSavedStops() : getSavedServices())
            .then((saved) => saved.includes(this.props.code));
    }

    async toggleSaved() {
        this.setState({
            saved: await ((this.props.isStop) ?
                toggleSavedStop(this.props.code, this.context) : toggleSavedService(this.props.code, this.context))
        })
    }

    getHref() {
        return ((this.props.isStop) ? '/stop/' : '/service/') + this.props.code
    }

    handleClick(e: any) {
        if (e.target.id === "star") {
            this.toggleSaved().catch((e) => console.error('Failed to toggle saved', e));
            if (window.location.pathname !== "/search")
                window.location.reload();
        } else
            window.location.href = this.getHref();
    }

    render() {
        let spaces: any[] = [];

        for (let i = this.props.code.length; i < 5; ++i) {
            // Insert 2 spaces, such that all names are aligned horizontally.
            spaces.push(<span>&nbsp;&nbsp;</span>)
        }

        return (
            <IonItem onClick={(e) => this.handleClick(e)} key={this.props.code + '- list component'}>
                <IonBadge slot={"start"} color={this.props.isStop ? "primary" : "warning"}>
                    {this.props.code}
                </IonBadge>
                {spaces}
                <IonLabel className={"list-component-label"}>
                    {this.props.title}
                    {this.props.remaining ? <p>{this.props.remaining}</p> : null}
                </IonLabel>
                {!this.props.isLive ? null :
                    <IonBadge slot={"end"} color={"success"}>
                        live
                    </IonBadge>
                }
                <IonIcon
                    id={"star"}
                    icon={(this.state.saved) ? starSharp : starOutline}
                    slot={"end"}
                />
            </IonItem>
        );
    }
}

export default ListComponent

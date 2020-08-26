import React, {Component} from 'react';
import {IonBadge, IonItem, IonLabel} from "@ionic/react";

interface State {
}

interface Props {
    isStop: boolean,
    code: string,
    title: string,
    remaining?: string,
    isLive?: boolean,
}

class ListComponent extends Component<Props, State> {
    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {}
    }

    render() {
        let href: string = ((this.props.isStop) ? '/stop/' : '/service/') + this.props.code;
        let spaces: any[] = [];

        for (let i = this.props.code.length; i !== 5; ++i) {
            // Insert 2 spaces, such that all names are aligned horizontally.
            spaces.push(<span>&nbsp;&nbsp;</span>)
        }

        return (
            <IonItem href={href} key={this.props.code + '- list component'}>
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
            </IonItem>
        )
    }
}

export default ListComponent
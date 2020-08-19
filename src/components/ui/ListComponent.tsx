import React, {Component} from 'react';
import {IonBadge, IonItem, IonLabel} from "@ionic/react";

interface State {
}

interface Props {
    isStop: boolean,
    code: string,
    title: string,
    key: string,
    remaining?: string,
    isLive?: boolean,
}

class ListComponent extends Component<Props, State> {
    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }


    render() {
        let href: string = ((this.props.isStop) ? '/stop/' : '/service/') + this.props.code;
        return (
            <IonItem href={href} key={this.props.code + ' - ' + this.props.title}>
                <IonBadge slot={"start"} color={this.props.isStop ? "primary" : "warning"}>
                    {this.props.code}
                </IonBadge>
                <IonLabel>
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
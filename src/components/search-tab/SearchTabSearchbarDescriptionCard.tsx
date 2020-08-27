import React, {FC} from "react";
import {IonCard, IonCardContent, IonCardHeader, IonCardTitle} from "@ionic/react";

const SearchTabSearchbarDescriptionCard: FC = () => {
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Searching:</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                Using the searchbar above, enter Stop numbers of Bus Route/Service
                numbers. <br/><br/>
                You will be presented with everything related to your search query (depending on
                the filters you have in place). <br/><br/>
                Clicking on one of the links presented to you will take you to a page with all the
                information you will need about the Stop or Route/Service.
            </IonCardContent>
        </IonCard>
    );
}

export default SearchTabSearchbarDescriptionCard;
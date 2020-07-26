import React, {FC, useState} from "react";
import {IonContent, IonLabel} from "@ionic/react";
import LoadingSpinner from "../ui/LoadingSpinner";
import {readString} from "react-papaparse";
import "./MetlinkDataFeed.css";


const MetlinkDataFeed: FC = () => {
    const [versionData, setVersionData] = useState<string>()
    const [currentFeedInfo, setCurrentFeedInfo] = useState<Array<any>>()
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [isTitleRow, setTitleRow] = useState<boolean>(true);


    const [colCount, setColCount] = useState<number>(0);
    const [rowCount, setRowCount] = useState<number>(0);
    const [newRow, setNewRow] = useState<boolean>(false);

    async function getVersionData() {
        if (isLoaded) return

        const url = 'https://api.transitfeeds.com/v1/getFeedVersions?key=16d2be4b-c141-4e14-a4bb-c40b8f7dcb7b&feed=metlink%2F22&page=1&limit=10&err=1&warn=1';
        const json = await (await fetch(url)).json();

        setVersionData(json.results.versions[0].id);

        const feedInfo: string = await fetch('data/feed_info.txt')
            .then(r => r.text());

        const parsedFeedInfo: Array<any> = readString(feedInfo).data;
        setCurrentFeedInfo(parsedFeedInfo);
        setIsLoaded(true);
    }

    getVersionData();

    return (
        <div>
            {(versionData && currentFeedInfo) &&
            <IonLabel id="data-text">
                Version Data: <br/>{versionData} <br/><br/>
                Current Feed: <br/> {currentFeedInfo}
            </IonLabel>}

            {(!versionData || !currentFeedInfo) && <LoadingSpinner/>}

        </div>
    )
}

export default MetlinkDataFeed
import React, {useEffect} from "react";
import {IonCard} from "@ionic/react";
import "./TwitterFeed.css"

const TwitterFeed = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "http://platform.twitter.com/widgets.js";
        document.getElementsByClassName("twitter-embed")[0].appendChild(script);
        // document.getElementsByClassName("twitter-embed")[0].setAttribute('display', 'none')
        // document.getElementsByClassName("twitter-embed")[0].setAttribute('display', 'block')
        // document.getElementsByClassName("twitter-embed")[0].setAttribute('overflow', 'auto')
        console.log(document.getElementsByClassName("twitter-embed")[0].attributes)
        document.getElementsByClassName("twitter-embed")[0].setAttribute('overflow', 'auto')

    }, []);

    const prefersDark: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;

    return (
        <IonCard className="twitter-embed">
            <a
                className="twitter-timeline"
                data-theme={(prefersDark) ? "dark" : "light"}
                // data-tweet-limit="5"
                // data-height="100"
                // data-width="100"
                data-chrome="noheader nofooter noborders transparent noscrollbar"
                href="https://twitter.com/metlinkwgtn"
            >
                Tweets by metlinkwgtn
            </a>
        </IonCard>
    );
};

export default TwitterFeed;
import React, {FC} from "react"
import {IonCard, IonCardContent, IonCardHeader} from "@ionic/react";
import "../ui/SubtitleCard.css"
import {map} from "ionicons/icons";

interface Props {
    title: string,
    contents: string[] | null
}

/**
 *
 * @param title: Large, Bold, Black lettering of the IonCard
 * @param contents: A String Array where the contents of the string array will be Smaller, Normal, Grey lettering.
 * All words containing a ':', like "Stops:" will be bold. All string values with "e.g." will be counted as a new line,
 * not a new paragraph.
 * An example input would look like:
 * ["The tabs underneath the search bar allow you to define what search results are represent to you.", "All: Using the 'All' tab will show all Stops and Bus Routes that contain the contents of your search."]
 * its output would look like:
 *
 * @constructor
 */
const SubtitleCard: FC<Props> = ({title, contents}) => {
    let paraIndex = 0;

    return (
        <IonCard>
            {(title && !contents) && (
                <IonCardHeader id={"sub-card-highlight"} key={"Title"}>
                    {title}
                </IonCardHeader>
            )}
            {(title && contents) && (
                <IonCardHeader id={"sub-card-non-highlight"} key={"Title-Content"}>
                    {title}
                </IonCardHeader>
            )}
            {contents && (
                <IonCardContent id={"sub-card-content"} key={"Content"}>
                    {
                        contents.map(content => {
                            let bolds = content.replace(":", ":\n").split("\n")
                            return (
                                <div id={"div: " + paraIndex}>
                                    {(!content.toLowerCase().includes("e.g.") && paraIndex != 0) && (<br/>)}
                                    {bolds.map(s => {
                                        paraIndex++;
                                        if (s.includes(":")) return (<br/> && <strong>{s}</strong>)
                                        else return s
                                    })}
                                </div>
                            )
                        })
                    }
                </IonCardContent>
            )}
        </IonCard>
    )
}


export default SubtitleCard
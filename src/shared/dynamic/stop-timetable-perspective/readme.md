# Stop Timetable Perspective

This directory consists of all of the different components and
perspectives contained within the Stop Timetable perspective. Each
subdirectory within this directory represent an entire perspective
(screen) that can only be reached via this perspective.

| Type        | Explanation                                                                                                                                                                                                                                                                                                                                                           |
|:------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Perspective | The `StopTimetablePerspective` is an Ion screen that shows all information about a provided service. The service is selected via a URL prop.                                                                                                                                                                                                                          |
| Info        | The `MetlinkStopInfo` is an Ion card that looks visually similar to the one present within the service perspective. This card contains useful quick information about a stop such as its name, code as well as its fare zone. This card also contains a button activated action sheet that contains a bunch of different actions such as share, save and view on map. |
| TimeTable   | The `MetlinkStopTimetable` is an IonCard that contains a timetable list of all of the upcoming departures for a given service.                                                                                                                                                                                                                                        |


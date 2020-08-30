# Service Perspective

This directory consists of all different components and files required
to display the service perspective. The service perspective renders a
polyline drawing the entire route on a Google map. The service
perspective also shows all stops on the route as map markers.

| Type        | Explanation                                                                                                                                                            |
|:------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Perspective | The `ServicePerspective` is an Ion screen that draw an entire route with markers on a map. This screen also has an info card that shows information about the service. |
| View        | The `MetlinkServiceView` is a `GoogleMapWidget` that shows an entire route on the map, along with all of its stop markers.                                             |
| Info        | THe `MetlinkServiceInfo` is an info card that looks visually similar to the one present within the stop perspective. This card contains useful quick information about a service such as its name and code. This card also contains a button activated action sheet that contains a bunch of different actions such as share and save. What is notably different about this info card is it has a fab button in the top right that toggles its visibility. Hiding this allows more of the map to be exposed on the screen. |

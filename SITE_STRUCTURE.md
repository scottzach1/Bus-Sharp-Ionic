# Site Structure
> A brief rundown of the different perspectives of the app.

## Site Mappings

| Visible | App     | Url                                     | Description                                                                |
|:--------|:--------|:----------------------------------------|:---------------------------------------------------------------------------|
| Y       | Search  | /search                                 | - Search for any service or stop by number.                                |
| Y       | Map     | /map                                    | - View all stops on the map (or services too maybe).                       |
| Y       | Saved   | /saved                                  | - Change user preferences (later down the track).                          |
| X       | Stop    | /stop/:stopCode (eg. /stop/7910)        | - Show all information for a given stop (upcoming departures, location).   |
| X       | Service | /service/:serviceCode (eg. /service/14) | - Show all information for a given service (hopefully even live location). |

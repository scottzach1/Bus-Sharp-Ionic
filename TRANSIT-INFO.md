# Main Links

- [GTFS Docs](https://developers.google.com/transit/gtfs/)
- [Metlink Transitfeed](http://transitfeeds.com/p/metlink/22)
- [Metlink Real time information](https://www.metlink.org.nz/getting-around/real-time-information/)
- [Metlink GTFS latest dump](https://www.metlink.org.nz/assets/Google_Transit/google-transit.zip)
- [Kiwicon Talk referencing Metlinks GTFS](https://www.youtube.com/watch?v=Ier5BF952Y8)

# Transit Feeds

- TransitFeed API Key: 16d2be4b-c141-4e14-a4bb-c40b8f7dcb7b
- [TransitFeed Swagger](https://openmobilitydata.org/api/swagger/#!/default/getLatestFeedVersion)
- [Google transitfeed Github](https://github.com/google/transitfeed)
  releases (Contains a couple tools to validate data).

## Example Queries

| Query                                                          | Example                                                                                                                                 |
|:---------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------|
| Get all available locations with corresponding feeds.          | https://api.transitfeeds.com/v1/getLocations?key=16d2be4b-c141-4e14-a4bb-c40b8f7dcb7b                                                   |
| Gets all available feeds for Wellington (area 29)              | https://api.transitfeeds.com/v1/getFeeds?key=16d2be4b-c141-4e14-a4bb-c40b8f7dcb7b&location=29&descendants=1&page=1&limit=10             |
| Get available versions for a given feed.                       | https://api.transitfeeds.com/v1/getFeedVersions?key=16d2be4b-c141-4e14-a4bb-c40b8f7dcb7b&feed=metlink%2F22&page=1&limit=10&err=1&warn=1 |
| Get the latest dataset (Same as download link on Metlink site. | https://api.transitfeeds.com/v1/getLatestFeedVersion?key=16d2be4b-c141-4e14-a4bb-c40b8f7dcb7b&feed=metlink%2F22                         |

## Parsing CSVs

- [Vanillaes/CSV](https://github.com/vanillaes/csv) - An elegant and
  vanilla CSV parsing library written from the developer of Jquery's CSV
  parser.

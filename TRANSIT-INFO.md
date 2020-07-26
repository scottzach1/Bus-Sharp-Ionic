# Metlink API and Data Handling

> A quick breakdown of links, queries and packages.

## Main Links

- [Metlink API maybe](https://github.com/reedwade/metlink-api-maybe).
- [GTFS Docs](https://developers.google.com/transit/gtfs/)
- [Metlink Transitfeed](http://transitfeeds.com/p/metlink/22)
- [Metlink Real time information](https://www.metlink.org.nz/getting-around/real-time-information/)
- [Metlink GTFS latest dump](https://www.metlink.org.nz/assets/Google_Transit/google-transit.zip)
- [Kiwicon Talk referencing Metlinks GTFS](https://www.youtube.com/watch?v=Ier5BF952Y8)

## Unofficial API Queries

| Query                                    | Example                                                      |
|:-----------------------------------------|:-------------------------------------------------------------|
| View all stops for a given service.      | `https://www.metlink.org.nz/api/v1/ServiceMap/14`            |
| View all departures for a given service. | `https://www.metlink.org.nz/api/v1/StopDepartures/7093`      |
| View service information.                | `https://www.metlink.org.nz/api/v1/Service/14`               |
| View stop information.                   | `https://www.metlink.org.nz/api/v1/StopSearch/7910`          |
| View locations of a given service?       | `https://www.metlink.org.nz/api/v1/ServiceLocation/14`       |
| Shows stops near a location.             | `https://www.metlink.org.nz/api/v1/StopNearby/-41.28/174.76` |

## Transit Feeds

- TransitFeed API Key: 16d2be4b-c141-4e14-a4bb-c40b8f7dcb7b
- [TransitFeed Swagger](https://openmobilitydata.org/api/swagger/#!/default/getLatestFeedVersion)
- [Google transitfeed Github](https://github.com/google/transitfeed)
  releases (Contains a couple tools to validate data).
- [Metlink Transit Feed](http://transitfeeds.com/p/metlink/22/latest) -
  View the latest Metlink GTFS data on Transitfeeds own website.

## Example Queries

| Query                                                          | Example                                                                                                                                 |
|:---------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------|
| Get all available locations with corresponding feeds.          | `https://api.transitfeeds.com/v1/getLocations?key=16d2be4b-c141-4e14-a4bb-c40b8f7dcb7b`                                                   |
| Gets all available feeds for Wellington (area 29)              | `https://api.transitfeeds.com/v1/getFeeds?key=16d2be4b-c141-4e14-a4bb-c40b8f7dcb7b&location=29&descendants=1&page=1&limit=10`             |
| Get available versions for a given feed.                       | `https://api.transitfeeds.com/v1/getFeedVersions?key=16d2be4b-c141-4e14-a4bb-c40b8f7dcb7b&feed=metlink%2F22&page=1&limit=10&err=1&warn=1` |
| Get the latest dataset (Same as download link on Metlink site. | `https://api.transitfeeds.com/v1/getLatestFeedVersion?key=16d2be4b-c141-4e14-a4bb-c40b8f7dcb7b&feed=metlink%2F22`                         |

## Parsing CSVs

- [Vanillaes/CSV](https://github.com/vanillaes/csv) - An elegant and
  vanilla CSV parsing library written from the developer of Jquery's CSV
  parser (Causes `object is not a function` error with Typescript). THIS
  IS NOT TYPESCRIPT friendly (I couldn't even get it to run in a
  separate JS file.
- [PapaParse](https://www.papaparse.com/) - An in-browser CSV parser.
  This option comes with a popular react package on npm and works
  brilliantly.

## Reading Files

- [fetch](https://www.npmjs.com/package/fetch) - A utility to obtain
  files from a given URL. This is being used to read files from the
  `public/` directory. Sadly this cannot be used for downloading the
  archive as it only loads into memory. I we don't want to have to
  consume the entire data dump into memory and I wouldn't know how to
  extract the archive in this state either. Could perhaps write a byte
  stream? But this sounds rather verbose and resource intensive.


## Downloading Archive

- [file-saver](https://www.npmjs.com/package/file-saver) - Likely the
  best bet to downloading client side. Sadly unlike the `wget` command,
  this has to download files via the browser via typical means. What
  this means however is Chromium opens a new tab and auto downloads to
  the `~/Downloads` (or equivilent) directory. Whereas brave gets stuck
  in a file save dialog loop. It does come with TypeScript definitions
  which is great
- [js-file-download](https://github.com/kennethjiang/js-file-download) -
  Another fairly popular extension for downloading files. This also
  comes with a `react` package variant (including in-build TypeScript
  definitions) however it forces a download prompt for both Chromium and
  Brave.

## Extracting Archive

- [react-native-zip-archive](https://github.com/mockingbot/react-native-zip-archive)
  \- This appears to work fine however at this stage I can't seem to
  silently download the archive in the background to the `public`
  directory to begin with. Likely making this packages functionality
  obsolete.

## Proxy URL

- When trying to pull data from the Metlink API in browser, I began
  encountering an error `No 'Access-Control-Allow-Origin' header is
  present on the requested resource`. To bypass this, on simple solution
  is to utilise a CORS proxy. To solve this we are using a great
  [StackOverflow response](https://stackoverflow.com/a/43881141).


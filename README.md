# Bus# (Bus-Sharp)

> A light weight utility app to manage public transport in the  
> Wellington region.


## About

Bus# is a light weight utility mobile application. The app allows users
to easily access public transportation information for the Wellington
region. The target audience will encompass anyone of any age that will
use Wellingtons public transportation system.


## Features

Key features of the Bus# application are listed below. Each feature also
lists why it is a feature in this app.

- **Save your favourite bus stops:** Saving your favourite bus stops
  allows users to quickly navigate to commonly used stops and veiw it's
  timetable. The idea is to remove navigation through the app (and
  larger load times) to find a particular stop.

- **Save your favourite bus services:** Saving your favourite bus
  services allows users to quickly navigate to commonly used bus
  services and view their routes. The idea is to remove navigation
  through the app (and larger load times) to see the route of a service.

- **View all upcoming services that will stop by a given bus stop:**
  Being able to view all upcoming services that will stop by a given
  stop will allow users to see the information displayed on electronic
  bus signs without having to go down to the street to view the sign.
  This allows users to see when the next viable bus will arrive.

- **View timetable for a given bus service:** Users who know what bus
  they are taking will also like to know where the bus is, and when it
  will be at a stop near them. This aids with users planning a trip, or
  who are waiting on a bus and would like to know where it is.

- **Integrate with Metlink API to get live updates:** Traffic is hard to
  predict. Although bus timetabling is often near enough to be accurate,
  unexpected traffic delays can mean that a bus is late for arrival or
  the trip can take longer. By informing the users of these delays,
  users can mitigate any issues that may arise with these delays.

- **Integrate with Google maps to support bus route mapping:** Google
  maps has a fast and effective API for mapping routes. Using this
  technology over other mapping APIs will allow the user the best
  experience.

- **Schedule a reminder to leave for a bus stop:** By schduling a
  reminder, users can set up a regular time table that will notify them
  when they are needing to leave such that they don't forget their bus.
  This feature is crucial for those with busy lives and schdules, as it
  removes another thing to remember.

- **Add bus stops and services from a map preview (Google maps):**
  Interactions with this application should come as second nature to
  it's users. Although a provided help menu will be available to users,
  this feature intends to make searching and saving bus routes and stops
  easier for the user.

- **Pivot seamlessly between a service and bus stop:** This feature aims
  at allowing a user to use Bus# effectively almost immediately.

## Integration

Bus# will integrate with several different services, combining them all
into one easy to use application.
[Ionic Famework](https://ionicframework.com/) will be use to create the
user interface.
[Metlink GTFS](https://www.metlink.org.nz/customer-services/general-transit-file-specification/) allows the
app to read scheduled information for services. As well as this the Metlink API allows for RTI (Real Time
Information).
[Google Maps API](https://docs.microsoft.com/en-us/xamarin/android/platform/maps-and-location/maps/maps-api)
will integrate the stops and services with an interactive map
[Google Transit APIs](https://developers.google.com/transit/gtfs/reference?hl=en)
can link the data from Metlink with Googles Map APIs. Recommended by
Metlink
[here](https://www.metlink.org.nz/customer-services/general-transit-file-specification/).

## Competition

Bus# won't be the first app on mobile to help users navigate public
transportation in Wellington. However, we see issues with the
applications that are currently available and aim to learn from these
implementations about how to make an effective public transportation
application. Listed below are the pros and cons we found with two of the
biggest competitors in this market space.

- Bus++: A lightweight app to manage bus stop times.
  - Pros
    - Lightweight
    - Quick to view stop information
    - Scheduling reminders is great.
  - Cons
    - Lacking useful information such as service timetable.
    - Lack of visual feedback (i.e Courtenay Place stop A vs B)


- Metlink: Official app for transit in Wellington
  - Pros
    - Lots of information.
    - Many features.
    - Live information.
  - Cons
    - Very large
    - Can't search for bus services.
    - Runs slow
    - Confusing
    - Uses a lot of data.
    - Can't schedule reminders.
    - Notifications are annoying.

## Time Breakdown

To develop Bus#, the following list identifies an estimation on the time
it will take for two developers to complete this implementation.

- Total estimate - 40 hours
- Getting comfortable - 8-10 each
- Understanding Metlink and google maps API - 8-10 each
- Minimum viable product - 8-10 each
- Pretty UI - 8-10 each

## Authors

The following team are the sole developers and designers of Bus#.

| [![Zac Scott](https://gitlab.ecs.vuw.ac.nz/uploads/-/system/user/avatar/1422/avatar.png)](https://gitlab.ecs.vuw.ac.nz/scottzach1) | [![Zac Scott](https://secure.gravatar.com/avatar/67a542faaf2a3767cb875db27f83c9d6?s=180&d=identicon)](https://gitlab.ecs.vuw.ac.nz/cookharr)
| --- | --- |
| [Zac Scott](https://gitlab.ecs.vuw.ac.nz/scottzach1) | [Harrison Cook](https://gitlab.ecs.vuw.ac.nz/cookharr) |
| 300447976 | 300402048 |
# Bus# (Bus-Sharp)
> A light-weight utility to track your public transport in Wellington

## Features

- Star your favourite bus stops.
- Star your favourite bus services.
- View all upcoming services that will stop by a given bus stop.
- View timetable for a given bus service.
- Integrate with Snapper API to get live updates.
- Integrate with Google maps to support add from Map.
- Schedule a reminder to leave for a bus stop.
- Add bus stops and services from a map preview (Google maps)
- Pivot seamlessly between a service and bus stop.

## Integration

- [Ionic Famework](https://ionicframework.com/): Mobile UI toolkit used to create the user interface.
- [Metlink API](https://github.com/reedwade/metlink-api-maybe): Utilise the Metlink API to read scheduled information as well as RTI (Real Time Updates).
- [Google Maps API](https://docs.microsoft.com/en-us/xamarin/android/platform/maps-and-location/maps/maps-api): Integrate the stops and services with an interactive map
- [Google Transit APIs](https://developers.google.com/transit/gtfs/reference?hl=en) - linking the data from Metlink with Googles Map APIs. Recommended by Metlink [here](https://www.metlink.org.nz/customer-services/general-transit-file-specification/).

## Competition

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
		- Runs slow
		- Confusing
		- Uses a lot of data.
		- Can't schedule reminders.
		- Notifications are annoying.

## Time Breakdown

- total estimate - 40 hours
- getting comfortable - 8-10 each
- understanding Metlink and google maps API - 8-10 each
- minimum viable product - 8-10 each
- pretty UI - 8-10 each

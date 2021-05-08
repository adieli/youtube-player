## Assumptions/ Scalability

* The current implementation is using websockets to receive and broadcast messages to all consumers.

In case we want to scale it, we can add Nginx and multiple server nodes that will handle the requests, it is still quite a simple app.
* Under the current implementation, we don't really save the data in a db, so this should have been added, if there was no time constraint for the task.
* Currently, there is no placeholder/ skeleton for the YouTube player itself if the app loads with an empty playlist, this also should be added.
* If I had more time, and the project was productionized, I'd add more logs, and store them so that they could be viewed in Kibana,
* The current implementation of the data passed and "stored" is not enough and should be extended to include ids and order, 

so that a user will be able to remove a certain video or reorder the playlist.
* Username and duration of each video are obviously missing, I just didn't have time to connect with the YouTube api.
* Another edge case which I didn't want to dive into, under the time constraint, is focus on the currently playing video.

The reason is that it's possible that the currently playing video was already removed from the playlist in the server, and I didn't want to display it in the UI and maintain two states.
* In a productionized project that requires more work and parsing of backend requests, I'd add that in a separate file in the api folder, but due to the insignificance in such a project, it was left in app.js
* The solution was tested in multiple tabs of the same browser (Chrome) and worked well in terms of auto-play, addition and removal of songs.



## Notes

* Unit tests - Current state of unit-tests is below minimum. 

I've tried to use three different frameworks for tests along with Jest, and unfortunately didn't reach a plausible result under the time constraints.
* Project structure - In my opinion, unit-tests should be in a tests folder and not in the same folder as the .js files they are testing.

I've tried to relocate them, but due to the fact I created the app using create-react-app, I've faced many problems with this relocation, and decided to keep them where they run, under the time limit.

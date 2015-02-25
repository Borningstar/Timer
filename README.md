This is a project whose primary purpose is learning:

 - NodeJS
 - Express
 - Socket.io
 - MongoDB
 - Mongoose

The user hits the stamp button on the page, which uses socket.io to emit to the server the time, client's approximate location, the server then saves this to a MongoDB DB and emits the saved stamp and emits the last 5 stamps to all clients. Upon receiving stamps the client redraws the table with the new stamps and pings the map with the latest stamp.

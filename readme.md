## A simple service for handling of devices in a radio system. 

# Getting started

Update the ./src/config.json file with your MongoDB credentials.
## Docker 

Create a docker image
```
docker build -t radiosystemapp .
```
Run the server from the docker image
```
docker run -d -p  3000:3000 radiosystemapp
```

## Docker for unit test
Create docker image for unit testing
```
docker build -t radiosystemtest -f Dockerfile.test .
```
Run the server from the docker image
```
docker run -d -p  3000:3000 radiosystemtest
```
Note: The test and the app can't be run at the same time. 

# MongoDB schema

A device profile is a record containing the following information (example):
```javascript
{
    id: 1,
    alias: "Radio1",
    allowed_locations: ["CPH-1", "CPH-2"],
    location: "CPH-1"
}
```

# Rest API

Implement a REST API that allows the following:

* Create new radio : `POST /radios/{id}`

Payload (JSON)
```javascript
{
    "alias": string,
    "allowed_locations": array<string>
}
```
`Returns 200 OK when id does not already exist`

`Returns 403 FORBIDDEN when id already exists`


* Set a location : `POST /radios/{id}/location`
Payload (JSON)
```javascript

{
    "location": string
}
```
Setting a location of a radio that is accepted if the location is on the radio’s list of allowed locations and rejected otherwise. If location change is rejected radio’s location remains the last accepted location

`Returns 200 OK for valid location`

`Returns 403 FORBIDDEN for invalid location`


* Retrieval of a radio’s location : `GET /radios/{id}/location`

Response
```javascript
{
    "location": string
}
```
`Returns 200 OK with location in JSON form following the schema`

`Returns 404 NOT FOUND if no location exists`

# Example use cases

- Create a radio profile with ID: 100, Alias: “Radio100”, Allowed Locations: [“CPH-1”, “CPH-2”]
POST /radios/100 
Payload: { "alias": "Radio100", "allowed_locations": ["CPH-1", "CPH-2"] }

- Create a radio profile with ID: 101, Alias: “Radio101”, Allowed Locations: [“CPH-1”, “CPH-2”, “CPH-3”]
POST /radios/101
Payload: { "alias": "Radio101", "allowed_locations": ["CPH-1", "CPH-2", “CPH-3”] }

- Set location of radio 100 to “CPH-1” 
POST /radios/100/location
Payload: { "location": "CPH-1" }
Return: 200 OK

- Set location of radio 101 to “CPH-3” (accepted)
POST /radios/101/location
Payload: { "location": "CPH-3" }
Return: 200 OK

- Set location of radio 100 to “CPH-3” (denied)
POST /radios/100/location
Payload: { "location": "CPH-3" }
Return: 403 FORBIDDEN

- Retrieve location of radio 101 (returns “CPH-3”)
GET /radios/101/location
Return: 200 OK { “location”: “CPH-3” }

- Retrieve location of radio 100 (returns “CPH-1”)
GET /radios/100/location
Return: 200 OK { “location”: “CPH-1” }

- Create a radio profile with ID: 102, Alias: “Radio102”, Allowed Locations: [“CPH-1”, “CPH-3”]
POST /radios/102 
Payload: { "alias": "Radio102", "allowed_locations": ["CPH-1", "CPH-3"] }

- Retrieve location of radio 102 (returns undefined/unknown)
GET /radios/102/location
Return: 404 NOT FOUND

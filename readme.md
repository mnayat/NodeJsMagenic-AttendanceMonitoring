# Attendance Monitoring

> Backend API for Attendance Monitoring
## Database 
> mongodb

## Npm use
> exceljs
> colors
> dateformat
> mongoosejs
> express
## Postman Collection
Postman collection
URL
https://documenter.getpostman.com/view/15008591/TzCQb6Rm
![image](https://user-images.githubusercontent.com/31006263/113554540-0f0a6900-962c-11eb-9ead-0a5a68238c3b.png)


or 
under attendance monitoring folder postman collection
Attendance-Final Project.postman_collection.json

## Install Dependencies

```
npm install
```

## Run App

```
# Run in dev mode
npm run dev

```
# Unable to do:
```
DELETE : Validating an  event with existing attendance have issue on length properties 
although attendance is present
```
# NOTES:

##For dates mongo db return the exact value in the db which have th local time zone from the server. 
to able querying the correct be parameter it should be the value inputted in posting or creating data 
example is in the ##event in -Search events by Event Name, DateTime Start, DateTime End




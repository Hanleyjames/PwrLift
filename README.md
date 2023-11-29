## PwrLift
PwrLift is a set of Azure Web Functions. We start with an HTTP Trigger called pwrlift. 
This endpoint accepts the following JSON in a post request:
```
[{
    "lift_name": "Deadlift",
    "weight": 1,
    "reps": 1,
    "sets": 1
},{
    "lift_name": "Squat",
    "weight": 1,
    "reps": 1,
    "sets": 1
},{
    "lift_name": "Bench Press",
    "weight": 1,
    "reps": 1,
    "sets": 1
}]
``` 
This does not have to be an array of objects, it can also be just an object.
After checking for Personal Records/PR's, the function combines the results and does both or one of the following 
A) Updates a 1RM table
B) Creates a new record for the lift in a separate table

After all objects are processed, the function sends a message to Azure Service Bus in a queue.
The second function is a Discord Service Bus Queue Trigger, that listens to a queue. When a message is sent to the queue,
the function sends a post request to a discord webhook that updates my friends on my progress and any new PR's achieved that day.

The only required ENV vars that need to be set are 
```
connectionString={ServiceBusConnectionString}
queueName={ServiceBusQueueName}
discordWebhookUrl={webhooks/digits}
```
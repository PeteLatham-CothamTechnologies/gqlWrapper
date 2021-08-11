# gqlWrapper

This code executes specific Intelestal queries and unpacks the data into a 'traditional' JSON structure. Please note that response doesn't go back to the caller properly (some async problems in there somewhere but it was done quickly) so refer to what logged in the terminal window where it's being executed.

The code is based on ExpressJS to provide simple routing of a REST-like API.

### To install
1. Clone this respository
2. Install required Node modules with `npm install` or `yarn add`
3. Start the listener with `node server.js`

### To run
1. You will have needed to execute a login separately to get an access token and replace the placeholder text below
2. You can execute a query with the cURL code below, which should be relatively easy to pick apart to convert to Postman or similar;
```cURL
curl --location --request GET 'http://localhost:4001/entities' \
--header 'Application: z4yJrb2OWdWLDX7' \
--header 'Authorization: Bearer <placeholder_your_token_here>' \
--header 'Content-Type: application/json' \
--data-raw '{
  "entities": [ 
    "Programme",
    "Task"
  ]
}'
```
3. Amend for the entities you wish to query. The code simply loops through the list as it goes.

At the time or writing the above returns the structure below;
```JSON
{
  "Programme": {
    "id": "7415",
    "count": 1,
    "data": [
      {
        "Planned start date": "2021-07-01T00:00:00+00:00",
        "Planned end date": "2021-07-31T00:00:00+00:00",
        "Actual start date": null,
        "Actual end date": null,
        "Project": "2528606",
        "Programme owner": "2528607",
        "SCO ID": "1234",
        "Programme name": "Programme 1",
        "Approval chain for programme": null
      }
    ]
  },
  "Task": {
    "id": "7416",
    "count": 2,
    "data": [
      {
        "Comments": "Build a new tramline",
        "Task name": "Build a new tramline",
        "Status": "[\"In progress\"]",
        "Assignee": "2528610",
        "Project": "2528606",
        "Created by": null,
        "Programme": "2528608",
        "Assignee 2": null
      },
      {
        "Comments": "Build more trampolines",
        "Task name": "Need more bounce",
        "Status": "[\"In progress\"]",
        "Assignee": "2528610",
        "Project": "2528606",
        "Created by": null,
        "Programme": "2528608",
        "Assignee 2": null
      }
    ]
  }
}
```

Nested entities are not currently inflated, so some level of recursion would probably be needed, presumably by picking up attributes with a type of `FOREIGN_KEY` and processing them similarly.

### Originally proposed structure
This code simply traverses the structure of any entity provided and so doesn't quite meet the requirements defined by the originally-proposed Swagger which returns a structure similar to the below (included for reference)
```
{
    data =     (
                {
            projects =             (
                                {
                    areas =                     (
                                                {
                            areaAttribute1 = "New Building";
                            areaAttribute2 = "Ground Floor";
                        }
                    );
                    projectName = "Rewire Ground Floor";
                    projectPeople =                     (
                                                {
                            firstName = Michael;
                            jobTitle = "Principal Electrician";
                            lastName = Smith;
                            thumbnailImage = "https://randomuser.me/api/portraits/men/11.jpg";
                        },
                                                {
                            firstName = Katie;
                            jobTitle = "Site Manager";
                            lastName = Mulholland;
                            thumbnailImage = "https://randomuser.me/api/portraits/women/85.jpg";
                        },
                                                {
                            firstName = Sarah;
                            jobTitle = Facilities;
                            lastName = Evans;
                            thumbnailImage = "https://randomuser.me/api/portraits/women/71.jpg";
                        },
                                                {
                            firstName = Kevin;
                            jobTitle = "Transport Manager";
                            lastName = Lee;
                            thumbnailImage = "https://randomuser.me/api/portraits/men/14.jpg";
                        }
                    );
                    tasks =                     (
                                                {
                            issues =                             (
                                                                {
                                    date = "2021-07-02T09:00:00.000+0000";
                                    endTime = "2021-07-02T010:00:00";
                                    issueName = "Unexpected pipework uncovered";
                                    startTime = "2021-07-02T010:00:00";
                                    summary = "Pipework uncovered when basement wall removed; possible gas or water - to be checked";
                                },
                                                                {
                                    date = "2021-07-05T09:00:00.000+0000";
                                    endTime = "2021-07-05T015:00:00";
                                    issueName = "Incorrect cement type supplied";
                                    startTime = "2021-07-05T015:00:00";
                                    summary = "Multipurpose cement supplied, extra rapid fast set cement required";
                                }
                            );
                            name = "Capture socket locations";
                            plants =                             (
                                                                {
                                    deliveryCost = "\U00a330";
                                    description = "Scaffold Tower (1.89m Length)";
                                    endTime = "2021-06-01T12:00:00.000+0000";
                                    equipmentUsed = "Scaffold Tower";
                                    hiredFrom = "Brandon Hire Station";
                                    hourlyCost = "n/a";
                                    internalOrExternal = External;
                                    pickupCost = "\U00a330";
                                    plantID = "plantId-44356";
                                    startTime = "2021-06-01T010:00:00";
                                    weeklyCost = "\U00a314.85";
                                },
                                                                {
                                    deliveryCost = "\U00a350";
                                    description = "Mini-Digger";
                                    endTime = "2021-06-01T13:00:00.000+0000";
                                    equipmentUsed = "Mini-Digger";
                                    hiredFrom = "Brandon Hire Station";
                                    hourlyCost = "n/a";
                                    internalOrExternal = External;
                                    pickupCost = "\U00a350";
                                    plantID = "plantId-43227";
                                    startTime = "2021-06-01T011:00:00";
                                    weeklyCost = "\U00a3242.72";
                                },
                                                                {
                                    deliveryCost = "\U00a320";
                                    description = "Cable Detector";
                                    endTime = "2021-06-03T16:00:00.000+0000";
                                    equipmentUsed = "Cable Detector";
                                    hiredFrom = "HSS Hire";
                                    hourlyCost = "n/a";
                                    internalOrExternal = External;
                                    pickupCost = "\U00a320";
                                    plantID = "plantId-34425";
                                    startTime = "2021-06-03T010:00:00";
                                    weeklyCost = "\U00a378.16";
                                }
                            );
                            programme = Wiring;
                            progress =                             (
                                                                {
                                    date = "2021-05-21T09:00:00.000+0000";
                                    description = "Entrance sockets captured";
                                    endTime = "2021-05-21T11:30:00.000+0000";
                                    startTime = "2021-05-21T010:00:00";
                                    totalQuantity = 6;
                                    unit = sockets;
                                },
                                                                {
                                    date = "2021-05-24T09:00:00.000+0000";
                                    description = "Zone A sockets captured";
                                    endTime = "2021-05-24T15:30:00.000+0000";
                                    startTime = "2021-05-24T013:00:00";
                                    totalQuantity = 14;
                                    unit = sockets;
                                },
                                                                {
                                    date = "2021-05-25T09:00:00.000+0000";
                                    description = "Utility Area sockets captured";
                                    endTime = "2021-05-25T11:00:00.000+0000";
                                    startTime = "2021-05-25T010:00:00";
                                    totalQuantity = 8;
                                    unit = sockets;
                                },
                                                                {
                                    date = "2021-06-01T09:00:00.000+0000";
                                    description = "Zone B sockets captured";
                                    endTime = "2021-06-01T11:00:00.000+0000";
                                    startTime = "2021-06-01T010:00:00";
                                    totalQuantity = 8;
                                    unit = sockets;
                                },
                                                                {
                                    date = "2021-06-01T09:00:00.000+0000";
                                    description = "5th Task - C sockets captured";
                                    endTime = "2021-06-01T11:00:00.000+0000";
                                    startTime = "2021-06-01T010:00:00";
                                    totalQuantity = 8;
                                    unit = sockets;
                                }
                            );
                            taskID = "task 1122";
                            taskPeople =                             (
                                                                {
                                    firstName = Cody;
                                    jobTitle = "Principal Electrician";
                                    lastName = Johnson;
                                    thumbnailImage = "https://randomuser.me/api/portraits/men/11.jpg";
                                },
                                                                {
                                    firstName = Armando;
                                    jobTitle = "Site Manager";
                                    lastName = Boyd;
                                    thumbnailImage = "https://randomuser.me/api/portraits/men/14.jpg";
                                },
                                                                {
                                    firstName = Marc;
                                    jobTitle = Facilities;
                                    lastName = Kennedy;
                                    thumbnailImage = "https://randomuser.me/api/portraits/men/72.jpg";
                                },
                                                                {
                                    firstName = Craig;
                                    jobTitle = Facilities;
                                    lastName = Matthews;
                                    thumbnailImage = "https://randomuser.me/api/portraits/men/33.jpg";
                                },
                                                                {
                                    firstName = Ron;
                                    jobTitle = Facilities;
                                    lastName = Dixon;
                                    thumbnailImage = "https://randomuser.me/api/portraits/men/54.jpg";
                                },
                                                                {
                                    firstName = Kyle;
                                    jobTitle = Facilities;
                                    lastName = May;
                                    thumbnailImage = "https://randomuser.me/api/portraits/men/34.jpg";
                                },
                                                                {
                                    firstName = Thomas;
                                    jobTitle = Facilities;
                                    lastName = "O'Brien";
                                    thumbnailImage = "https://randomuser.me/api/portraits/men/20.jpg";
                                },
                                                                {
                                    firstName = Ricky;
                                    jobTitle = Facilities;
                                    lastName = Rice;
                                    thumbnailImage = "https://randomuser.me/api/portraits/men/87.jpg";
                                },
                                                                {
                                    firstName = Kate;
                                    jobTitle = Facilities;
                                    lastName = Merton;
                                    thumbnailImage = "https://randomuser.me/api/portraits/women/22.jpg";
                                },
                                                                {
                                    firstName = Paula;
                                    jobTitle = Facilities;
                                    lastName = Holland;
                                    thumbnailImage = "https://randomuser.me/api/portraits/women/26.jpg";
                                }
                            );
                        },
                                                {
                            issues =                             (
                                                                {
                                    date = "2021-07-02T09:00:00.000+0000";
                                    endTime = "2021-07-02T008:00:00";
                                    issueName = "Electrician did not report to site";
                                    startTime = "2021-07-02T008:00:00";
                                    summary = "Electrician did not report to site as agreed this morning";
                                }
                            );
                            name = "Produce wiring plan";
                            plants =                             (
                                                                {
                                    deliveryCost = "\U00a330";
                                    description = "Stairway Access Tower";
                                    endTime = "2021-06-06T17:00:00.000+0000";
                                    equipmentUsed = "Stairway Access Tower";
                                    hiredFrom = "HSS Hire";
                                    hourlyCost = "n/a";
                                    internalOrExternal = External;
                                    pickupCost = "\U00a330";
                                    plantID = "plantId-31336";
                                    startTime = "2021-06-06T014:00:00";
                                    weeklyCost = "\U00a3107.00";
                                },
                                                                {
                                    deliveryCost = "\U00a320";
                                    description = "Cordless Hammer Drill";
                                    endTime = "2021-06-08T16:00:00.000+0000";
                                    equipmentUsed = "Cordless Hammer Drill";
                                    hiredFrom = "HSS Hire";
                                    hourlyCost = "n/a";
                                    internalOrExternal = External;
                                    pickupCost = "\U00a320";
                                    plantID = "plantId-23457";
                                    startTime = "2021-06-08T010:00:00";
                                    weeklyCost = "\U00a354.23";
                                }
                            );
                            progress =                             (
                                                                {
                                    date = "2021-06-01T09:00:00.000+0000";
                                    description = "Lobby wiring plan complete";
                                    endTime = "2021-06-01T11:30:00.000+0000";
                                    startTime = "2021-06-01T010:00:00";
                                    totalQuantity = 6;
                                    unit = sockets;
                                },
                                                                {
                                    date = "2021-06-02T09:00:00.000+0000";
                                    description = "Utility area wiring plan complete";
                                    endTime = "2021-05-24T15:30:00.000+0000";
                                    startTime = "2021-06-02T013:00:00";
                                    totalQuantity = 14;
                                    unit = sockets;
                                }
                            );
                            taskID = "task 1211";
                        },
                                                {
                            name = "Chase wiring channels";
                            taskID = "task 1214";
                        },
                                                {
                            name = "Run 3-core cable";
                            taskID = "task 1277";
                        }
                    );
                },
                                {
                    projectName = "Run Water to Utility Area";
                    tasks =                     (
                                                {
                            name = "Cut channel in floor";
                            taskID = "task 112x";
                        },
                                                {
                            name = "Tee off existing pipework";
                            taskID = "task 121x";
                        },
                                                {
                            name = "Lay water pipe";
                            taskID = "task 121x";
                        },
                                                {
                            name = "Present to utility area island";
                            taskID = "task 127x";
                        }
                    );
                }
            );
        }
    );
}
```

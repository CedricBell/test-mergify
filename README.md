# Mergic

## Description
This repository is for a technical I had to take for a position at Mergify. 
Subject is [here](https://mergify.notion.site/Mergic-d3c0fa29934d4bf2b7cf9beacf94115f).

## How to run 
The instructions to run the **frontend** and the **backend** are located in the README files under each directory.

## Improvements

### Backend
- Improve the architecture and put the logical side in a new service folder, separated from the controllers side (listing all the routes of the API) to achieve scalability.
- Catching and redirecting exceptions with a global handler.
- Improve the security of the application.

### Frontend
To improve the quality of the frontend application :
- Connect the actual value of user input of a github URL with the list of pull requests corresponding.
- Separate the service side which does the HTTP requests in a new folder and inject these services into the components.
- Write more tests to ensure that components are rendering as they should.
- Implement interceptors for the requests and catch/handle exceptions for every HTTP requests.
- split the stylesheet files.
- Most of all, improve the design. 

To improve the design, there are a lot of things that we could improve :
- Responsiveness of the elements, mobile version, etc...
- different colors for the different types of badges for the labels of pull requests.
- different icons for the each status possible for the pull requests.
- hiding/showing elements if there is nothing to show. 



### General Improvements
One really interesting thing to do to improve Mergic would be to test it out with actual pull requests from Github repositories or at least more sets of datas.

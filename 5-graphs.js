// you work for a professional social network. in this social network, a professional
// can follow other people to see their updates (think Twitter for professionals.)
// write a function that finds the job `title` that shows up most frequently given
// a set of degree of separation from you. count initial id's own job title in the total

/*
 * parameters:
 * myId                - number    - the id of the user who is the root node
 * getUser             - function - a function that returns a user's object given an ID
 * degreesOfSeparation - number   - how many degrees of separation away to look on the graph
 */
const findMostCommonTitle = (myId, getUser, degreesOfSeparation) => {
    let currentUser = getUser(myId);
    let connections = currentUser.connections;
    let jobFrequencies = {
        [currentUser.title]: 1
    };
    let visited = [myId];

    for (let i = 0; i < degreesOfSeparation; i++) {
        let nextConnections = [];

        connections.forEach(connId => {
            if (!visited.includes(connId)) {
                let currentConn = getUser(connId);
                if (currentConn.title in jobFrequencies) {
                    jobFrequencies[currentConn.title]++;
                } else {
                    jobFrequencies[currentConn.title] = 1;
                }
                nextConnections = nextConnections.concat(currentConn.connections);
            }
        });
        
        connections = nextConnections;
    };

    let mostFrequentJob = {
        title: "",
        count: 0
    };
    Object.entries(jobFrequencies).forEach(([key, value]) => {
        if (value > mostFrequentJob.count) {
            mostFrequentJob.title = key;
            mostFrequentJob.count = value;
        }
    });

    return mostFrequentJob.title;
}
  

//   [{"id":1,"name":"Leia Goede","company":"Bluejam","title":"Analog Circuit Design manager","connections":[536,320,29,697,333,28,686,968]},
// {"id":2,"name":"Ingelbert Pickston","company":"Layo","title":"Assistant Professor","connections":[616,126,583,483]},
// {"id":3,"name":"Elisha Janota","company":"Skyble","title":"Structural Engineer","connections":[596,843,864,861,876,833]},
// {"id":4,"name":"Gayler Sexten","company":"Tanoodle","title":"Quality Control Specialist","connections":[472,24]},
// {"id":5,"name":"Walther Bradly","company":"Viva","title":"GIS Technical Architect","connections":[603,249,177,891,898,158]},
// {"id":6,"name":"Rafe Luter","company":"Bluezoom","title":"Human Resources Assistant IV","connections":[979,923,324,367,969,376,684]},
// {"id":7,"name":"Therine Kleinstub","company":"Jabbercube","title":"Marketing Manager","connections":[634,489,473,854,147]}
  //   // unit tests
//   // do not modify the below code
//   describe('findMostCommonTitle', function() {
//     // the getUser function and data comes from this CodePen: https://codepen.io/btholt/pen/NXJGwa?editors=0010
//     // I recommend finishing these one at a time. if you put an x in front of the it so the function call is 
//     // xit it will not run
//     it('user 30 with 2 degrees of separation', () => {
//       expect(findMostCommonTitle(30, getUser, 2)).toBe("Librarian");
//     });
    
//     it('user 11 with 3 degrees of separation', () => {
//       expect(findMostCommonTitle(11, getUser, 3)).toBe("Graphic Designer");
//     });
    
//     it('user 307 with 4 degrees of separation', () => {
//       // if you're failing here with "Clinical Specialist, you're probably not filtering users who
//       // appear more than once in people's connections
//       expect(findMostCommonTitle(306, getUser, 4)).toBe("Environmental Tech");
//     });
//   });
  
//   // remove x from describe to run
//   xdescribe('extra credit', function() {
//     it('user 1 with 7 degrees of separation – this will traverse every user that\'s followed by someone else. five users are unfollowed', () => {
//       expect(findMostCommonTitle(1, getUser, 7)).toBe("Geological Engineer");
//     });
//   })
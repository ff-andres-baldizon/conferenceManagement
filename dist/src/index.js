"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const fs = require("fs");
const proccessInput = (input) => {
    const proposals = input.split(/\r?\n/);
    const proposalsList = proposals.map((proposal) => {
        if (proposal.includes('lightning')) {
            return {
                'name': proposal,
                'time': 5
            };
        }
        else {
            const position = proposal.indexOf("min ");
            const time = proposal.substring(position - 2, position);
            return {
                'name': proposal,
                'time': Number(time)
            };
        }
    });
    return proposalsList;
};
function generatePermutations(inputArray) {
    if (inputArray.length === 0) {
        // If the array is empty, return an array with an empty array
        return [[]];
    }
    const result = [];
    for (let i = 0; i < inputArray.length; i++) {
        // Remove the current element from the array
        const rest = [...inputArray.slice(0, i), ...inputArray.slice(i + 1)];
        // Recursively generate permutations for the remaining elements
        const permutationsOfRest = generatePermutations(rest);
        // Add the current element to each permutation of the remaining elements
        for (const permutation of permutationsOfRest) {
            result.push([inputArray[i], ...permutation]);
        }
    }
    return result;
}
const validateSchedule = (sessions) => {
    let validSchedule = true;
    sessions.forEach((session, idx) => {
        const timeSum = session.reduce((accumulator, object) => {
            return accumulator + object.time;
        }, 0);
        if (timeSum > (idx % 2 ? 240 : 180)) {
            validSchedule = false;
        }
    });
    return validSchedule;
};
const hasEnoughSpace = (session, idx, time) => {
    const timeSum = session.reduce((accumulator, object) => {
        return accumulator + object.time;
    }, 0);
    return ((timeSum + time) <= (idx % 2 ? 240 : 180));
};
const assignSessions = (proposalList, tracks) => {
    const sessions = Math.floor(proposalList.length / (tracks * 2));
    const sortedList = proposalList.sort((a, b) => {
        return b.time - a.time;
    });
    // split the list to permute a smaller part
    const mainList = sortedList.slice(0, 10);
    const pivots = sortedList.slice(10, sortedList.length);
    const permutationsList = generatePermutations(pivots);
    let validSchedule = [];
    permutationsList.forEach((proposedList) => {
        let testList = [...mainList, ...proposedList];
        const schedule = [];
        let bucketCount = 0;
        let cont = 0;
        for (cont = 0; cont < testList.length;) {
            if (schedule[bucketCount]) {
                if (hasEnoughSpace(schedule[bucketCount], bucketCount, testList[cont].time)) {
                    schedule[bucketCount].push(testList[cont]);
                    cont = cont + 1;
                }
                else if (!hasEnoughSpace(schedule[bucketCount], bucketCount, testList[cont].time) && bucketCount >= sessions) {
                    break;
                }
                else {
                    bucketCount = bucketCount + 1;
                }
            }
            else {
                schedule.push([testList[cont]]);
                cont = cont + 1;
            }
        }
        ;
        if (cont === testList.length && validateSchedule(schedule)) {
            validSchedule = schedule;
        }
    });
    return validSchedule;
};
const getFormatedTime = (time) => {
    let hour = time.getHours();
    let minutes = Number(time.getMinutes());
    let meridiem = hour >= 12 ? 'pm' : 'am';
    hour = hour % 12;
    hour = hour ? hour : 12;
    let newm = minutes < 10 ? '0' + minutes : minutes;
    let formatedTime = hour + ':' + newm + ' ' + meridiem;
    return formatedTime;
};
const formatOutput = (proposalList) => {
    let formatedOutput = '';
    let trackIndicator = 1;
    let timeIndicator = new Date("2024-01-01T09:00:00.00"); //the date doesn't matter, just setting the time 
    proposalList.forEach((track) => {
        formatedOutput = formatedOutput + `${(trackIndicator === 1 || trackIndicator === 3) ? `\nTrack\n` : ''} \n`;
        track.forEach((talk) => {
            formatedOutput = formatedOutput + `${getFormatedTime(timeIndicator)} ${talk.name} \n`;
            timeIndicator = new Date(timeIndicator.getTime() + talk.time * 60000);
        });
        timeIndicator = trackIndicator % 2 == 0 ? new Date("2024-01-01T09:00:00.00") : new Date("2024-01-01T13:00:00.00");
        formatedOutput = formatedOutput + `${trackIndicator % 2 == 0 ? '\n05:00PM Networking Event' : '\n12:00PM Lunch'} \n`;
        trackIndicator = trackIndicator + 1;
    });
    return formatedOutput;
};
const main = () => {
    const testInput = fs.readFileSync('./testInput.txt', 'utf-8');
    const proposals = proccessInput(testInput);
    const proposedSchedule = assignSessions(proposals, 2);
    const formatedOutput = formatOutput(proposedSchedule);
    return (formatedOutput);
};
exports.main = main;
console.log((0, exports.main)());
//# sourceMappingURL=index.js.map
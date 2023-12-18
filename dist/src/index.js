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
// TODO: refine session assigning
const assignSessions = (proposalList, tracks) => {
    const sessions = Math.floor(proposalList.length / (tracks * 2));
    const sortedList = proposalList.sort((a, b) => {
        return b.time - a.time;
    });
    const schedule = [];
    let iterator = 0;
    sortedList.forEach((item) => {
        if (schedule.length <= iterator) {
            schedule.push([item]);
        }
        else {
            schedule[iterator] = [...schedule[iterator], item];
        }
        iterator = (iterator < sessions - 1) ? iterator + 1 : 0;
    });
    return (schedule);
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
    let timeIndicator = new Date("2024-01-01T09:00:00.00");
    proposalList.forEach((track) => {
        formatedOutput = formatedOutput + `${(trackIndicator === 1 || trackIndicator === 3) ? `\nTrack\n` : ''} \n`;
        track.forEach((talk) => {
            //TODO define time format
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
import * as fs from 'fs';

interface IProposal {
  name: string;
  time: number;
}

const proccessInput = (input: string): IProposal[] => {
  const proposals = input.split(/\r?\n/);
  const proposalsList = proposals.map((proposal: string) => {
    if (proposal.includes('lightning')) {
      return {
        'name': proposal,//.replace("lightning", "").trim(), // no need to clean talk name
        'time': 5
      }
    } else {
      const position = proposal.indexOf("min ");
      const time = proposal.substring(position - 2, position);
      return {
        'name': proposal,//.replace(`${time}min`, "").trim(), // no need to clean talk name
        'time': Number(time)
      }
    }
  });

  return proposalsList;
};

// TODO: refine session assigning
const assignSessions = (proposalList: IProposal[], tracks: number) => {
  const sessions = Math.floor(proposalList.length / (tracks * 2));

  const sortedList = proposalList.sort((a, b) => {
    return b.time - a.time;
  });

  const schedule = [];
  let iterator = 0;
  sortedList.forEach((item: IProposal) => {
    if (schedule.length <= iterator) {
      schedule.push([item])
    } else {
      schedule[iterator] = [...schedule[iterator], item];
    }
    iterator = (iterator < sessions - 1) ? iterator + 1 : 0;
  });

  return (schedule);
};

const getFormatedTime=(time:Date)=>{
  let hour = time.getHours();
  let minutes = Number(time.getMinutes());
  let meridiem = hour >= 12 ? 'pm' : 'am';
  hour = hour % 12;
  hour = hour ? hour : 12;
  let newm = minutes < 10 ? '0'+minutes: minutes;
  let formatedTime= hour + ':' + newm + ' ' + meridiem;
  return formatedTime;
};

const formatOutput = (proposalList: IProposal[][]) => {
  let formatedOutput = '';
  let trackIndicator = 1;
  let timeIndicator = new Date("2024-01-01T09:00:00.00"); //the date doesn't matter, just setting the time 
  proposalList.forEach((track: IProposal[]) => {
    formatedOutput = formatedOutput + `${(trackIndicator===1||trackIndicator===3) ? `\nTrack\n` : ''} \n`

    track.forEach((talk) => {
      formatedOutput = formatedOutput + `${getFormatedTime(timeIndicator)} ${talk.name} \n`
      timeIndicator = new Date(timeIndicator.getTime() + talk.time*60000);
    })

    timeIndicator = trackIndicator % 2 == 0 ?new Date("2024-01-01T09:00:00.00"):new Date("2024-01-01T13:00:00.00");
    formatedOutput = formatedOutput + `${trackIndicator % 2 == 0 ? '\n05:00PM Networking Event' : '\n12:00PM Lunch'} \n`

    trackIndicator = trackIndicator + 1;
  });

  return formatedOutput;
};

export const main = () => {
  const testInput = fs.readFileSync('./testInput.txt', 'utf-8');
  const proposals = proccessInput(testInput);
  const proposedSchedule = assignSessions(proposals, 2);
  const formatedOutput = formatOutput(proposedSchedule);

  return (formatedOutput);
};

console.log(main());

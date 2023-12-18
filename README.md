# conferenceManagement
remote test

## Available Scripts

In the project directory, you can run:

### `npm run build`
### `npm start`

Runs the app and logs the output on the console.

# Intro

You can use any tools or resources you like. This includes any gems or stackoverflow, whatever helps you in your day to day you can use here.
You can use any language you prefer, but ruby, javascript or python would be easiest for us to review.
The deliveriable is a private git repository, which you can invite @abepetrillo to, and I can share with the team from there.
You have 2 hours to work on the challenge. You are welcome to exceed that time, but please create a commit at the 2 hour mark so we can see how you progressed.

# CONFERENCE TRACK MANAGEMENT

You are planning a conference and have received many proposals which have
passed the initial screen process but you're having trouble fitting them into
the time constraints of the day.
Let's write a program that reads a list of talks and organize them for us.

* The conference has multiple tracks each of which has a morning and afternoon session.  
* Each session contains multiple talks.  
* Morning sessions begin at 9am and must finish by 12 noon, for lunch.  
* Afternoon sessions begin at 1pm and must finish in time for the networking event.  
* The networking event can start no earlier than 4:00 and no later than 5:00.  
* All talk lengths are either in minutes (not hours) or lightning (5 minutes).  


## TEST INPUT
Writing Fast Tests Against Enterprise Rails 60min  
Overdoing it in Python 45min  
Lua for the Masses 30min  
Ruby Errors from Mismatched Gem Versions 45min  
Common Ruby Errors 45min  
Rails for Python Developers lightning  
Communicating Over Distance 60min  
Accounting-Driven Development 45min  
Woah 30min  
Sit Down and Write 30min  
Pair Programming vs Noise 45min  
Rails Magic 60min  
Ruby on Rails: Why We Should Move On 60min  
Clojure Ate Scala (on my project) 45min  
Programming in the Boondocks of Seattle 30min  
Ruby vs. Clojure for Back-End Development 30min  
Ruby on Rails Legacy App Maintenance 60min  
A World Without HackerNews 30min  
User Interface CSS in Rails Apps 30min  

## TEST OUTPUT
**Track 1:**  
09:00AM Writing Fast Tests Against Enterprise Rails 60min  
10:00AM Overdoing it in Python 45min  
10:45AM Lua for the Masses 30min  
11:15AM Ruby Errors from Mismatched Gem Versions 45min  

12:00PM Lunch  

01:00PM Ruby on Rails: Why We Should Move On 60min  
02:00PM Common Ruby Errors 45min  
02:45PM Pair Programming vs Noise 45min  
03:30PM Programming in the Boondocks of Seattle 30min  
04:00PM Ruby vs. Clojure for Back-End Development 30min  
04:30PM User Interface CSS in Rails Apps 30min  

05:00PM Networking Event  

**Track 2:**  
09:00AM Communicating Over Distance 60min  
10:00AM Rails Magic 60min  
11:00AM Woah 30min  
11:30AM Sit Down and Write 30min  

12:00PM Lunch  

01:00PM Accounting-Driven Development 45min  
01:45PM Clojure Ate Scala (on my project) 45min  
02:30PM A World Without HackerNews 30min  
03:00PM Ruby on Rails Legacy App Maintenance 60min  
04:00PM Rails for Python Developers lightning  

05:00PM Networking Event  
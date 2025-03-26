# Calendar_App_JS

Calendar App

Description:

A app that allow users to add, delete and save events to a calendar. 

Pseudo code 

function openModal() deals with logic when we click on a date, in which it enables us to see our event modal that have been set to 'display: 
none' on our css.  

function load() get the date that we are on and set the month we display to get the right padding days of the current month we are on. Also 
load() get the eventfor day if we have one and appends that daysquare to our calendar.

function saveEvent() push the value of in the input box to our localStorage with the value of the date as being clicked 
and the title being the value we inputted. The value is also ensured that it is stored as a valid 
json string with the use of JSON.stringify method within the function. 

function deleteEvent() filter our the events not clicked and push it back to localStorage in essence deleting the events that don't pass the test we then
ensure that we make the value into a json string with JSON.stringify.

function initButtons () determines what event will happen when we click on the next and back buttons on the top of our calender as well as
all our other buttons on the calendar. InitButtons () also stipulates what function should be executed upon each of the buttons whenever clicked. 


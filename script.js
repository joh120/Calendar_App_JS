let nav = 0; 
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar'); 
const newEventModal = document.getElementById('newEventModal'); 
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop'); 
const eventTitleInput = document.getElementById('eventTitleInput'); 
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function openModal(date)
{
  clicked = date 

  const eventForDay = events.find(e => e.date === clicked); 

  if (eventForDay) {
    document.getElementById('eventText').innerText = eventForDay.title;  
    deleteEventModal.style.display = 'block'; 
  } else {
    newEventModal.style.display = 'block'; 
  }

  backDrop.style.display = 'block'; 
}

/* 
End of our open modal function which 
deals with logic when we click on a date, in which it enables us to see our event modal that have been set to display 
none on our css  
*/

function load() {
  const dt = new Date(); 

  if (nav !== 0) { 
    dt.setDate(1); // sets the day of the month to the first day of the current month that we are on 
    dt.setMonth(new Date().getMonth() + nav);
    // we are calling set month to be the current month (get in as a index value)
    // then we gonna add nav to that 
  }
  const day = dt.getDate(); 
  const month = dt.getMonth(); 
  const year = dt.getFullYear(); 

  const firstDayOfMonth = new Date(year, month, 1);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
 

  const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long', 
    year: 'numeric', 
    month: 'numeric', 
    day: 'numeric', 
  });
  
  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

  document.getElementById('monthDisplay').innerText = 
    `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

  calendar.innerHTML = '';

  for(let i = 1; i <= paddingDays + daysInMonth ; i++){
    // *the index of the padding days * + *last day of the month*
    // The reason why we are doing padding + dayInMnoth is because we have to render empty days on the screen for the padding days 
  
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');
    const dayString = `${month + 1}/${i - paddingDays}/${year}`;

    if (i > paddingDays) {
      // if the current iteration we are on are greater than the amount of padding days 
      // We known we iterated more times than padding day thus we know we need to be rendering a daysquare rather than a padding day 
      // If its less than or equal to padding day then we know we should render a padding day rather than a daysquare

      daySquare.innerText = i - paddingDays;
     
      const eventForDay = events.find(e => e.date === dayString);
     
      if (i - paddingDays === day && nav === 0) {
        daySquare.id = 'currentDay';
        // gives the daysquare the styles associated to currentday id styling located within our css file
      }

      if (eventForDay) {
        const eventDiv = document.createElement('div'); // this creates a new div 
        eventDiv.classList.add('event'); // gives our new div the event styling located within our css file 
        eventDiv.innerText = eventForDay.title; // gives the title key within local storage and stores the value in our div that we want to see 
        // from our local storage being displayed within our daysquare
        daySquare.appendChild(eventDiv);
      }

      daySquare.addEventListener('click', () => openModal(dayString));
    } else {
      daySquare.classList.add('padding');
    }

    calendar.appendChild(daySquare);  

  }
} // End of load function 

/*
In our load function we  get the date that we are on and set the month we display
get the right padding days of the month we are on 
get the eventfor day if we have one 
append daysquare to our calender 
*/

function closeModal() {
  eventTitleInput.classList.remove('error');

  newEventModal.style.display = 'none'; 
  deleteEventModal.style.display = 'none';
  backDrop.style.display = 'none';
  eventTitleInput.value = '';
  clicked = null; 
 

  load();
}

function saveEvent() {
  if (eventTitleInput.value) {  
    eventTitleInput.classList.remove('error');
    // So if the title exists we want to remove error 
    // Otherwise if it doesnt we want to add the error class

    events.push({
      date: clicked,
      title: eventTitleInput.value,
    });

    localStorage.setItem('events', JSON.stringify(events)); 
    closeModal();
  } else {
    eventTitleInput.classList.add('error');
   
  }
}

/* 

End of saveEvent function 
Which we push the value of the input box to our localStorage with the value of the date as being clicked 
and the title being the value we inputted
We ensure that we make the value into a json string with JSON.stringify 

*/

function deleteEvent() {
  events = events.filter(e => e.date !== clicked); 
  localStorage.setItem('events', JSON.stringify(events));
 
  closeModal();
}

/* 

End of deleteEvent function 
Which we filter our the events not clicked and push it back to localStorage
in essence deleting the events that don't pass the test we then
ensure that we make the value into a json string with JSON.stringify  
*/

function initButtons() {
  document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    load();
    // this is the event listeners for the buttons
    // That is when could forward in month when we press next
  });

  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    load();
    // That is when could backwards in month when we press back

  });

  document.getElementById('saveButton').addEventListener('click', saveEvent);
  document.getElementById('cancelButton').addEventListener('click', closeModal);
  document.getElementById('deleteButton').addEventListener('click', deleteEvent);
  document.getElementById('closeButton').addEventListener('click', closeModal);
}

/*
 
End of initButtons function 
This determines what event will happen when we click on the next and back buttons on the top of our calender 
As well as all our other buttons on the function and determines what function should be executed upon each button

 */

initButtons();
load();


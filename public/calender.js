const header = document.querySelector(".calendar h3");
const dates = document.querySelector(".dates");
const navs = document.querySelectorAll("#prev, #next");

const dateControl = document.querySelector('input[type="date"]');

function setDefaultDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let date = new Date();
let month = date.getMonth();
let year = date.getFullYear();
function renderCalendar() {
  const start = new Date(year, month, 1).getDay();
  const endDate = new Date(year, month + 1, 0).getDate();
  const end = new Date(year, month, endDate).getDay();
  const endDatePrev = new Date(year, month, 0).getDate();
  //const datesContainer = document.querySelector('#dates'); // Assuming 'dates' is an ID of the container for the dates

  function createAndAppendDate(date, isActive, isToday) {
    const li = document.createElement('li');
    li.textContent = date;
    if (!isActive) {
      li.classList.add('inactive');
    }
    if (isToday) {
      li.classList.add('today');
    }
    li.onclick = function() {
      let headerDate = header.textContent.trim().split(" ");
      datePicked = new Date(headerDate[1], months.indexOf(headerDate[0]), this.textContent)
      console.log(datePicked)

      //HENT HVOR MYE EN PERS HAR DRUKKET DENNE DAGEN
      
    };
    dates.appendChild(li);
  }

  // Previous month's dates
  for (let i = start; i > 0; i--) {
    createAndAppendDate(endDatePrev - i + 1, false);
  }

  // Current month's dates
  for (let i = 1; i <= endDate; i++) {
    const isToday =
      i === new Date().getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear();
    createAndAppendDate(i, true, isToday);
  }

  // Next month's dates
  for (let i = 1; i < 7 - end; i++) {
    createAndAppendDate(i, false);
  }

  header.textContent = `${months[month]} ${year}`; // Assuming 'header' is already defined
}

navs.forEach((nav) => {
  nav.addEventListener("click", (e) => {
    const btnId = e.target.id;

    if (btnId === "prev" && month === 0) {
      year--;
      month = 11;
    } else if (btnId === "next" && month === 11) {
      year++;
      month = 0;
    } else {
      month = btnId === "next" ? month + 1 : month - 1;
    }

    date = new Date(year, month, new Date().getDate());
    year = date.getFullYear();
    month = date.getMonth();

    renderCalendar();
  });
}); 

renderCalendar();
setDefaultDate();
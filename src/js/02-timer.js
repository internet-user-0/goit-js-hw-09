import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";


const refs = {
   inputEl: document.querySelector('#datetime-picker'),
   valueTime: document.querySelectorAll('.value'),
   startBtn: document.querySelector('button[data-start]'),
};

let selectedTime = 0;
let intervalId = null;


refs.startBtn.addEventListener('click', onStartBtn);
refs.startBtn.disabled = true;


const options = {
   enableTime: true,
   time_24hr: true,
   defaultDate: new Date(),
   minuteIncrement: 1,
   onClose,
}


flatpickr(refs.inputEl, options);


function onClose(selectedDates) {
   if (selectedDates[0] < options.defaultDate) {
   Notiflix.Confirm.show(
      'Notiflix Confirm',
      'Please choose a date in the future',
      'Ok',
      function okCb() {
         alert('Thanks you.');
      },
      {
      width: '320px',
      borderRadius: '8px',
      },
   );} else {
      refs.startBtn.disabled = false;
      selectedTime = selectedDates[0];
   }
};


function onStartBtn() {
   refs.startBtn.disabled = true;
   refs.inputEl.disabled = true;
   timeInterval(selectedTime); 
};


function timeInterval(date) {
   intervalId = setInterval(() => {
      const currentTime = Date.now();
      const countdownTime  = date - currentTime;
      const time = convertMs(countdownTime);
      updateBodyTime(time);

      if (countdownTime <= 1000)  {
            refs.inputEl.disabled = false;
            clearInterval(intervalId);
      }
   }, 1000); 
};

function addLeadingZero(value) {
   return String(value).padStart(2, '0');
};

function convertMs(ms) {
   const second = 1000;
   const minute = second * 60;
   const hour = minute * 60;
   const day = hour * 24;

   const days = addLeadingZero(Math.floor(ms / day));
   const hours = addLeadingZero(Math.floor((ms % day) / hour));
   const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
   const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

   return [days, hours, minutes, seconds];
};


function updateBodyTime(timeValue) {
timeValue.forEach((time, index) => {
   refs.valueTime[index].textContent = time;
});
};
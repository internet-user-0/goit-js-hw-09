const btnEl = {
   start: document.querySelector('[data-start]'),
   stop: document.querySelector('[data-stop]'),
};
const body = document.querySelector('body');



const backgroundChange = {
   intervalId: null,
   isActive: false,
start() {
   if (this.isActive) {
      return;
   };
   this.isActive = true;

   this.intervalId = setInterval(() => {
      body.style.background = `${getRandomHexColor()}`;
   }, 1000);
},
stop() {
   clearInterval(this.intervalId);
   this.isActive = false;``
}
};


btnEl.start.addEventListener('click', () => {
   backgroundChange.start();
});

btnEl.stop.addEventListener('click', () => {
   backgroundChange.stop();
});


function getRandomHexColor() {
   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
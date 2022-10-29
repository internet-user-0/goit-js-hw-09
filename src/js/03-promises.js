import Notiflix from 'notiflix';


const refs = {
Form: document.querySelector('.form'),
inputfirst: document.querySelector('[name = "delay"]'),
inputStep: document.querySelector('[name = "step"]'),
inputAmount: document.querySelector('[name = "amount"]'),
};


refs.Form.addEventListener('submit', onSubmit);


function onSubmit(event) {
  event.preventDefault();
  const firstStep = Number(refs.inputfirst.value);
  const stepDelay = Number(refs.inputStep.value);
  const amount = Number(refs.inputAmount.value);
  let delay = firstStep;

for (let position = 1; position <= amount; position += 1) {
  createPromise (position, delay)
  .then(({ position, delay }) => Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`))
  .catch(({ position, delay }) => Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`))
  delay += stepDelay;
}
};


function createPromise(position, delay) {
  const showResult = Math.random() > 0.3;
  return new Promise ((resolve, reject) => {
    setTimeout (() => {
  if (showResult) {
    resolve({position, delay})
  } 
  reject({position, delay});
}, delay);
  });
};
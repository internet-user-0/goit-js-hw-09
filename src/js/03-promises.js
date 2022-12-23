import Notiflix from 'notiflix';



document.querySelector('.form').addEventListener('submit', onSubmit);


function onSubmit(event) {
  event.preventDefault();
  const firstStep = Number(event.currentTarget[0].value);
  const stepDelay = Number(event.currentTarget[1].value);
  const amount = Number(event.currentTarget[2].value);
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
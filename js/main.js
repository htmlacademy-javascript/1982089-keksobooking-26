const initialRangeNumber = 2.2;
const finalRangeNumber = 3.1;
const presicionNumber = 3;

function getRandomNumber (initialNumber, finalNumber, presicion = 2) {
  if (initialNumber < 0 || finalNumber < 0) {
    return;
  }

  if (finalNumber < initialNumber) {
    finalNumber = [initialNumber, initialNumber = finalNumber][0];
  }

  return (Math.random() * (finalNumber - initialNumber) + initialNumber).toFixed(presicion);
}

getRandomNumber(initialRangeNumber, finalRangeNumber, presicionNumber);

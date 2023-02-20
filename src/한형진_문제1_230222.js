/*

*/
function matchColors(numbers, colors) {
  const colorMap = new Map();

  for (let i = 0; i < colors.length; i++) {
    colorMap.set(i + 1, colors[i]);
  }

  return numbers.map(number => number === 0 ? null : colorMap.get(number));
}

const numbers = [1, 3, 2, 0, 3, 4, 1, 0, 1, 1, 11];
const colors = ['red', 'green', 'blue', 'yellow', 'purple'];
const result = matchColors(numbers, colors);

console.log(result);
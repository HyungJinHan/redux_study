function solution() {
  const resultArr = [];
  const wordGrpArr = [2, 1, 0, 0, 0, 3, 3, 3, 1, 2, 3, 5];
  const colorArr = ['red', 'green', 'blue', 'yellow'];

  for (let i = 0; i < wordGrpArr.length; i++) {
    const groupNumber = parseInt(wordGrpArr.at(i));
    const color = colorArr[groupNumber - 1];

    if (groupNumber === 0) {
      resultArr.push(null);
    } else {
      resultArr.push(color);
    }
  }

  console.log(resultArr);
}

solution();
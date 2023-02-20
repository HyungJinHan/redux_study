function colorizeWords(wordGrpArr, colorArr) {
  const resultArr = [];
  const groupMap = new Map();

  // 각 그룹에 해당하는 색을 저장
  colorArr.forEach((color, i) => {
    groupMap.set(i + 1, color);
  });

  wordGrpArr.forEach((group, i) => {
    if (group === 0) {
      resultArr.push(null);
    } else {
      const color = groupMap.get(group);
      console.log(color);
      resultArr.push(color);
    }
  });

  return resultArr;
}

const wordGrpArr = [3, 4, 0, 5];
const colorArr = ['red', 'green', 'blue', 'yellow'];
const resultArr = colorizeWords(wordGrpArr, colorArr);

console.log(wordGrpArr, colorArr, resultArr);
/** 
colorMap: 해당 단어의 번호와 색상 매칭을 위한 Map 객체
numbers: 해당 단어 혹은 글의 번호
colors: 해당 번호와 매칭되어 같은 번호를 그룹화하여 같은 색상을 표시할 색상 배열

해당 번호를 Map 객체의 key 값으로 지정하여 같은 key 값일 경우, 해당 key에 대해 동일한 색상을 부여하여 그룹화

numbers 배열의 값들 중, 0일 경우 null 값을 결과 배열에 추가

numbers에서 0과 중복된 번호를 제외한 번호가 colors 배열의 색상의 개수와 맞지 않을 경우 undefined를 결과 배열에 추가 (수정 사항)
*/
function solution1() {
  const colorMap = new Map();

  const numbers = [1, 3, 2, 0, 3, 4, 1, 0, 1, 1];
  const colors = ['red', 'green', 'blue', 'yellow', 'purple'];

  for (let i = 0; i < colors.length; i++) {
    colorMap.set(i + 1, colors[i]);
  }
  const result = numbers.map(number => number === 0 ? null : colorMap.get(number));
  console.log(result);
}

solution1();
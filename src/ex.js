let a = 1
a = 2
console.log(a);
// 결과 : 2

const object = { a: 0 };
object.a = 1;
console.log(object);
// 결과 : { a: 1 }

const cloneAssign = Object.assign({}, object, { b: 2 });
console.log(cloneAssign);
// 결과 : { a: 1, b: 2 }

const cloneSpread = { ...object, ...cloneAssign, c: 3 };
console.log(cloneSpread);
// 결과 : { a: 1, b: 2, c: 3 }

const numberObject = { one: '하나', two: '둘', three: '셋' }
const { three, ...rest } = numberObject;
console.log(three);
// 결과 : 셋
console.log(rest);
// 결과 : { one: '하나', two: '둘' } - rest 안에는 three 값을 제외한 값이 들어있음
console.log(numberObject);
// 결과 : { one: '하나', two: '둘', three: '셋' }
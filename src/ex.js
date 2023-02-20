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

const counter = () => {
  let count = 0;

  // changeCounter는 inner 함수
  // 객체를 리턴하고 있고, 객체 안에는 increase, decrease, show라는 inner 함수들을 저장
  function changeCount(number) {
    count += number;
  }

  return {
    increase: function () {
      changeCount(100);
    },
    decrease: function () {
      changeCount(-10);
    },
    show: function () {
      console.log(count);
    }
  }
};

const counterClosure = counter();
// counter를 실행하면, outer 함수 스코프를 기억하고 있는 클로저들이 담긴 객체를 반환
// counterClosure는 counter 함수 내부에 정의된 count나 changeCount에 접근 가능

counterClosure.increase();
counterClosure.show(); // 100

counterClosure.decrease();
counterClosure.show(); // 90
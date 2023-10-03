// 해석기가 인수 우선 평가를 사용하는지, 정상 순서 평가를 사용하는지 파악하는 방법을 고안
function p() {
  return p();
}

function test(x, y) {
  return x === 0 ? 0 : y;
}

// 위 함수들에 대해서, 아래 문장을 평가하면 해석기의 평가 방식을 알 수 있다.

// test(0, p());

// 아하, 인수 우선 평가를 사용하는 경우 이 문장을 평가할 때 다음 순서로 평가한다.
// test 함수 표현식 평가
// 인수 평가
// 첫 번째 인수인 0 평가
// 두 번째 인수인 p() 평가 -> p() 는 무한히 p()를 반환하므로, 여기서 무한루프에 빠지게 된다.
// nodejs 환경에서는 Maximum call stack reached 에러 발생.

// 정상 순서 평가 방식을 사용하는 경우,
// 우선 함수를 다 전개한다.

// return 0 === 0 ? 0 : p()

// 그리고 해당 축약하는 형태로 평가 -> 0 === 0 이므로 귀결 표현식이 표현식의 결과로 처리된다. -> 0이 반환되고 대안 표현식은 평가되지 않음.

// ------------------------------------------------------------------------------------------------------------------------------------------------

// 뉴턴 방법으로 제곱근을 구하는 방식을 자바스크립트 함수로 표현해보자.
// 수 x의 제곱근이 될 만한 y값을 추측하고, y와 x/y 의 평균으로 더 나은 추측값을 계산하는 과정을 반복.

// x = 피 제곱근 수, guess = 추측값

function sqrt_calc_iteration(guess, x) {
  return is_good_enough(guess, x)
    ? guess
    : sqrt_calc_iteration(improve(guess, x), x);
}

// 추측값을 평균값으로 더 나은 추측값으로 변환하는 함수
function improve(guess, x) {
  return average(guess, x / guess);
}

function average(x, y) {
  return (x + y) / 2;
}

function abs(x) {
  return x >= 0 ? x : -x;
}

function square(x) {
  return x * x;
}

// 충분히 좋은 추측값인지 판별하는 함수
function is_good_enough(guess, x) {
  return abs(square(guess) - x) < 0.0001;
}

function get_sqrt(x) {
  return sqrt_calc_iteration(1, x);
}

const sqrt_9 = get_sqrt(9);

// console.log(sqrt_9);

// ------------------------------------------------------------------------------------------------------------------------------------------------

// 재귀적으로 factorial 계산
function get_fact_recursive(n) {
  if (n > 1) return n * get_fact_recursive(n - 1);
  return 1;
}

console.log(get_fact_recursive(4));

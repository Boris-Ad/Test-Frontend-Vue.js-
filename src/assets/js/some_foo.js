export const createCheckbox = (a, b, arr) => {
  let res = 0;

  function foo(a, b) {
    let currentA = makeSpaceLocal(Math.round(b).toString());
    arr.push(currentA);
    res = a - b;
    if (res > b) {
      foo(res, b);
    } else {
      let currentRes = makeSpaceLocal(Math.round(res).toString());
      arr.push(currentRes);
    }
  }
  foo(a, b);
};

export function getEndings(n) {
  let arr = ["ый", "ой", "ий"];
  if (("" + n).slice(-1) == 3 && ("" + n).slice(-2) != 13) {
    return arr[2];
  }
  if (
    (("" + n).slice(-1) == 2 && ("" + n).slice(-2) != 12) ||
    (n > 5 && n < 9)
  ) {
    return arr[1];
  }
  return arr[0];
}

function makeSpaceLocal(int) {
  return int.replace(/(\d)(?=(\d{3})+(\s|$))/g, "$1 ").replace(/$/, ` рублей`);
}

export function makeSpace(value) {
  return value
    .replace(/₽/, " ")
    .split(" ")
    .join("")
    .replace(/(\d)(?=(\d{3})+(\s|$))/g, "$1 ")
    .replace(/$/, " ₽");
}



export function getNumber(value){
  return +value.match(/\d+/g)?.join('');
}
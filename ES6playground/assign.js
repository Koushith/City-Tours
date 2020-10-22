const source = {
  name: 'koushith',
  CurrentAge: 22,
  CurrentCity: 'Mangalore',
  test: false,
};
const target = { name: 'koushith', nextYear: 23, newCity: 'Bangalore' };

const afterAssign = Object.assign(target, source);

// console.log(afterAssign);
// name- koushith , new

//console.log(afterAssign);

var obj1 = { a: 10, b: 10, c: 10 };
var obj2 = { b: 20, c: 20 };
var obj3 = { c: 30 };

//var new_obj = Object.assign({}, obj1, obj2, obj3);

console.log(new_obj);
// a-10
// b-20
// c-30

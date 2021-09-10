// function add(a) {
//   return function (b) {
//     return a + b;
//   };
// }

const add = (a) => (b) => a + b;

// const add2 = add(2);
// add2(3);
add(2)(3); //Less Number of parameters

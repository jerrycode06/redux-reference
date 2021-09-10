const person2 = { name: "Tom" };
const personUP = Object.assign({}, person2, { name: "Bob", age: 30 });
console.log(personUP);

const person = {
  name: "Jerry",
  address: {
    country: "USA",
    city: "San Francisco",
  },
};

const updated = {
  ...person,
  address: {
    ...person.address, // Deep Copy
    city: "New York",
  },
  name: "Tom",
};

console.log(person);
console.log(updated);

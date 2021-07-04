const person = { firstName: "Jim", lastName: "Jorgenson", age: 28 };

// const person2 = person;
// const person2 = { firstName: "Jim", lastName: "Jorgenson", age: 28 };
const person2 = { ...person, lastName: "Smith" };

const isSamePerson = person === person2;

// person2.lastName = "Smith";

// console.log(person);
// console.log(person2);
// console.log(isSamePerson);

const people = [
  { firstName: "John", lastName: "Reilly" },
  { firstName: "Alex", lastName: "Hebley" },
];

// const updatedPeople = people;
const updatedPeople = [...people, { firstName: "Maggie", lastName: "Johnson" }];
const shouldSvelteUpdateHTML = people !== updatedPeople;

// updatedPeople.push({ firstName: "Maggie", lastName: "Johnson" });
console.log(shouldSvelteUpdateHTML);

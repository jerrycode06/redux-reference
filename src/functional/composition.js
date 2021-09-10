import { compose, pipe } from "lodash/fp";
console.log("Hello World");

let input = "   Javascript   ";
let output = `<div>${input.trim()}</div>`;

// Let's do function composition
const trim = (str) => str.trim();
// const wrapInDiv = (str) => `<div>${str}</div>`;
// const wrapInSpan = (str) => `<span>${str}</span>`;
// We can do above two things like -
const wrap = (type) => (str) => `<${type}>${str}</${type}>`;
const toLowerCase = (str) => str.toLowerCase();

// const result = wrapInDiv(toLowerCase(trim(input))); // No need to do this

// We are using many parenthesis up there so now we use compose in lodash
// const transform = compose(wrapInDiv, toLowerCase, trim);

// For remembering order we can pipe
const transform = pipe(trim, toLowerCase, wrap("span"));
console.log(transform(input));

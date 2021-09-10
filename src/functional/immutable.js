import { Map } from "immutable";

let book = Map({ title: "Lord of the Rings" });

function publish(book) {
  return book.set("isPublished", true);
}

book = publish(book); // this function does not modify the current book but return the new object with modified changes
console.log(book.toJS()); // immutable js don't give you plain Javascript so we have to use toJs() function

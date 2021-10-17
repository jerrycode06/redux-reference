import { addBug } from "../bugs";
import configureStore from "../configureStore";

//SOCIAL TEST - ONLY CARES ABOUT BEHAVIOUR, that means if we change implementation in future, behaviour will be the same
describe("bugsSlice", () => {
  it("should handle the addBug action", async () => {
    const store = configureStore();
    const bug = { description: "aa" };
    await store.dispatch(addBug(bug));
    expect(store.getState().entities.bugs.list).toHaveLength(1);
  });
});

// SOLITARY TEST - SO MUCH IMPLEMENTATION DETAILS HERE
// describe("bugsSlice", () => {
//   describe("action creators", () => {
//     it("addBug", () => {
//       const bug = { decription: "a" };
//       const result = addBug(bug);
//       const expected = {
//         type: apiCallBegan.type,
//         payload: {
//           url: "/bugs",
//           method: "post",
//           data: bug,
//           onSuccess: bugAdded.type,
//         },
//       };
//       expect(result).toEqual(expected);
//     });
//   });
// });

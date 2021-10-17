import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { addBug } from "../bugs";
import configureStore from "../configureStore";

//SOCIAL TEST - ONLY CARES ABOUT BEHAVIOUR, that means if we change implementation in future, behaviour will be the same
/*Here we will make fake API call with axios-mock-adapter to perform actual unit test*/
describe("bugsSlice", () => {
  it("should handle the addBug action", async () => {
    const bug = { description: "aa" };
    const savedBug = { ...bug, id: 1 };

    const fakeAxios = new MockAdapter(axios);
    fakeAxios.onPost("/bugs").reply(200, savedBug);

    const store = configureStore();
    await store.dispatch(addBug(bug));
    expect(store.getState().entities.bugs.list).toContainEqual(savedBug);
  });
});

/* This test making connection with external bakcend which doesn't lie in the category of Unit Test, If some time 
    there is problem in backend, this test will fail */
// describe("bugsSlice", () => {
//   it("should handle the addBug action", async () => {
//     const store = configureStore();
//     const bug = { description: "aa" };
//     await store.dispatch(addBug(bug));
//     expect(store.getState().entities.bugs.list).toHaveLength(1);
//   });
// });

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

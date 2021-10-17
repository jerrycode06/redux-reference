import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { addBug } from "../bugs";
import configureStore from "../configureStore";

//SOCIAL TEST - ONLY CARES ABOUT BEHAVIOUR, that means if we change implementation in future, behaviour will be the same
/*Here we will make fake API call with axios-mock-adapter to perform actual unit test*/
describe("bugsSlice", () => {
  let fakeAxios;
  let store;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore();
  });

  const bugsSlice = () => store.getState().entities.bugs;

  it("should add the bug to the store if it's saved to the server", async () => {
    // Arrange
    const bug = { description: "aa" };
    const savedBug = { ...bug, id: 1 };
    fakeAxios.onPost("/bugs").reply(200, savedBug);

    // Act
    await store.dispatch(addBug(bug));

    // Assert
    expect(bugsSlice().list).toContainEqual(savedBug);
  });

  it("should not add the bug to the store if it's not saved to the server", async () => {
    // Arrange
    const bug = { description: "aa" };

    fakeAxios.onPost("/bugs").reply(500);

    // Act
    await store.dispatch(addBug(bug));

    // Assert
    expect(bugsSlice().list).toHaveLength(0);
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

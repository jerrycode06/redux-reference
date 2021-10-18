import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { addBug, getUnresolvedBugs, resolveBug, loadBugs } from "../bugs";
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

  const createState = () => ({
    entities: {
      bugs: {
        list: [],
      },
    },
  });

  describe("loadBugs", () => {
    /* <----- Steps to follow for test loadBugs feature -----> 
    - loading Bugs
      - if they exist in the cache 
        * they should come from the cache
      - if they don't exist in the cache 
        * they should be fetched from the server
        -loading indicator
          * should be true while fetching
          * should be false after bugs fetched
          * should be false after server fails
    */

    describe("if the bugs exist in the cache", () => {
      it("they should not be fetched from the server", async () => {
        fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

        await store.dispatch(loadBugs());
        await store.dispatch(loadBugs());

        expect(fakeAxios.history.get.length).toBe(1);
      });
    });
    describe("if the bugs don't exist in the cache", () => {
      it("they should be fetched from the server and put it in the store", async () => {
        fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

        await store.dispatch(loadBugs());

        expect(bugsSlice().list).toHaveLength(1);
      });

      describe("loading indicator", () => {
        it("should be true while fetching the bugs", () => {
          // fakeAxios.onGet("/bugs").reply(200,[{id: 1}]);
          fakeAxios.onGet("/bugs").reply(() => {
            expect(bugsSlice().loading).toBe(true);
            return [200, [{ id: 1 }]];
          });

          store.dispatch(loadBugs());
        });

        it("should be false after the bugs fetched", async () => {
          // fakeAxios.onGet("/bugs").reply(200,[{id: 1}]);
          fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

          await store.dispatch(loadBugs());

          expect(bugsSlice().loading).toBe(false);
        });

        it("should be false if the server return an error", async () => {
          // fakeAxios.onGet("/bugs").reply(200,[{id: 1}]);
          fakeAxios.onGet("/bugs").reply(500);

          await store.dispatch(loadBugs());

          expect(bugsSlice().loading).toBe(false);
        });
      });
    });
  });

  it("should mark the bug as resolved if it's saved to the server", async () => {
    // Arrange
    fakeAxios.onPatch("/bugs/1").reply(200, { id: 1, resolved: true });
    fakeAxios.onPost("/bugs").reply(200, { id: 1, resolved: true });

    //Act
    await store.dispatch(addBug({}));
    await store.dispatch(resolveBug(1));

    // Assert
    expect(bugsSlice().list[0].resolved).toBe(true);
  });

  it("should not mark the bug as resolved if it's not saved to the server", async () => {
    // Arrange
    fakeAxios.onPatch("/bugs/1").reply(500);
    fakeAxios.onPost("/bugs").reply(200, { id: 1 });

    //Act
    await store.dispatch(addBug({}));
    await store.dispatch(resolveBug(1));

    // Assert
    expect(bugsSlice().list[0].resolved).not.toBe(true);
  });

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

  describe("selectors", () => {
    it("getUnresolvedBugs", () => {
      // Arrange
      const state = createState();
      state.entities.bugs.list = [
        { id: 1, resolved: true },
        { id: 2 },
        { id: 3 },
      ];

      // Act
      const result = getUnresolvedBugs(state);

      // Assert
      expect(result).toHaveLength(2);
    });
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

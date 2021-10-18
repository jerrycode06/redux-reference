import { useEffect } from "react";
import { connect } from "react-redux";
import { loadBugs, resolveBug } from "../store/bugs";

// REACT_REDUX APPROACH
const Bugs = (props) => {
  useEffect(() => {
    props.loadBugs();
  }, [props]);

  return (
    <ul>
      {props.bugs?.map((bug) => (
        <li key={bug.id}>{bug.description}</li>
      ))}
    </ul>
  );
};

const mapStateToProps = (state) => ({
  bugs: state.entities.bugs.list,
});

const mapDispatchToProps = (dispatch) => ({
  loadBugs: () => dispatch(loadBugs()),
  resolveBugs: (id) => dispatch(resolveBug(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Bugs);

// MANUAL APPROACH
// import { useState, useEffect, useContext } from "react";
// import StoreContext from "../context/storeContext";
// import { loadBugs } from "../store/bugs";

// const Bugs = () => {
//   const store = useContext(StoreContext);
//   const [bugs, setBugs] = useState([]);

//   useEffect(() => {
//     const unsubscribe = store.subscribe(() => {
//       const bugsInStore = store.getState().entities.bugs.list;
//       if (bugs !== bugsInStore) setBugs(bugsInStore);
//     });

//     store.dispatch(loadBugs());
//     return () => {
//       unsubscribe();
//     };
//   }, [bugs, store]);

//   return (
//     <ul>
//       {bugs?.map((bug) => (
//         <li key={bug.id}>{bug.description}</li>
//       ))}
//     </ul>
//   );
// };

// export default Bugs;

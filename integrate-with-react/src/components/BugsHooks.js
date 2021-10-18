import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadBugs, getUnresolvedBugs, resolveBug } from "../store/bugs";

const BugsHooks = () => {
  const dispatch = useDispatch();
  const bugs = useSelector((state) => state.entities.bugs.list);
  const resolvedBugs = useSelector(getUnresolvedBugs);

  useEffect(() => {
    dispatch(loadBugs());
  }, []);

  return (
    <div>
      <ul>
        {resolvedBugs?.map((bug) => (
          <div key={bug.id} style={{ display: "flex", marginBottom: "10px" }}>
            <li>{bug.description}</li>
            <button onClick={() => dispatch(resolveBug(bug.id))}>
              Resolve Bug
            </button>
          </div>
        ))}
        {/* <h2>Unresolved Bugs</h2>
        {resolvedBugs?.map((bug) => (
          <li key={bug.id}>{bug.description}</li>
        ))} */}
      </ul>
    </div>
  );
};

export default BugsHooks;

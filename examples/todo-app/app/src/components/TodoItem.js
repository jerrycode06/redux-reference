import React from "react";
import { useDispatch } from "react-redux";
import {
  toggleComplete,
  deleteTodo,
  toggleCompleteAsync,
  deleteTodoAsync,
} from "../redux/todoSlice";

const TodoItem = ({ id, title, completed }) => {
  const dispatch = useDispatch();

  const handleCheckboxClick = () => {
    dispatch(toggleCompleteAsync({ id, completed: !completed }));
  };

  return (
    <li className={`list-group-item ${completed && "list-group-item-success"}`}>
      <div className="d-flex justify-content-between">
        <span className="d-flex align-items-center">
          <input
            type="checkbox"
            className="mr-3"
            onClick={handleCheckboxClick}
            checked={completed}
          ></input>
          {title}
        </span>
        <button
          onClick={() => dispatch(deleteTodoAsync({ id }))}
          className="btn btn-danger"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;

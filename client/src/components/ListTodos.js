import React, { Fragment, useEffect, useState } from "react";
import Modal from "react-modal";

const ListTodos = () => {
  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    const res = await fetch("http://localhost:5000/todos");
    const data = await res.json();
    setTodos(data);
  };

  const onDelete = async (id) => {
    console.log("on delete");
    const res = await fetch(`http://localhost:5000/todos/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log(data);
    setTodos(todos.filter((todo) => todo.todo_id !== id));
  };

  const onSubmitNew = async (e) => {
    e.preventDefault();
    console.log("onUpdate");
    try {
      const data = { description: newDesc };
      if (newDesc !== "") {
        await fetch(`http://localhost:5000/todos/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        window.location = "./";
      } else {
        alert("Enter todo to update");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const OpenModal = (id, desc) => {
    setModalState(true);
    setNewDesc(desc);
    setID(id);
  };

  const [newDesc, setNewDesc] = useState("");
  const [id, setID] = useState(null);
  const [todos, setTodos] = useState([]);
  const [modalState, setModalState] = useState(false);
  Modal.setAppElement("#root");
  return (
    <Fragment>
      <table className="table  mt-5">
        <thead className="thead-dark">
          <tr>
            <th>Check</th>
            <th scope="col">#ID</th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>
                <input
                  type="checkbox"
                  name="multi"
                  value={todo.todo_id}
                  id=""
                />
              </td>
              <td>{todo.todo_id}</td>
              <td>{todo.description}</td>
              <td>
                <button
                  className="btn btn-success"
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                  onClick={() => OpenModal(todo.todo_id, todo.description)}
                >
                  EDIT
                </button>{" "}
                <button
                  className="btn btn-danger"
                  onClick={() => onDelete(todo.todo_id)}
                >
                  DELETE
                </button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={modalState}
        contentLabel="modal"
        closeTimeoutMS={20}
        // portalClassName="a_modal"
        className="a_modal"
        overlayClassName="a_overlay"
        onRequestClose={() => setModalState(false)}
      >
        <h2>Edit Todo</h2>
        <form className="d-flex mt-5" onSubmit={onSubmitNew}>
          <input
            type="text"
            className="form-control"
            name="todo"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
          />

          <input type="submit" className="btn btn-success" value="Update" />
        </form>
        <div>
          <button onClick={() => setModalState(false)}>Close</button>
        </div>
      </Modal>
    </Fragment>
  );
};

export default ListTodos;

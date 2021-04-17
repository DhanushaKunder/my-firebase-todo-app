import "./App.css";
import { useState } from "react";
import firebase, { auth, firestore, functions } from "./firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";



const Todos = () => {
  const [todo, setTodo] = useState("");
  const todosRef = firestore.collection( `users/${auth.currentUser.uid}/todos`);
  // const todosRef = firestore.collection(`/todos`);
  const [todos] = useCollectionData(todosRef, { idField: "id" });

  const signOut = () => auth.signOut();

  const onSubmitTodo = (event) => {
    event.preventDefault();

    setTodo("");
    // addTodo({
     todosRef.add({ 
      text: todo,
      complete: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  return (
    <>
      <header>
        <button onClick={signOut}>Sign Out</button>
      </header>
      <h1 className="heading_one"> Dhanusha's TO-DO App</h1>
      <main>
        <form onSubmit={onSubmitTodo}>
          <input
            required
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="What's Next?"
          />
          <button className="submit_button" type="submit">Add</button>
        </form>
        {todos && todos.map((todo) => <Todo key={todo.id} {...todo} />)}
      </main>
    </>
  );
};

const Todo = ({ id, complete, text }) => {
  const todosRef = firestore.collection(`users/${auth.currentUser.uid}/todos`);
  // const todosRef = firestore.collection(`/todos`);
  const onCompleteTodo = (id, complete) =>
    todosRef.doc(id).set({ complete: !complete }, { merge: true });

  const onDeleteTodo = (id) => todosRef.doc(id).delete();

  return (
    <div key={id} className="todo">
      <button
        className={`todo-item ${complete ? "complete" : ""}`}
        tabIndex="0"
        onClick={() => onCompleteTodo(id, complete)}
      >
        {text}
      </button>
      <button onClick={() => onDeleteTodo(id)}>x</button>
    </div>
  );
};

export default Todos;
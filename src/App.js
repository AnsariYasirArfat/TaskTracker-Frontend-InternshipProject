import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CSS/App.css";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Todos from "./Components/Todos";
import AddTodo from "./Components/AddTodo";
import LoginPage from "./Components/LoginPage";

function App() {
  // For Login & Signup
  const [loggedIn, setLoggedIn] = useState(false);
  const handleLogin = (token) => {
    // Handle the successful login and set the loggedIn state to true
    localStorage.setItem("token", token);
    setLoggedIn(true);
  };
  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  // For Logout button
  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  // Getting the data from localStorage
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  } else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }

  const [todos, setTodos] = useState(initTodo);
  const [filterText, setFilterText] = useState("");

  // Function for adding todo
  const addTodo = (title, desc) => {
    let sno;
    if (todos.length === 0) {
      sno = 1;
    } else {
      sno = todos[todos.length - 1].sno + 1;
    }

    const myTodo = {
      sno,
      title,
      desc,
      done: false,
      todoTime: new Intl.DateTimeFormat(navigator.language, {
        hour: "numeric",
        minute: "numeric",
      }).format(new Date()),
      todoDate: new Intl.DateTimeFormat(navigator.language, {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(new Date()),
    };
    setTodos([...todos, myTodo]);

    // For Notification Alert
    toast.success("New Task Added!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  // Function for deleting todo
  const onDelete = (todo) => {
    setTodos(
      todos.filter((e) => {
        return e !== todo;
      })
    );
    // For Notification Alert
    toast.error("Task Deleted!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  // Function for editing todo
  function onEdit(editTodo) {
    const updatedTodo = {
      ...editTodo,
      todoTime: new Intl.DateTimeFormat(navigator.language, {
        hour: "numeric",
        minute: "numeric",
      }).format(new Date()),
      todoDate: new Intl.DateTimeFormat(navigator.language, {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(new Date()),
    };
    setTodos(todos.map((t) => (t.sno === editTodo.sno ? updatedTodo : t)));
  }

  // For checked task
  function onChecked(checkTodo) {
    const updatedTodo = {
      ...checkTodo,
    };
    setTodos(todos.map((t) => (t.sno === checkTodo.sno ? updatedTodo : t)));
  }
  // To store the date in string format in local storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            loggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route
          path="/dashboard"
          element={
            loggedIn ? (
              <>
                <Header
                  title="TaskTracker"
                  filterText={filterText}
                  onFilterTextChange={setFilterText}
                  showSearch={true}
                  handleLogout={handleLogout}
                />
                <AddTodo addTodo={addTodo} />
                <Todos
                  todos={todos}
                  onDelete={onDelete}
                  onEdit={onEdit}
                  onChecked={onChecked}
                  filterText={filterText}
                />
                <ToastContainer autoClose={1000} />
                <Footer />
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

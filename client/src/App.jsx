import "./config/connection"
import React from "react";
import Home from "./components/Homepage/Home";
import About from "./components/Homepage/About";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskForm from "./components/Homepage/TaskForm";
import TaskList from "./components/Homepage/TaskList";

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/post-task" element={<TaskForm />} />
        <Route path="/tasks" element={<TaskList />} />
      </Routes>
    </BrowserRouter>
    </>
  );
};

export default App;

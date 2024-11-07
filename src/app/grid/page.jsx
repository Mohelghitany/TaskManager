"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Modal from "../modal/page"; 
import "./grid.css";

const fadeUpAnimationVariant = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const Grid = () => {
  const [tasks, setTasks] = useState([]);
  const [inputTask, setInputTask] = useState("");
  const [inputLabel, setInputLabel] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedTask, setSelectedTask] = useState(null); 

  const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const loadTasksFromLocalStorage = () => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  };

  const addTask = () => {
    if (inputLabel.trim() !== "" && inputTask.trim() !== "") {
      const newTasks = [
        { label: inputLabel, description: inputTask, isCompleted: false },
        ...tasks,
      ];
      setTasks(newTasks);
      saveTasksToLocalStorage(newTasks);
      setInputTask("");
      setInputLabel("");
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, idx) => {
      if (idx === index) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, idx) => idx !== index);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  useEffect(() => {
    setTasks(loadTasksFromLocalStorage());
  }, []);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.isCompleted;
    if (filter === "incomplete") return !task.isCompleted;
    return true;
  });

  return (
    <>
    <div className={selectedTask ? "blur" : ""}>
      <motion.div 
        className="input-container flex w-full p-2 bg-[#ddd] rounded-full shadow-md bg-gradient-to-l from-[#ddd] to-[#333] font-bold"
        initial="initial"
        animate="animate"
        variants={fadeUpAnimationVariant}>
        <button onClick={() => setFilter("all")} className="filter-button rounded-full grow">
          All
        </button>
        <button onClick={() => setFilter("completed")} className="filter-button rounded-full grow">
          Completed
        </button>
        <button onClick={() => setFilter("incomplete")} className="filter-button rounded-full grow">
          Incomplete
        </button>
      </motion.div>

      <motion.div
        id="taskContainer"
        className="flex flex-col items-center justify-center"
        initial="initial"
        animate="animate"
        variants={fadeUpAnimationVariant}
      >
        <div className="task-list-container">
          {tasks.length === 0 ? (
            <motion.h1
              className="h-full text-center w-[80%] font-bold text-[30px] flex items-center justify-center"
              variants={fadeUpAnimationVariant}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              There are no active tasks at the moment. Start by adding a new task.
              <br /> 👇
            </motion.h1>
          ) : (
            filteredTasks.map((task, index) => (
              <motion.div
                key={index}
                className={`task-card shadow-lg ${task.isCompleted ? "completed" : ""}`}
                variants={fadeUpAnimationVariant}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                
              >
                <div className="task-container"  >
                  <div onClick={() => setSelectedTask(task)}>
                     <div className="task-header flex">
                    <div className="task-label">{task.label}</div>
                    </div>
                    <div className="task-description">{task.description}</div>
                  </div>
                  
                  <div className="task-controls">
                    <button
                      onClick={() => toggleTaskCompletion(index)}
                      className="task-button"
                    >
                      {task.isCompleted ? "Undo" : "Complete"}
                    </button>
                    <button
                      onClick={() => deleteTask(index)}
                      className="task-button delete-button"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>

      <motion.div
        className="input-container flex w-full p-2 bg-[#ddd] rounded-full shadow-md bg-gradient-to-l from-[#ddd] to-[#333] font-bold"
        variants={fadeUpAnimationVariant}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <input
          type="text"
          value={inputLabel}
          onChange={(e) => setInputLabel(e.target.value)}
          placeholder="Enter task label"
          className="input-label grow bg-[#f8f8f8]"
        />
        <input
          type="text"
          value={inputTask}
          onChange={(e) => setInputTask(e.target.value)}
          placeholder="Enter task description"
          className="input-label grow bg-[#f8f8f8]"
        />
        <button onClick={addTask} className="add-task-button rounded-full grow">
          Add Task ➕
        </button>
      </motion.div>
      </div>

      
      {selectedTask && (
        <Modal task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}

    </>
  );
};

export default Grid;

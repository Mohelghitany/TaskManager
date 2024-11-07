import React from "react";
import { motion } from "framer-motion";
import "./modal.css";

const Modal = ({ task, onClose }) => {
  if (!task) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div 
        className="modal-content"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()} 
      >
        <h2 className="modal-title">{task.label}</h2>
        <p className="modal-description">{task.description}</p>
        <button onClick={onClose} className="add-task-button rounded-full grow">Close</button>
      </motion.div>
    </div>
  );
};

export default Modal;

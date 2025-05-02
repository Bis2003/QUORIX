import React, { useState } from "react";
import {
  Layout,
  Menu,
  Button,
  Modal,
  Input,
  DatePicker,
  Card,
  Badge,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./style.module.css";
import { TaskCard } from "../../components/task-card";

const { TextArea } = Input;

export const TaskPage = ({ tasks, onTaskUpdate }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: null,
    endDate: null,
  });

  const handleAddTask = async (task) => {
    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      
      if (response.ok) {
        const newTask = await response.json();
        const updatedTasks = [...tasks, newTask];
        onTaskUpdate(updatedTasks);
        message.success("Task added successfully");
      } else {
        message.error("Failed to add task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
      message.error("Failed to add task");
    }
  };

  const handleOk = () => {
    handleAddTask({
      ...formData,
      status: "Pending",
      priority: "NORMAL",
      statusColor: "default",
    });
    setModalOpen(false);
    setFormData({
      title: "",
      description: "",
      startDate: null,
      endDate: null,
    });
  };

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setModalOpen(true)}
        className={styles.addTaskBtn}
      >
        Add Task
      </Button>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
      <Modal
        title="Add Task"
        open={modalOpen}
        onOk={handleOk}
        onCancel={() => setModalOpen(false)}
      >
        <Input
          placeholder="Title"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
          className={styles.inputField}
        />
        <DatePicker
          placeholder="Start Date"
          onChange={(_, dateStr) =>
            setFormData({ ...formData, startDate: dateStr })
          }
          className={styles.inputField}
        />
        <DatePicker
          placeholder="End Date"
          onChange={(_, dateStr) =>
            setFormData({ ...formData, endDate: dateStr })
          }
          className={styles.inputField}
        />
        <TextArea
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={4}
        />
      </Modal>
    </>
  );
};

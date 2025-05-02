import { useParams, useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import { Card, Button, Modal, Input, message, DatePicker } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { TextArea } = Input;

export const TaskDetailsPage = ({ tasks, onTaskUpdate }) => {
  const [task, setTask] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    completed: false,
    startDate: null,
    endDate: null
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const foundTask = tasks.find((t) => t.id === id);
    if (foundTask) {
      setTask(foundTask);
      setEditFormData({
        title: foundTask.title,
        description: foundTask.description,
        completed: foundTask.completed,
        startDate: foundTask.startDate ? new Date(foundTask.startDate) : null,
        endDate: foundTask.endDate ? new Date(foundTask.endDate) : null
      });
    }
  }, [tasks, id]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...editFormData,
          startDate: editFormData.startDate?.toISOString(),
          endDate: editFormData.endDate?.toISOString()
        }),
      });

      if (response.ok) {
        const updatedTask = await response.json();
        const updatedTasks = tasks.map(t => t.id === id ? updatedTask : t);
        onTaskUpdate(updatedTasks);
        setTask(updatedTask);
        setIsEditModalVisible(false);
        message.success("Task updated successfully");
      } else {
        message.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
      message.error("Failed to update task");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const updatedTasks = tasks.filter(t => t.id !== id);
        onTaskUpdate(updatedTasks);
        message.success("Task deleted successfully");
        navigate("/task");
      } else {
        message.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      message.error("Failed to delete task");
    }
  };

  const toggleCompleted = () => {
    setEditFormData(prev => ({
      ...prev,
      completed: !prev.completed
    }));
  };

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div className={styles.taskDetailContainer}>
      <Card 
        title={task.title}
        extra={
          <div className={styles.actionButtons}>
            <Button 
              type="primary" 
              icon={<EditOutlined />}
              onClick={() => setIsEditModalVisible(true)}
            >
              Edit
            </Button>
            <Button 
              danger 
              icon={<DeleteOutlined />}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        }
        className={styles.taskDetailCard}
      >
        <p><strong>Description:</strong> {task.description}</p>
        <p><strong>Status:</strong> {task.completed ? "Completed" : "In Progress"}</p>
        <p><strong>Start Date:</strong> {task.startDate ? new Date(task.startDate).toLocaleDateString() : 'Not set'}</p>
        <p><strong>End Date:</strong> {task.endDate ? new Date(task.endDate).toLocaleDateString() : 'Not set'}</p>
        <p><strong>Created:</strong> {new Date(task.createdAt).toLocaleString()}</p>
      </Card>

      <Modal
        title="Edit Task"
        open={isEditModalVisible}
        onOk={handleUpdate}
        onCancel={() => setIsEditModalVisible(false)}
        width={600}
      >
        <Input
          placeholder="Title"
          value={editFormData.title}
          onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
          className={styles.inputField}
        />
        <TextArea
          placeholder="Description"
          value={editFormData.description}
          onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
          rows={4}
          className={styles.inputField}
        />
        <DatePicker
          placeholder="Start Date"
          value={editFormData.startDate}
          onChange={(date) => setEditFormData({ ...editFormData, startDate: date })}
          className={styles.inputField}
        />
        <DatePicker
          placeholder="End Date"
          value={editFormData.endDate}
          onChange={(date) => setEditFormData({ ...editFormData, endDate: date })}
          className={styles.inputField}
        />
        <Button
          type={editFormData.completed ? "primary" : "default"}
          onClick={toggleCompleted}
          className={styles.inputField}
        >
          {editFormData.completed ? "Mark as In Progress" : "Mark as Completed"}
        </Button>
      </Modal>
    </div>
  );
};

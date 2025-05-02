import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { LoginForm } from "./pages/authentication/login";
import { RegisterForm } from "./pages/authentication/signup";
import { AppLayout } from "./components/layout";
import { Dashboard } from "./pages/dashboard";
import { TaskPage } from "./pages/task-management";
import { TaskDetailsPage } from "./pages/task-detail";

export const App = () => {
  const [selectedPage, setSelectedPage] = useState("dashboard");
  const [tasks, setTasks] = useState([]); // State to store tasks

  useEffect(() => {
    fetchTasks();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleTaskUpdate = (updatedTasks) => {
    setTasks(updatedTasks);
  };

  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route
        path="/dashboard"
        element={
          <AppLayout
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
          >
            <Dashboard tasks={tasks} />
          </AppLayout>
        }
      />
      <Route
        path="/task"
        element={
          <AppLayout
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
          >
            <TaskPage tasks={tasks} onTaskUpdate={handleTaskUpdate} />
          </AppLayout>
        }
      />
      <Route
        path="/task/:id"
        element={
          <AppLayout
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
          >
            <TaskDetailsPage tasks={tasks} onTaskUpdate={handleTaskUpdate} />
          </AppLayout>
        }
      />
    </Routes>
  );
};

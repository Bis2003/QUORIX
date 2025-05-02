import { Badge, Card } from "antd";
import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";

export const TaskCard = ({ task }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/task/${task.id}`);
  };

  return (
    <Card
      title={task.title}
      extra={<Badge status={task.completed ? "success" : "processing"} text={task.completed ? "Completed" : "In Progress"} />}
      className={styles.taskCard}
      onClick={handleCardClick}
    >
      <p>{task.description}</p>
      <p>
        <strong>Created:</strong> {new Date(task.createdAt).toLocaleDateString()}
      </p>
    </Card>
  );
};

import { Card } from "antd";
import styles from "./style.module.css";

export const Dashboard = ({ tasks }) => {
  const completed = tasks.filter((t) => t.completed).length;
  const pending = tasks.filter((t) => !t.completed).length;
  const total = tasks.length;

  return (
    <div className={styles.dashboardGrid}>
      <Card title="Total Tasks">{total}</Card>
      <Card title="Completed">{completed}</Card>
      <Card title="In Progress">{pending}</Card>
    </div>
  );
};

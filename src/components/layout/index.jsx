import { Layout, Menu } from "antd";
import styles from "./style.module.css";
import { useLocation, useNavigate } from "react-router-dom";

const { Content, Sider } = Layout;

export const AppLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Layout className={styles.appLayout}>
      <Sider className={styles.sidebar}>
        <div className={styles.logo}>BK</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={"dashboard"}
          onClick={({ key }) => navigate(`/${key}`)}
          items={[
            { key: "dashboard", label: "Dashboard" },
            { key: "task", label: "My Tasks" },
          ]}
        />
      </Sider>
      <Layout>
        <Content className={styles.content}>{children}</Content>
      </Layout>
    </Layout>
  );
};

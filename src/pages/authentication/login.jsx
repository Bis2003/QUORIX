import React from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { Link, useNavigate } from "react-router-dom";

import style from "./style.module.css";

const { Title, Text } = Typography;

export const LoginForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      // For now, we'll just simulate a successful login
      // In a real app, you would validate credentials with your backend
      console.log("Login:", values);
      message.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      message.error("Login failed. Please try again.");
    }
  };

  return (
    <div className={style["container"]}>
      <div className={style["login-container"]}>
        <Title level={2} className={style["heading"]}>
          Login
        </Title>
        <Form form={form} name="login" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
        <Text>
          Don't have an account? <Link to="/register">Register here</Link>
        </Text>
      </div>
    </div>
  );
};






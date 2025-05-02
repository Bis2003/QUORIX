import React from "react";
import { Form, Input, Button, Select, message, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";

import style from "./style.module.css";

const { Title, Text } = Typography;
const { Option } = Select;

export const RegisterForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      // For now, we'll just simulate a successful registration
      // In a real app, you would send this data to your backend
      console.log("Register:", values);
      message.success("Registration successful");
      navigate("/dashboard");
    } catch (error) {
      message.error("Registration failed. Please try again.");
    }
  };

  const passwordValidator = (_, value) => {
    if (!value || value.length < 6) {
      return Promise.reject(
        new Error("Password must be at least 6 characters")
      );
    }
    return Promise.resolve();
  };

  const confirmPasswordValidator = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("Passwords do not match"));
    },
  });

  return (
    <div className={style["container"]}>
      <div className={style["register-container"]}>
        <Title level={2} className={style["heading"]}>
          Register
        </Title>
        <Form form={form} name="register" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true }]}
            className={style["form-item"]}
          >
            <Select placeholder="Select a role">
              <Option value="admin">Admin</Option>
              <Option value="user">User</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, min: 2 }]}
            className={style["form-item"]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            className={style["form-item"]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
            className={style["form-item"]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, validator: passwordValidator }]}
            className={style["form-item"]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            rules={[{ required: true }, confirmPasswordValidator]}
            className={style["form-item"]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Register
            </Button>
          </Form.Item>
        </Form>
        <Text>
          Already have an account? <Link to="/login">Login here</Link>
        </Text>
      </div>
    </div>
  );
};

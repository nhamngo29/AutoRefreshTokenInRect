import { Button, Form, Input, Alert } from "antd";
import http from "../../utils/http";
import pathApi from "../../constants/pathApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsAuthenticated } from "./login.reducer";

export default function Login() {
  const [errorLogin, setErrorLogin] = useState(undefined);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      // Gửi thông tin đăng nhập tới API
      const response = await http.post(pathApi.login, values);
      console.log("Login success:", response.data);
      dispatch(setIsAuthenticated(true));
      navigate("/profile");
    } catch (error) {
      console.error("Login error:", error);

      // Cập nhật thông báo lỗi nếu đăng nhập thất bại
      setErrorLogin(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      {errorLogin && (
        <Alert
          message="Login Failed"
          description={errorLogin}
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="userName"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

import { Button, Form, Input, notification } from "antd";
import http from "../../utils/http";
import pathApi from "../../constants/pathApi";
import { createContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setIsAuthenticated } from "./login.reducer";
const Context = createContext({
  name: "Default",
});
export default function Login() {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();
  const openNotificationWithIcon = (message) => {
    api["error"]({
      message: "Thông báo",
      description: message,
    });
  };
  const onFinish = async (values) => {
    try {
      // Gửi thông tin đăng nhập tới API
      const response = await http.post(pathApi.login, values);
      console.log("Login success:", response.data);
      dispatch(setIsAuthenticated(true));
      navigate("/profile");
    } catch (error) {
      console.error("Login error:", error);
      openNotificationWithIcon(error.response?.data?.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const contextValue = useMemo(
    () => ({
      name: "Ant Design",
    }),
    []
  );
  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <div>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 20,
          }}
          style={{
            maxWidth: 900,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Tên đăng nhập"
            name="userName"
            validateTrigger="onBlur"
            rules={[
              {
                validator: (_, value) => {
                  if (!value) {
                    // Lỗi: Trường này là bắt buộc
                    return Promise.reject("Vui lòng nhập tên đăng nhập!");
                  }
                  // Thành công: Không có lỗi
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Tên đăng nhập"
              prefix={<UserOutlined />}
            />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            validateTrigger="onBlur"
            rules={[
              {
                validator: (_, value) => {
                  if (!value) {
                    return Promise.resolve();
                  }

                  // Kiểm tra regex
                  if (
                    !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                      value
                    )
                  ) {
                    return Promise.reject(
                      "Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ cái, số và ký tự đặc biệt"
                    );
                  }

                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Mật khẩu"
              prefix={<LockOutlined />}
            />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" className="w-full">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Context.Provider>
  );
}

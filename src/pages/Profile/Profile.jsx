import { useEffect } from "react";
import pathApi from "../../constants/pathApi";
import http from "../../utils/http";

export default function Profile() {
  const onFinish = async () => {
    try {
      // Gửi thông tin đăng nhập tới API
      const response = await http.get(pathApi.profile);
      console.log("Login success:", response.data);
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  console.log("Profile", onFinish);
  useEffect(() => {
    onFinish();
  }, []);
  return <div>Profile</div>;
}

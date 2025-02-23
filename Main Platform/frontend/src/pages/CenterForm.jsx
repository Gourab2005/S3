import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";

const CenterForm = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    await axios.post("http://localhost:5000/api/school/centers", values);
    setLoading(false);
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item name="name" label="Center Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={loading}>Submit</Button>
    </Form>
  );
};

export default CenterForm;

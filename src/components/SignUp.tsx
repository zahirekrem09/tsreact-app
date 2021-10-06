import { useState } from "react";
import { Form, Input, message, Button } from "antd";

import { useHistory } from "react-router";
import api from "../utils/api";

const SignUp = () => {
    const [loading, setLoading] = useState(false);
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const validateMessages = {
        required: "${label} is required!",
        types: {
            email: "${label} is not a valid email!",
            number: "${label} is not a valid number!",
        },
        number: {
            range: "${label} must be between ${min} and ${max}",
        },
    };

    const history = useHistory();

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            const response = await api().post("/users/register", values);
            message.success(response.data.message);
            history.push("/login", { newSignUp: true });
        } catch (error) {
            message.error((error as any).response.data.errorMessage);
        } finally {
            setLoading(false);
        }
    };
    return (
        <Form
            {...layout}
            name="signUp"
            onFinish={onFinish}
            validateMessages={validateMessages}
            layout="horizontal"
        >
            <Form.Item
                name="username"
                label="User
      Name"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="email"
                label="Email"
                rules={[{ type: "email", required: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="full_name"
                label="Full Name"
                rules={[{ required: true }]}
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
                        min: 6,
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default SignUp;

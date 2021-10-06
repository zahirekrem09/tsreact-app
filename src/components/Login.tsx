import { Form, Input, Button, message, notification } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { AppState } from "../store";
import { login } from "../store/action/userActions";
import { LoginForm } from "../types/user";

const Login = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(
        (state: AppState) => state.user,
    );
    const location = useLocation<{ newSignUp?: boolean }>();
    const onFinish = async (values: LoginForm) => {
        dispatch(login(values));
    };

    // Error Handling
    useEffect(() => {
        error && message.error(error);
    }, [error]);

    // Success Handling
    useEffect(() => {
        if (data.token) {
            message.success(data.message);
            history.push("/");
        }
    }, [data]);
    // const onFinish = async (values: any) => {
    //   try {
    //     const { data } = await api().post("users/login", values);
    //     message.success(data.message);
    //     history.push("/login");
    //     console.log({ data });
    //   } catch (error) {
    //     message.error((error as any).response.data.errorMessage);
    //   }
    // };

    // const onFinishFailed = (errorInfo: any) => {
    //   console.log("Failed:", errorInfo);
    // };

    useEffect(() => {
        if (location?.state?.newSignUp) {
            notification.success({
                message: "You successfully singup.",
                description: "Please login your credentials.",
            });
        }
    }, [location.state]);

    return (
        <Form
            name="loginForm"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            //onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    { required: true, message: "Please input your username!" },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    { required: true, message: "Please input your password!" },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Login;

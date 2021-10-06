import React, { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu, message } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BranchesOutlined,
  AppstoreOutlined,
  LogoutOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import { isLoggedIn } from "../store/action/userActions";
import "./style.css";

const { Header, Sider, Content, Footer } = Layout;

const AppLayout: FC<any> = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { data, loading, error } = useSelector((state: AppState) => state.user);
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    dispatch(isLoggedIn());
  }, []);
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          style={{ marginTop: "50px" }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/records"]}
          selectedKeys={[pathname]}
        >
          {data.username ? (
            <React.Fragment>
              <Menu.Item key="/records" icon={<AppstoreOutlined />}>
                <Link to="/records">Records</Link>
              </Menu.Item>
              <Menu.Item key="/categories" icon={<BranchesOutlined />}>
                <Link to="/categories">Categories</Link>
              </Menu.Item>
              <Menu.Item key="/logout" icon={<LogoutOutlined />}>
                <Link to="/logout">Logout</Link>
              </Menu.Item>
            </React.Fragment>
          ) : loading ? null : (
            <React.Fragment>
              <Menu.Item key="/login" icon={<LoginOutlined />}>
                <Link to="login">Login</Link>
              </Menu.Item>
              <Menu.Item key="/register" icon={<UserAddOutlined />}>
                <Link to="register">Register</Link>
              </Menu.Item>
            </React.Fragment>
          )}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ paddingRight: 10 }}>
          {collapsed ? (
            <MenuUnfoldOutlined className="trigger" onClick={toggle} />
          ) : (
            <MenuFoldOutlined className="trigger" onClick={toggle} />
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <div className="site-layout-content">{props.children}</div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2021 Created by eco
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;

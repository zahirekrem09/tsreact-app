import { Redirect, Route } from "react-router";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Category from "./components/Category";
import PrivateRoute from "./components/PrivateRoute";
import Records from "./components/Records";
import Logout from "./components/Logout";
import AppLayout from "./components/AppLayout";

function App() {
  return (
    <AppLayout>
      <Route path="/register" component={SignUp} />
      <Route path="/login" component={Login} />
      <PrivateRoute path="/categories" component={Category} />
      <PrivateRoute path="/records" component={Records} />
      <Route path="/logout" component={Logout} />
      <Route
        path="*"
        render={() => {
          const token = localStorage.getItem("token");

          return <Redirect to={token ? "/records" : "/login"} />;
        }}
      />
    </AppLayout>
    // <Layout>
    //   <AppHeader />
    //   <Content
    //     className="site-layout"
    //     style={{ padding: "50px", marginTop: 64 }}
    //   >
    //     <Route path="/register" component={SignUp} />
    //     <Route path="/login" component={Login} />
    //     <PrivateRoute path="/categories" component={Category} />
    //     <PrivateRoute path="/records" component={Records} />
    //     <Route path="/logout" component={Logout} />
    //   </Content>
    //   <Footer style={{ textAlign: "center" }}>
    //     Ant Design ©2018 Created by Ant UED
    //   </Footer>
    // </Layout>
  );
}

export default App;

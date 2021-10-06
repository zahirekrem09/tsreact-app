import { message } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router";
import { AppState } from "../store";
import { logout } from "../store/action/userActions";

function Logout() {
  const { data } = useSelector((state: AppState) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(logout());
    message.success("Logout Successfully");
  }, []);

  if (!data.username) return <Redirect to="/login" />;

  return <></>;
}

export default Logout;

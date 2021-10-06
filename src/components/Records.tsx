import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Table,
  Tag,
  Drawer,
  Form,
  Button,
  Popconfirm,
  Row,
  Input,
  Select,
  Tooltip,
  Space,
  Modal,
  message,
} from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import { getCategories } from "../store/action/categoryActions";
import {
  addRecord,
  deleteRecord,
  getRecords,
  updateRecord,
} from "../store/action/recordActions";
import { CategoryType } from "../types/category";

import { RecordType, RecordForm } from "../types/record";

const emptyForm: RecordForm = {
  title: "",
  amount: 0,
  category_id: 0,
};
type Mode = "new" | "edit" | "delete";

function Records() {
  const { data, loading, error } = useSelector(
    (state: AppState) => state.records
  );

  const { data: categories } = useSelector(
    (state: AppState) => state.categories
  );
  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mode, setMode] = useState<Mode>("new");
  const [form, setForm] = useState<RecordForm>(emptyForm);
  const [updateId, setUpdateId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const showModal = (mode: Mode) => {
    setIsModalVisible(true);
    setMode(mode);
  };
  const confirmDelete = (e: any, id: number) => {
    e.preventDefault();
    setDeleteId(id);
    dispatch(deleteRecord(id));
    message.success("Record deleted successfully");
  };

  const cancelDelete = (e: any) => {
    message.info("Delete cancelled");
  };

  const handleOk = () => {
    if (mode === "new") {
      dispatch(addRecord(form));
      message.success("Record added successfully");
    } else if (mode === "edit" && typeof updateId === "number") {
      dispatch(updateRecord(form, updateId));
      message.success("Record updated successfully");
    }
    //setIsModalVisible(false);
    setMode("new");
    setForm(emptyForm);
    setUpdateId(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setMode("new");
    setForm(emptyForm);
    setUpdateId(null);
    setDeleteId(null);
  };

  // Error Handling
  useEffect(() => {
    error && message.error(error);
  }, [error]);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      ellipsis: true,
      render: (amount: RecordType["amount"], record: RecordType) => {
        return (
          <>
            {Intl.NumberFormat("tr-TR", {
              style: "currency",
              currency: "TRY",
            }).format(amount)}
          </>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      ellipsis: true,
      render: (category: CategoryType, record: RecordType) => {
        return <Tag color={category.color}>{category.name.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Last Update",
      dataIndex: "updatedAt",
      key: "updatedAt",
      ellipsis: true,
      render: (updatedAt: string, record: RecordType) => {
        const updatedAtObj = new Date(updatedAt);
        return (
          <>
            {updatedAtObj.toLocaleDateString()}{" "}
            {updatedAtObj.toLocaleTimeString("tr-TR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "action",
      ellipsis: true,
      render: (text: string, record: RecordType) => {
        const { title, amount } = record;
        const category_id = record.category.id;
        return (
          <Space size="middle">
            <Tooltip title="Edit">
              <Button
                onClick={() => {
                  showModal("edit");
                  setForm({ title, amount, category_id });
                  setUpdateId(record.id);
                }}
                shape="circle"
                icon={
                  <EditOutlined color="#326da8" style={{ color: "#0390fc" }} />
                }
              />
            </Tooltip>
            <Tooltip title="Delete">
              <Popconfirm
                title="Are you sure to delete this task?"
                onConfirm={(event) => confirmDelete(event, record.id)}
                onCancel={cancelDelete}
                okText="Yes"
                cancelText="No"
                placement="top"
              >
                <Button
                  shape="circle"
                  danger
                  icon={
                    <DeleteOutlined
                      color="#a30f25"
                      style={{ color: "#c20808" }}
                    />
                  }
                />
              </Popconfirm>
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getRecords());
    !categories.length && dispatch(getCategories());
  }, []);

  const isFormValid = !(
    !form.title ||
    form.amount === 0 ||
    form.category_id === 0
  );

  return (
    <React.Fragment>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            type="primary"
            onClick={() => showModal("new")}
            icon={<PlusOutlined />}
            shape="round"
            style={{ marginBottom: 16 }}
          >
            New Record
          </Button>
        </div>
        <Modal
          title={mode === "new" ? "Create New Record" : "Update Record"}
          visible={isModalVisible}
          confirmLoading={loading}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{ disabled: !isFormValid }}
        >
          <Form layout="vertical">
            <Form.Item
              label="Title"
              name="title"
              required
              tooltip="This is a required field"
              rules={[
                {
                  required: true,
                  message: "Please input your Title!",
                },
              ]}
            >
              <Input
                name="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </Form.Item>
            <Form.Item
              label="Amount"
              name="amount"
              required
              tooltip="This is a required field"
              rules={[
                {
                  required: true,
                  message: "Please input your Amount",
                },
              ]}
            >
              <Input
                name="amount"
                value={form.amount}
                type="number"
                onChange={(e) =>
                  setForm({ ...form, amount: Number(e.target.value) })
                }
              />
            </Form.Item>
            <Form.Item
              name="category_id"
              label="Category"
              required
              tooltip="This is a required field"
              rules={[
                {
                  required: true,
                  message: "Please input your Category Type",
                },
              ]}
            >
              <Select
                defaultValue={form.category_id}
                value={form.category_id}
                onChange={(category_id) => setForm({ ...form, category_id })}
              >
                <Select.Option value={0} disabled>
                  Select a category
                </Select.Option>
                {categories.map((category) => {
                  return (
                    <Select.Option value={category.id} key={category.id}>
                      {category.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              shape="round"
              loading={loading}
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item> */}
          </Form>
        </Modal>
      </div>
      <Table
        loading={loading}
        columns={columns}
        dataSource={data}
        rowKey="id"
      />
    </React.Fragment>
  );
}

export default Records;

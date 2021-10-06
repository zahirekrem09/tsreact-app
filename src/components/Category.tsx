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
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { SketchPicker } from "react-color";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import {
  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../store/action/categoryActions";
import {
  CategoryDispatch,
  CategoryForm,
  CategoryType,
} from "../types/category";

type Mode = "new" | "edit";

const emptyForm: CategoryForm = {
  name: "",
  type: "expense",
  color: "tomato",
};
const Category = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mode, setMode] = useState<Mode>("new");
  const [form, setForm] = useState<CategoryForm>(emptyForm);
  const [updateId, setUpdateId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const dispatch = useDispatch<CategoryDispatch>();
  const { data, loading, error } = useSelector(
    (state: AppState) => state.categories
  );
  const showModal = (mode: Mode) => {
    setIsModalVisible(true);
    setMode(mode);
  };

  const confirmDelete = (e: any, id: number) => {
    e.preventDefault();
    setDeleteId(id);
    dispatch(deleteCategory(id));
    message.success("Category deleted successfully");
  };

  const cancelDelete = (e: any) => {
    message.info("Delete cancelled");
  };

  const handleOk = () => {
    //api call edit or create
    if (mode === "new") {
      dispatch(addCategory(form));
      message.success("Category added successfully");
    } else if (mode === "edit" && typeof updateId === "number") {
      dispatch(updateCategory(form, updateId));
      message.success("Category updated successfully");
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

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  // Error Handling
  useEffect(() => {
    error && message.error(error);
  }, [error]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
    },
    {
      title: "Type",
      dataIndex: "type",
      ellipsis: true,
      key: "id",
      render: (text: string, category: CategoryType) => {
        return (
          <Tag color={category.color} key={category.id}>
            {text.toUpperCase()}
          </Tag>
        );
      },
    },

    {
      title: "Action",
      dataIndex: "id",
      key: "action",
      ellipsis: true,
      render: (text: string, category: CategoryType) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Button
              onClick={() => {
                showModal("edit");
                setForm(category);
                setUpdateId(category.id);
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
              onConfirm={(event) => confirmDelete(event, category.id)}
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
      ),
    },
  ];
  return (
    <>
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
          New Category
        </Button>
        <Modal
          title={mode === "new" ? "New Category" : "Edit Category"}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          confirmLoading={loading}
          okButtonProps={{ disabled: !form.name }}
        >
          <Form layout="vertical">
            <Form.Item
              label="Category Name"
              required
              tooltip="This is a required field"
              rules={[
                { required: true, message: "Please input your Category Name!" },
              ]}
            >
              <Input
                style={{ width: "100%" }}
                name="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Form.Item>
            <Form.Item
              label="Category Type"
              name="type"
              required
              tooltip="This is a required field"
              rules={[
                { required: true, message: "Please input your Category Type" },
              ]}
            >
              <Select
                defaultValue={(mode === "new" && "expense") || form.type}
                value={form.type}
                onChange={(type) => setForm({ ...form, type })}
              >
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Color"
              name="color"
              required
              tooltip="This is a required field"
              rules={[{ required: true, message: "Please input your Color" }]}
            >
              <SketchPicker
                color={form.color}
                onChange={(color) => setForm({ ...form, color: color.hex })}
              />
            </Form.Item>
            {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              shape="round"
              loading={loading}
              htmlType="submit"
            >
              Button
            </Button>
          </Form.Item> */}
          </Form>
        </Modal>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="id"
      />
    </>
  );
};

export default Category;

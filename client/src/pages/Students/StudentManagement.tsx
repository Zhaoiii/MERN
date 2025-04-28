import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Input,
  Space,
  Modal,
  Form,
  InputNumber,
  message,
  Popconfirm,
} from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { createStudent, getStudents, Student, updateStudent } from "./apis";

const StudentManagement: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [form] = Form.useForm();

  const fetchStudents = async (page?: number, size?: number) => {
    try {
      setLoading(true);
      const response = await getStudents({
        page: page || 1,
        limit: size || 10,
        keyword: searchKeyword,
      });
      setStudents(response?.data?.data?.data ?? []);
      setTotal(response?.data?.data?.total ?? 0);
    } catch (e: unknown) {
      message.error(e as string);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSearch = (value: string) => {
    setSearchKeyword(value);
    setCurrentPage(1);
  };

  const handleAdd = () => {
    setEditingStudent(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: Student) => {
    setEditingStudent(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    console.log(id);
    // try {
    //   await axios.delete(`/api/students/${id}`, {
    //     headers: { Authorization: `Bearer ${token}` },
    //   });
    //   message.success("删除成功");
    //   fetchStudents();
    // } catch (error) {
    //   message.error("删除失败");
    // }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingStudent) {
        await updateStudent(editingStudent._id, values);
        message.success("更新成功");
      } else {
        await createStudent(values);
        message.success("添加成功");
      }
      setIsModalVisible(false);
      fetchStudents();
    } catch (error) {
      message.error(error as string);
    }
  };

  const columns = [
    {
      title: "学号",
      dataIndex: "studentId",
      key: "studentId",
    },
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "年级",
      dataIndex: "grade",
      key: "grade",
    },
    {
      title: "专业",
      dataIndex: "major",
      key: "major",
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "电话",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "操作",
      key: "action",
      render: (_: unknown, record: Student) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这条记录吗？"
            onConfirm={() => handleDelete(record._id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 16 }}>
        <Space>
          <Input
            placeholder="搜索学生"
            allowClear
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 200 }}
            prefix={<SearchOutlined />}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            添加学生
          </Button>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={students}
        rowKey="_id"
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: total,
          onChange: (page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize);
            fetchStudents(page, pageSize);
          },
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条记录`,
        }}
      />

      <Modal
        title={editingStudent ? "编辑学生" : "添加学生"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={editingStudent || {}}
        >
          <Form.Item
            name="studentId"
            label="学号"
            rules={[{ required: true, message: "请输入学号" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="姓名"
            rules={[{ required: true, message: "请输入姓名" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="age"
            label="年龄"
            rules={[{ required: true, message: "请输入年龄" }]}
          >
            <InputNumber min={0} max={150} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="grade"
            label="年级"
            rules={[{ required: true, message: "请输入年级" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="major"
            label="专业"
            rules={[{ required: true, message: "请输入专业" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: "请输入邮箱" },
              { type: "email", message: "请输入有效的邮箱地址" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="电话"
            rules={[
              { required: true, message: "请输入电话" },
              {
                pattern: /^\d{11}$/,
                message: "请输入有效的11位手机号码",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StudentManagement;

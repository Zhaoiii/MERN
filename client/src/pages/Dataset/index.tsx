import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Space,
  Popconfirm,
  TableProps,
} from "antd";
import {
  getDatasets,
  createDataset,
  updateDataset,
  deleteDataset,
  Dataset,
} from "../../services/dataset";
import {
  PaginationParams,
  BaseResponse,
  PaginatedResponse,
} from "../../utils/request";

const DatasetManagement: React.FC = () => {
  const [data, setData] = useState<Dataset[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchData = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const response = await getDatasets({
        page,
        limit: pageSize,
      });
      const responseData = response.data;
      if (responseData && Array.isArray(responseData.data)) {
        setData(responseData.data);
        setPagination({
          current: page,
          pageSize,
          total: responseData.total || 0,
        });
      } else {
        setData([]);
        setPagination({
          current: page,
          pageSize,
          total: 0,
        });
        message.error("获取数据集列表失败");
      }
    } catch (error) {
      setData([]);
      setPagination({
        current: page,
        pageSize,
        total: 0,
      });
      message.error("获取数据集列表失败");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTableChange: TableProps<Dataset>["onChange"] = (pagination) => {
    if (pagination) {
      fetchData(pagination.current || 1, pagination.pageSize || 10);
    }
  };

  const showModal = (record?: Dataset) => {
    if (record) {
      setEditingId(record._id);
      form.setFieldsValue(record);
    } else {
      setEditingId(null);
      form.resetFields();
    }
    setModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingId) {
        await updateDataset(editingId, values);
        message.success("更新成功");
      } else {
        await createDataset(values);
        message.success("创建成功");
      }
      setModalVisible(false);
      fetchData(pagination.current, pagination.pageSize);
    } catch (error) {
      message.error("操作失败");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDataset(id);
      message.success("删除成功");
      fetchData(pagination.current, pagination.pageSize);
    } catch (error) {
      message.error("删除失败");
    }
  };

  const columns = [
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: "操作",
      key: "action",
      render: (_: unknown, record: Dataset) => (
        <Space size="middle">
          <Button type="link" onClick={() => showModal(record)}>
            编辑
          </Button>
          <Popconfirm
            title="确定要删除吗？"
            onConfirm={() => handleDelete(record._id)}
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
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => showModal()}>
          新建数据集
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="_id"
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
      />
      <Modal
        title={editingId ? "编辑数据集" : "新建数据集"}
        open={modalVisible}
        onOk={handleOk}
        onCancel={() => setModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="名称"
            rules={[{ required: true, message: "请输入名称" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DatasetManagement;

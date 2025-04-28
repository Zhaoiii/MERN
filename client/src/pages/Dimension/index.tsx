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
  Select,
  TableProps,
} from "antd";
import {
  getDimensions,
  createDimension,
  updateDimension,
  deleteDimension,
  getDatasets,
  Dimension,
  Dataset,
} from "../../services/dataset";
import {
  PaginationParams,
  BaseResponse,
  PaginatedResponse,
} from "../../utils/request";

const DimensionManagement: React.FC = () => {
  const [data, setData] = useState<Dimension[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchDatasets = async () => {
    try {
      const response = await getDatasets({ page: 1, limit: 1000 });
      console.log("Datasets response:", response);
      if (response && response.data && Array.isArray(response.data)) {
        setDatasets(response.data);
      } else {
        console.error("Invalid datasets response:", response);
        setDatasets([]);
        message.error("获取数据集列表失败");
      }
    } catch (error) {
      console.error("Error fetching datasets:", error);
      setDatasets([]);
      message.error("获取数据集列表失败");
    }
  };

  const fetchData = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const response = await getDimensions({
        page,
        limit: pageSize,
      });
      console.log("Dimensions response:", response);
      if (response && response.data && Array.isArray(response.data)) {
        setData(response.data);
        setPagination({
          current: page,
          pageSize,
          total: response.total || 0,
        });
      } else {
        console.error("Invalid dimensions response:", response);
        setData([]);
        setPagination({
          current: page,
          pageSize,
          total: 0,
        });
        message.error("获取维度列表失败");
      }
    } catch (error) {
      console.error("Error fetching dimensions:", error);
      setData([]);
      setPagination({
        current: page,
        pageSize,
        total: 0,
      });
      message.error("获取维度列表失败");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    fetchDatasets();
  }, []);

  const handleTableChange: TableProps<Dimension>["onChange"] = (pagination) => {
    if (pagination) {
      fetchData(pagination.current || 1, pagination.pageSize || 10);
    }
  };

  const showModal = (record?: Dimension) => {
    if (record) {
      setEditingId(record._id);
      form.setFieldsValue({
        name: record.name,
        dataset: record.dataset._id,
      });
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
        await updateDimension(editingId, values);
        message.success("更新成功");
      } else {
        await createDimension(values);
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
      await deleteDimension(id);
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
      title: "所属数据集",
      dataIndex: ["dataset", "name"],
      key: "dataset",
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
      render: (_: unknown, record: Dimension) => (
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
          新建维度
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
        title={editingId ? "编辑维度" : "新建维度"}
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
          <Form.Item
            name="dataset"
            label="所属数据集"
            rules={[{ required: true, message: "请选择所属数据集" }]}
          >
            <Select>
              {Array.isArray(datasets) &&
                datasets.map((dataset) => (
                  <Select.Option key={dataset._id} value={dataset._id}>
                    {dataset.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DimensionManagement;

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
} from "antd";
import {
  getRules,
  createRule,
  updateRule,
  deleteRule,
  getDatasets,
  getDimensions,
} from "../../services/dataset";

const RuleManagement: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [datasets, setDatasets] = useState<any[]>([]);
  const [dimensions, setDimensions] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchDatasets = async () => {
    try {
      const response = await getDatasets({ page: 1, limit: 1000 });
      setDatasets(response.data.data);
    } catch (error) {
      message.error("获取数据集列表失败");
    }
  };

  const fetchDimensions = async (datasetId?: string) => {
    try {
      const response = await getDimensions({
        page: 1,
        limit: 1000,
        dataset: datasetId,
      });
      setDimensions(response.data.data);
    } catch (error) {
      message.error("获取维度列表失败");
    }
  };

  const fetchData = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const response = await getRules({
        page,
        limit: pageSize,
      });
      setData(response.data.data);
      setPagination({
        current: page,
        pageSize,
        total: response.data.total,
      });
    } catch (error) {
      message.error("获取条例列表失败");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    fetchDatasets();
  }, []);

  const handleTableChange = (pagination: any) => {
    fetchData(pagination.current, pagination.pageSize);
  };

  const showModal = (record?: any) => {
    if (record) {
      setEditingId(record._id);
      form.setFieldsValue({
        content: record.content,
        dataset: record.dataset._id,
        dimension: record.dimension._id,
      });
      fetchDimensions(record.dataset._id);
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
        await updateRule(editingId, values);
        message.success("更新成功");
      } else {
        await createRule(values);
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
      await deleteRule(id);
      message.success("删除成功");
      fetchData(pagination.current, pagination.pageSize);
    } catch (error) {
      message.error("删除失败");
    }
  };

  const handleDatasetChange = (value: string) => {
    form.setFieldValue("dimension", undefined);
    fetchDimensions(value);
  };

  const columns = [
    {
      title: "条例内容",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "所属数据集",
      dataIndex: ["dataset", "name"],
      key: "dataset",
    },
    {
      title: "所属维度",
      dataIndex: ["dimension", "name"],
      key: "dimension",
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
      render: (_: any, record: any) => (
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
          新建条例
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
        title={editingId ? "编辑条例" : "新建条例"}
        open={modalVisible}
        onOk={handleOk}
        onCancel={() => setModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="content"
            label="条例内容"
            rules={[{ required: true, message: "请输入条例内容" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="dataset"
            label="所属数据集"
            rules={[{ required: true, message: "请选择所属数据集" }]}
          >
            <Select onChange={handleDatasetChange}>
              {datasets.map((dataset) => (
                <Select.Option key={dataset._id} value={dataset._id}>
                  {dataset.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="dimension"
            label="所属维度"
            rules={[{ required: true, message: "请选择所属维度" }]}
          >
            <Select>
              {dimensions.map((dimension) => (
                <Select.Option key={dimension._id} value={dimension._id}>
                  {dimension.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RuleManagement;

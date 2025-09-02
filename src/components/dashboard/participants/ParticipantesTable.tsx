import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Tag,
  Button,
  Space,
  Typography,
  Modal,
  Form,
  Input,
  Select,
  Switch,
  Descriptions,
  Spin,
  Empty,
  message,
  Row,
  Col,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { eventosService } from "../../../services/eventos";
import type { Participante, Equipo } from "../../../services/eventos";

const { Text } = Typography;

const ParticipantesTable: React.FC = () => {
  const [participantes, setParticipantes] = useState<
    (Participante & { equipo: Equipo })[]
  >([]);
  const [loading, setLoading] = useState(true);

  // Estados para el detalle del participante
  const [participanteDetail, setParticipanteDetail] = useState<
    (Participante & { equipo: Equipo }) | null
  >(null);
  const [participanteDetailVisible, setParticipanteDetailVisible] =
    useState(false);
  const [participanteDetailLoading, setParticipanteDetailLoading] =
    useState(false);

  // Estados para editar participante
  const [editParticipanteModalVisible, setEditParticipanteModalVisible] =
    useState(false);
  const [editParticipanteForm] = Form.useForm();
  const [updatingParticipante, setUpdatingParticipante] = useState(false);
  const [selectedParticipante, setSelectedParticipante] =
    useState<Participante | null>(null);

  useEffect(() => {
    loadParticipantes();
  }, []);

  const loadParticipantes = async () => {
    try {
      setLoading(true);
      const response = await eventosService.listParticipantes();
      setParticipantes(response.data);
    } catch (error: any) {
      console.error("Error loading participantes:", error);
      message.error(
        error?.message || "No se pudo cargar la lista de participantes"
      );
    } finally {
      setLoading(false);
    }
  };

  // Funciones para manejar participantes
  const handleViewParticipante = async (participante: Participante) => {
    try {
      setParticipanteDetailLoading(true);
      const response = await eventosService.getParticipanteDetail(
        participante.id
      );
      setParticipanteDetail(response.data);
      setParticipanteDetailVisible(true);
    } catch (error: any) {
      message.error(
        error?.message || "No se pudo cargar el detalle del participante"
      );
    } finally {
      setParticipanteDetailLoading(false);
    }
  };

  const handleEditParticipante = (participante: Participante) => {
    setSelectedParticipante(participante);
    editParticipanteForm.setFieldsValue({
      nombre_participante: participante.nombre_participante,
      rol_participante: participante.rol_participante,
      talla_participante: participante.talla_participante,
      telefono_participante: participante.telefono_participante,
      matricula_participante: participante.matricula_participante,
      correo_participante: participante.correo_participante,
      plantel_participante: participante.plantel_participante,
      plantelcct: participante.plantelcct,
      medicamentos: participante.medicamentos,
      semestre_participante: participante.semestre_participante,
      especialidad_participante: participante.especialidad_participante,
      seguro_facultativo: participante.seguro_facultativo,
      tipo_sangre_participante: participante.tipo_sangre_participante,
      alergico: participante.alergico,
      alergias: participante.alergias,
    });
    setEditParticipanteModalVisible(true);
  };

  const handleUpdateParticipante = async (values: any) => {
    if (!selectedParticipante) return;

    setUpdatingParticipante(true);
    try {
      await eventosService.updateParticipante(selectedParticipante.id, values);
      setEditParticipanteModalVisible(false);
      message.success("Participante actualizado exitosamente");
      // Recargar la lista de participantes
      loadParticipantes();
    } catch (err: any) {
      message.error(err?.message || "No se pudo actualizar el participante");
    } finally {
      setUpdatingParticipante(false);
    }
  };

  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre_participante",
      key: "nombre_participante",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Rol",
      dataIndex: "rol_participante",
      key: "rol_participante",
    },
    {
      title: "Matrícula",
      dataIndex: "matricula_participante",
      key: "matricula_participante",
    },
    {
      title: "Correo",
      dataIndex: "correo_participante",
      key: "correo_participante",
      render: (text: string) => <a href={`mailto:${text}`}>{text}</a>,
    },
    {
      title: "Teléfono",
      dataIndex: "telefono_participante",
      key: "telefono_participante",
    },
    {
      title: "Plantel",
      dataIndex: "plantel_participante",
      key: "plantel_participante",
    },
    {
      title: "Especialidad",
      dataIndex: "especialidad_participante",
      key: "especialidad_participante",
    },
    {
      title: "Semestre",
      dataIndex: "semestre_participante",
      key: "semestre_participante",
    },
    {
      title: "Tipo Sangre",
      dataIndex: "tipo_sangre_participante",
      key: "tipo_sangre_participante",
    },
    {
      title: "Alérgico",
      dataIndex: "alergico",
      key: "alergico",
      render: (value: boolean) => (
        <Tag color={value ? "error" : "success"}>{value ? "Sí" : "No"}</Tag>
      ),
    },
    {
      title: "Equipo",
      dataIndex: ["equipo", "nombre_equipo"],
      key: "equipo",
      render: (text: string, record: any) => (
        <Space>
          <EnvironmentOutlined />
          <Text>{record.equipo?.nombre_equipo || "Sin equipo"}</Text>
        </Space>
      ),
    },
    {
      title: "Acciones",
      key: "actions",
      render: (_: any, record: Participante) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleViewParticipante(record)}
            title="Ver detalle"
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEditParticipante(record)}
            title="Editar"
          />
        </Space>
      ),
    },
  ];

  return (
    <Card title="Gestión de Participantes" className="content-card">
      <Table
        dataSource={participantes}
        columns={columns}
        rowKey="id"
        size="middle"
        loading={loading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} de ${total} participantes`,
        }}
        scroll={{ x: 1500 }}
      />

      {/* Modal de detalle del participante */}
      <Modal
        title="Detalle del Participante"
        open={participanteDetailVisible}
        onCancel={() => setParticipanteDetailVisible(false)}
        footer={[
          <Button
            key="close"
            onClick={() => setParticipanteDetailVisible(false)}
          >
            Cerrar
          </Button>,
        ]}
        width={800}
      >
        {participanteDetailLoading ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <Spin size="large" />
            <Text style={{ display: "block", marginTop: "16px" }}>
              Cargando información del participante...
            </Text>
          </div>
        ) : participanteDetail ? (
          <div>
            <Descriptions bordered column={2} size="middle">
              <Descriptions.Item label="Nombre" span={2}>
                <Text strong style={{ fontSize: "16px" }}>
                  {participanteDetail.nombre_participante}
                </Text>
              </Descriptions.Item>

              <Descriptions.Item label="Rol">
                <Text>{participanteDetail.rol_participante}</Text>
              </Descriptions.Item>

              <Descriptions.Item label="Matrícula">
                <Text>{participanteDetail.matricula_participante}</Text>
              </Descriptions.Item>

              <Descriptions.Item label="Correo">
                <a href={`mailto:${participanteDetail.correo_participante}`}>
                  {participanteDetail.correo_participante}
                </a>
              </Descriptions.Item>

              <Descriptions.Item label="Teléfono">
                <Text>{participanteDetail.telefono_participante}</Text>
              </Descriptions.Item>

              <Descriptions.Item label="Plantel">
                <Text>{participanteDetail.plantel_participante}</Text>
              </Descriptions.Item>

              <Descriptions.Item label="CCT">
                <Text>{participanteDetail.plantelcct}</Text>
              </Descriptions.Item>

              <Descriptions.Item label="Especialidad">
                <Text>{participanteDetail.especialidad_participante}</Text>
              </Descriptions.Item>

              <Descriptions.Item label="Semestre">
                <Text>{participanteDetail.semestre_participante}</Text>
              </Descriptions.Item>

              <Descriptions.Item label="Talla">
                <Text>{participanteDetail.talla_participante}</Text>
              </Descriptions.Item>

              <Descriptions.Item label="Tipo de Sangre">
                <Text>{participanteDetail.tipo_sangre_participante}</Text>
              </Descriptions.Item>

              <Descriptions.Item label="Seguro Facultativo">
                <Tag
                  color={
                    participanteDetail.seguro_facultativo
                      ? "success"
                      : "default"
                  }
                >
                  {participanteDetail.seguro_facultativo ? "Sí" : "No"}
                </Tag>
              </Descriptions.Item>

              <Descriptions.Item label="Alérgico">
                <Tag color={participanteDetail.alergico ? "error" : "success"}>
                  {participanteDetail.alergico ? "Sí" : "No"}
                </Tag>
              </Descriptions.Item>

              {participanteDetail.alergico && (
                <Descriptions.Item label="Alergias" span={2}>
                  <Text>
                    {participanteDetail.alergias || "No especificadas"}
                  </Text>
                </Descriptions.Item>
              )}

              <Descriptions.Item label="Medicamentos" span={2}>
                <Text>{participanteDetail.medicamentos || "Ninguno"}</Text>
              </Descriptions.Item>

              <Descriptions.Item label="Foto Credencial">
                <Text>{participanteDetail.foto_credencial}</Text>
              </Descriptions.Item>

              <Descriptions.Item label="Equipo">
                <Text strong>{participanteDetail.equipo?.nombre_equipo}</Text>
              </Descriptions.Item>
            </Descriptions>
          </div>
        ) : (
          <Empty description="No se encontró la información del participante" />
        )}
      </Modal>

      {/* Modal de edición del participante */}
      <Modal
        title="Editar Participante"
        open={editParticipanteModalVisible}
        onCancel={() => setEditParticipanteModalVisible(false)}
        footer={null}
        width={800}
      >
        <Form
          form={editParticipanteForm}
          layout="vertical"
          onFinish={handleUpdateParticipante}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="nombre_participante"
                label="Nombre del Participante"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa el nombre del participante",
                  },
                ]}
              >
                <Input placeholder="Nombre del participante" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="rol_participante"
                label="Rol"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa el rol",
                  },
                ]}
              >
                <Input placeholder="Rol del participante" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="matricula_participante"
                label="Matrícula"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa la matrícula",
                  },
                ]}
              >
                <Input placeholder="Matrícula" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="correo_participante"
                label="Correo"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa el correo",
                  },
                  {
                    type: "email",
                    message: "Por favor ingresa un correo válido",
                  },
                ]}
              >
                <Input placeholder="Correo electrónico" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="telefono_participante"
                label="Teléfono"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa el teléfono",
                  },
                ]}
              >
                <Input placeholder="Teléfono" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="talla_participante"
                label="Talla"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa la talla",
                  },
                ]}
              >
                <Select placeholder="Selecciona la talla">
                  <Select.Option value="XS">XS</Select.Option>
                  <Select.Option value="S">S</Select.Option>
                  <Select.Option value="M">M</Select.Option>
                  <Select.Option value="L">L</Select.Option>
                  <Select.Option value="XL">XL</Select.Option>
                  <Select.Option value="XXL">XXL</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="plantel_participante"
                label="Plantel"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa el plantel",
                  },
                ]}
              >
                <Input placeholder="Plantel" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="plantelcct"
                label="CCT"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa el CCT",
                  },
                ]}
              >
                <Input placeholder="CCT del plantel" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="especialidad_participante"
                label="Especialidad"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa la especialidad",
                  },
                ]}
              >
                <Input placeholder="Especialidad" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="semestre_participante"
                label="Semestre"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa el semestre",
                  },
                ]}
              >
                <Input placeholder="Semestre" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="tipo_sangre_participante"
                label="Tipo de Sangre"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa el tipo de sangre",
                  },
                ]}
              >
                <Select placeholder="Selecciona el tipo de sangre">
                  <Select.Option value="A+">A+</Select.Option>
                  <Select.Option value="A-">A-</Select.Option>
                  <Select.Option value="B+">B+</Select.Option>
                  <Select.Option value="B-">B-</Select.Option>
                  <Select.Option value="AB+">AB+</Select.Option>
                  <Select.Option value="AB-">AB-</Select.Option>
                  <Select.Option value="O+">O+</Select.Option>
                  <Select.Option value="O-">O-</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="medicamentos" label="Medicamentos">
                <Input placeholder="Medicamentos (opcional)" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="seguro_facultativo"
                label="Seguro Facultativo"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="alergico"
                label="Alérgico"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="alergias" label="Alergias">
            <Input.TextArea
              placeholder="Especifica las alergias (si aplica)"
              rows={3}
            />
          </Form.Item>

          <Form.Item style={{ marginTop: 24, textAlign: "right" }}>
            <Space>
              <Button onClick={() => setEditParticipanteModalVisible(false)}>
                Cancelar
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={updatingParticipante}
              >
                {updatingParticipante
                  ? "Actualizando..."
                  : "Actualizar Participante"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default ParticipantesTable;

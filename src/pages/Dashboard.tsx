import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Statistic,
  Progress,
  Table,
  Tag,
  Avatar,
  List,
  Typography,
  Space,
  Button,
  Calendar,
  Badge,
  Layout,
  Menu,
  Drawer,
  Select,
  Descriptions,
  Spin,
  Empty,
  message,
  Modal,
  Form,
  Input,
  DatePicker,
  InputNumber,
  Button as AntButton,
  Switch,
  Breadcrumb,
  Divider,
} from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  DollarOutlined,
  TrophyOutlined,
  RiseOutlined,
  FallOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuOutlined,
  EyeOutlined,
  EditOutlined,
  EnvironmentOutlined,
  HeartOutlined,
  SafetyOutlined,
  AlertOutlined,
  BarChartOutlined,
  HomeOutlined,
  RightOutlined,
} from "@ant-design/icons";
import "./Dashboard.css";
import { eventosService } from "../services/eventos";
import type { Evento, Equipo, Participante } from "../services/eventos";
import dayjs from "dayjs";
import EquiposTable from "../components/EquiposTable";
import EquipoDetalle from "./EquipoDetalle";
import UsuariosTable from "../components/UsuariosTable";

const EventSelector: React.FC = () => {
  const [loadingList, setLoadingList] = useState(false);
  const [events, setEvents] = useState<Evento[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [detail, setDetail] = useState<Evento | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editForm] = Form.useForm();
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoadingList(true);
        const res = await eventosService.listEvents();
        setEvents(res.data || []);
      } catch (err: any) {
        message.error(err?.message || "No se pudo cargar la lista de eventos");
      } finally {
        setLoadingList(false);
      }
    };
    loadEvents();
  }, []);

  const handleSelect = async (value: number) => {
    setSelectedId(value);
    setLoadingDetail(true);
    try {
      const res = await eventosService.getEventDetail(value);
      setDetail(res.data);
    } catch (err: any) {
      message.error(err?.message || "No se pudo cargar el detalle del evento");
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleEdit = () => {
    if (detail) {
      editForm.setFieldsValue({
        nombre_evento: detail.nombre_evento,
        sede_evento: detail.sede_evento,
        inicio_evento: detail.inicio_evento
          ? dayjs(detail.inicio_evento)
          : null,
        fin_evento: detail.fin_evento ? dayjs(detail.fin_evento) : null,
        lim_de_participantes_evento: detail.lim_de_participantes_evento,
        estatus_evento: detail.estatus_evento,
      });
      setEditModalVisible(true);
    }
  };

  const handleUpdate = async (values: any) => {
    if (!detail) return;

    setUpdating(true);
    try {
      const updateData = {
        ...values,
        inicio_evento: values.inicio_evento?.toISOString(),
        fin_evento: values.fin_evento?.toISOString(),
      };

      const res = await eventosService.updateEvent(detail.id, updateData);
      setDetail(res.data);
      setEditModalVisible(false);
      message.success("Evento actualizado exitosamente");

      // Actualizar la lista de eventos
      const updatedEvents = events.map((ev) =>
        ev.id === detail.id ? res.data : ev
      );
      setEvents(updatedEvents);
    } catch (err: any) {
      message.error(err?.message || "No se pudo actualizar el evento");
    } finally {
      setUpdating(false);
    }
  };

  const formatDateTime = (iso?: string) =>
    iso ? new Date(iso).toLocaleString() : "-";

  const equiposColumns = [
    {
      title: "Equipo",
      dataIndex: "nombre_equipo",
      key: "nombre_equipo",
      render: (text: string) => (
        <Space>
          <Avatar icon={<TeamOutlined />} />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: "Entidad",
      dataIndex: "entidad_federativa",
      key: "entidad_federativa",
    },
    {
      title: "Anfitrión",
      dataIndex: "nombre_anfitrion",
      key: "nombre_anfitrion",
    },
    {
      title: "Teléfono",
      dataIndex: "telefono_anfitrion",
      key: "telefono_anfitrion",
    },
    {
      title: "Correo",
      dataIndex: "correo_anfitrion",
      key: "correo_anfitrion",
      render: (value: string) => <a href={`mailto:${value}`}>{value}</a>,
    },
    {
      title: "Estatus",
      dataIndex: "estatus_del_equipo",
      key: "estatus_del_equipo",
      render: (status: string) => (
        <Tag color={status === "activo" ? "success" : "default"}>{status}</Tag>
      ),
    },
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card>
        <Space direction="vertical" style={{ width: "100%" }} size="small">
          <Text strong>Selecciona un evento</Text>
          <Spin spinning={loadingList}>
            <Select
              showSearch
              placeholder="Buscar y seleccionar evento"
              style={{ width: "100%" }}
              optionFilterProp="label"
              value={selectedId ?? undefined}
              onChange={handleSelect}
              options={events.map((ev) => ({
                value: ev.id,
                label: ev.nombre_evento,
              }))}
            />
          </Spin>
        </Space>
      </Card>

      <Card
        title="Detalle del Evento"
        loading={loadingDetail}
        extra={
          detail && (
            <AntButton type="primary" onClick={handleEdit}>
              Editar Evento
            </AntButton>
          )
        }
      >
        {!detail ? (
          <Empty description="Selecciona un evento para ver su detalle" />
        ) : (
          <Descriptions bordered column={1} size="middle">
            <Descriptions.Item label="Nombre">
              <Text strong>{detail.nombre_evento}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Sede">
              {detail.sede_evento}
            </Descriptions.Item>
            <Descriptions.Item label="Estatus">
              <Tag
                color={
                  detail.estatus_evento === "activo" ? "success" : "default"
                }
              >
                {detail.estatus_evento}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Inicio">
              {formatDateTime(detail.inicio_evento)}
            </Descriptions.Item>
            <Descriptions.Item label="Fin">
              {formatDateTime(detail.fin_evento)}
            </Descriptions.Item>
            <Descriptions.Item label="Límite de participantes">
              {detail.lim_de_participantes_evento}
            </Descriptions.Item>
            <Descriptions.Item label="Equipos registrados">
              {detail.equipos?.length ?? 0}
            </Descriptions.Item>
            <Descriptions.Item label="Creado">
              {formatDateTime(detail.created_at)}
            </Descriptions.Item>
            <Descriptions.Item label="Actualizado">
              {formatDateTime(detail.updated_at)}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Card>

      <Card title={`Equipos (${detail?.equipos?.length ?? 0})`}>
        {!detail || (detail.equipos?.length ?? 0) === 0 ? (
          <Empty description="Sin equipos registrados" />
        ) : (
          <Table<Equipo>
            columns={equiposColumns as any}
            dataSource={detail.equipos}
            rowKey="id"
            pagination={{ pageSize: 5 }}
            scroll={{ x: 800 }}
          />
        )}
      </Card>

      {/* Modal de edición */}
      <Modal
        title="Editar Evento"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={editForm}
          layout="vertical"
          onFinish={handleUpdate}
          initialValues={{
            estatus_evento: "activo",
          }}
        >
          <Form.Item
            name="nombre_evento"
            label="Nombre del Evento"
            rules={[
              {
                required: true,
                message: "Por favor ingresa el nombre del evento",
              },
              {
                max: 255,
                message: "El nombre no puede exceder 255 caracteres",
              },
            ]}
          >
            <Input placeholder="Nombre del evento" />
          </Form.Item>

          <Form.Item
            name="sede_evento"
            label="Sede del Evento"
            rules={[
              {
                required: true,
                message: "Por favor ingresa la sede del evento",
              },
              { max: 255, message: "La sede no puede exceder 255 caracteres" },
            ]}
          >
            <Input placeholder="Sede del evento" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="inicio_evento"
                label="Fecha de Inicio"
                rules={[
                  {
                    required: true,
                    message: "Por favor selecciona la fecha de inicio",
                  },
                ]}
              >
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  style={{ width: "100%" }}
                  placeholder="Fecha de inicio"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="fin_evento"
                label="Fecha de Fin"
                rules={[
                  {
                    required: true,
                    message: "Por favor selecciona la fecha de fin",
                  },
                ]}
              >
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  style={{ width: "100%" }}
                  placeholder="Fecha de fin"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="lim_de_participantes_evento"
                label="Límite de Participantes"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa el límite de participantes",
                  },
                  {
                    type: "number",
                    min: 1,
                    message: "El límite debe ser mayor a 0",
                  },
                ]}
              >
                <InputNumber
                  min={1}
                  style={{ width: "100%" }}
                  placeholder="Límite de participantes"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="estatus_evento"
                label="Estatus del Evento"
                rules={[
                  {
                    required: true,
                    message: "Por favor selecciona el estatus",
                  },
                ]}
              >
                <Select placeholder="Selecciona el estatus">
                  <Select.Option value="activo">Activo</Select.Option>
                  <Select.Option value="inactivo">Inactivo</Select.Option>
                  <Select.Option value="cancelado">Cancelado</Select.Option>
                  <Select.Option value="finalizado">Finalizado</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ marginTop: 24, textAlign: "right" }}>
            <Space>
              <AntButton onClick={() => setEditModalVisible(false)}>
                Cancelar
              </AntButton>
              <AntButton type="primary" htmlType="submit" loading={updating}>
                {updating ? "Actualizando..." : "Actualizar Evento"}
              </AntButton>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  );
};

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

const { Title, Text } = Typography;

// Componente de Breadcrumb personalizado
const DashboardBreadcrumb: React.FC<{
  selectedKey: string;
  equipoName?: string;
}> = ({ selectedKey, equipoName }) => {
  const navigate = useNavigate();

  const getBreadcrumbItems = () => {
    const items = [
      {
        title: (
          <Button
            type="link"
            icon={<HomeOutlined />}
            onClick={() => navigate("/dashboard")}
            style={{ padding: 0, height: "auto" }}
          >
            Dashboard
          </Button>
        ),
      },
    ];

    switch (selectedKey) {
      case "dashboard":
        return items;
      case "events":
        items.push({
          title: (
            <Space>
              <CalendarOutlined />
              <Text strong>Gestión de Eventos</Text>
            </Space>
          ),
        });
        break;
      case "equipos-list":
        items.push({
          title: (
            <Space>
              <TeamOutlined />
              <Text strong>Equipos</Text>
            </Space>
          ),
        });
        items.push({
          title: (
            <Space>
              <TeamOutlined />
              <Text strong>Lista de Equipos</Text>
            </Space>
          ),
        });
        break;
      case "equipos":
        items.push({
          title: (
            <Space>
              <TeamOutlined />
              <Text strong>Equipos</Text>
            </Space>
          ),
        });
        break;
      case "equipo-detalle":
        items.push(
          {
            title: (
              <Button
                type="link"
                icon={<TeamOutlined />}
                onClick={() => navigate("/dashboard?tab=equipos-list")}
                style={{ padding: 0, height: "auto" }}
              >
                Equipos
              </Button>
            ),
          },
          {
            title: (
              <Button
                type="link"
                icon={<TeamOutlined />}
                onClick={() => navigate("/dashboard?tab=equipos-list")}
                style={{ padding: 0, height: "auto" }}
              >
                Lista de Equipos
              </Button>
            ),
          },
          {
            title: (
              <Space>
                <EyeOutlined />
                <Text strong>{equipoName || "Detalle del Equipo"}</Text>
              </Space>
            ),
          }
        );
        break;
      case "participants":
        items.push(
          {
            title: (
              <Button
                type="link"
                icon={<TeamOutlined />}
                onClick={() => navigate("/dashboard?tab=equipos-list")}
                style={{ padding: 0, height: "auto" }}
              >
                Equipos
              </Button>
            ),
          },
          {
            title: (
              <Space>
                <UserOutlined />
                <Text strong>Participantes</Text>
              </Space>
            ),
          }
        );
        break;
      case "usuarios":
        items.push({
          title: (
            <Space>
              <UserOutlined />
              <Text strong>Gestión de Usuarios</Text>
            </Space>
          ),
        });
        break;
      case "revenue":
        items.push({
          title: (
            <Space>
              <DollarOutlined />
              <Text strong>Reportes de Ingresos</Text>
            </Space>
          ),
        });
        break;
      case "settings":
        items.push({
          title: (
            <Space>
              <SettingOutlined />
              <Text strong>Configuración</Text>
            </Space>
          ),
        });
        break;
    }

    return items;
  };

  return (
    <div className="dashboard-breadcrumb">
      <Breadcrumb
        items={getBreadcrumbItems()}
        separator={
          <RightOutlined style={{ fontSize: "12px", color: "#8c8c8c" }} />
        }
      />
    </div>
  );
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [mobileDrawerVisible, setMobileDrawerVisible] = useState(false);
  const [selectedEquipoId, setSelectedEquipoId] = useState<number | null>(null);
  const [selectedEquipoName, setSelectedEquipoName] = useState<string>("");

  // Estados para estadísticas dinámicas
  const [participantes, setParticipantes] = useState<
    (Participante & { equipo: Equipo })[]
  >([]);
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [stats, setStats] = useState({
    totalParticipantes: 0,
    totalEquipos: 0,
    participantesConSeguro: 0,
    participantesAlergicos: 0,
    participantesPorEntidad: {} as Record<string, number>,
    tiposSangre: {} as Record<string, number>,
    especialidades: {} as Record<string, number>,
    semestres: {} as Record<string, number>,
  });

  // Verificar si hay un parámetro de pestaña en la URL
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setSelectedKey(tab);
    }
  }, [searchParams]);

  // Cargar estadísticas dinámicas
  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      setLoadingStats(true);
      const [participantesRes, equiposRes] = await Promise.all([
        eventosService.listParticipantes(),
        eventosService.listEquipos(),
      ]);

      const participantesData = participantesRes.data;
      const equiposData = equiposRes.data;

      setParticipantes(participantesData);
      setEquipos(equiposData);

      // Calcular estadísticas
      const equiposUnicos = new Set(participantesData.map((p) => p.equipo_id));
      const participantesConSeguro = participantesData.filter(
        (p) => p.seguro_facultativo
      ).length;
      const participantesAlergicos = participantesData.filter(
        (p) => p.alergico
      ).length;

      // Estadísticas por entidad federativa
      const participantesPorEntidad: Record<string, number> = {};
      participantesData.forEach((p) => {
        const entidad = p.equipo?.entidad_federativa || "Sin especificar";
        participantesPorEntidad[entidad] =
          (participantesPorEntidad[entidad] || 0) + 1;
      });

      // Estadísticas por tipo de sangre
      const tiposSangre: Record<string, number> = {};
      participantesData.forEach((p) => {
        const tipo = p.tipo_sangre_participante || "Sin especificar";
        tiposSangre[tipo] = (tiposSangre[tipo] || 0) + 1;
      });

      // Estadísticas por especialidad
      const especialidades: Record<string, number> = {};
      participantesData.forEach((p) => {
        const especialidad = p.especialidad_participante || "Sin especificar";
        especialidades[especialidad] = (especialidades[especialidad] || 0) + 1;
      });

      // Estadísticas por semestre
      const semestres: Record<string, number> = {};
      participantesData.forEach((p) => {
        const semestre = p.semestre_participante || "Sin especificar";
        semestres[semestre] = (semestres[semestre] || 0) + 1;
      });

      setStats({
        totalParticipantes: participantesData.length,
        totalEquipos: equiposUnicos.size,
        participantesConSeguro,
        participantesAlergicos,
        participantesPorEntidad,
        tiposSangre,
        especialidades,
        semestres,
      });
    } catch (error: any) {
      console.error("Error loading dashboard stats:", error);
      message.error(
        error?.message || "No se pudo cargar las estadísticas del dashboard"
      );
    } finally {
      setLoadingStats(false);
    }
  };

  // Estadísticas dinámicas para el dashboard
  const dashboardStats = [
    {
      title: "Total de Participantes",
      value: stats.totalParticipantes,
      prefix: <TeamOutlined />,
      color: "#1890ff",
      suffix: "participantes",
      statType: "participantes",
    },
    {
      title: "Total de Equipos",
      value: stats.totalEquipos,
      prefix: <TrophyOutlined />,
      color: "#52c41a",
      suffix: "equipos",
      statType: "equipos",
    },
    {
      title: "Con Seguro Facultativo",
      value: stats.participantesConSeguro,
      prefix: <SafetyOutlined />,
      color: "#faad14",
      suffix: "participantes",
      statType: "seguro",
    },
    {
      title: "Con Alergias",
      value: stats.participantesAlergicos,
      prefix: <AlertOutlined />,
      color: "#ff4d4f",
      suffix: "participantes",
      statType: "alergias",
    },
  ];

  // Menú del sidebar
  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "events",
      icon: <CalendarOutlined />,
      label: "Eventos",
    },
    {
      key: "equipos",
      icon: <TeamOutlined />,
      label: "Equipos",
      children: [
        {
          key: "equipos-list",
          icon: <TeamOutlined />,
          label: "Lista de Equipos",
        },
        {
          key: "equipo-detalle",
          icon: <EyeOutlined />,
          label: "Detalle de Equipo",
          disabled: !selectedEquipoId,
        },
        {
          key: "participants",
          icon: <UserOutlined />,
          label: "Participantes",
        },
      ],
    },
    {
      key: "usuarios",
      icon: <UserOutlined />,
      label: "Usuarios",
    },
    {
      key: "revenue",
      icon: <DollarOutlined />,
      label: "Ingresos",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Configuración",
    },
  ];

  const handleMenuClick = (e: any) => {
    setSelectedKey(e.key);
    setMobileDrawerVisible(false);
    // Actualizar la URL con el parámetro de pestaña
    if (e.key === "dashboard") {
      navigate("/dashboard");
    } else {
      navigate(`/dashboard?tab=${e.key}`);
    }
  };

  const handleEquipoSelect = (equipoId: number) => {
    const equipo = equipos.find((e) => e.id === equipoId);
    setSelectedEquipoId(equipoId);
    setSelectedEquipoName(equipo?.nombre_equipo || "");
    setSelectedKey("equipo-detalle");
    navigate(`/dashboard?tab=equipo-detalle&equipo=${equipoId}`);
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileDrawer = () => {
    setMobileDrawerVisible(!mobileDrawerVisible);
  };

  const getPageTitle = () => {
    switch (selectedKey) {
      case "dashboard":
        return "Dashboard General";
      case "events":
        return "Gestión de Eventos";
      case "equipos-list":
        return "Lista de Equipos";
      case "equipos":
        return "Gestión de Equipos";
      case "equipo-detalle":
        return `Detalle del Equipo: ${selectedEquipoName}`;
      case "participants":
        return "Gestión de Participantes";
      case "revenue":
        return "Reportes de Ingresos";
      case "settings":
        return "Configuración del Sistema";
      default:
        return "Dashboard";
    }
  };

  const getPageIcon = () => {
    switch (selectedKey) {
      case "dashboard":
        return <DashboardOutlined />;
      case "events":
        return <CalendarOutlined />;
      case "equipos-list":
      case "equipos":
        return <TeamOutlined />;
      case "equipo-detalle":
        return <EyeOutlined />;
      case "participants":
        return <UserOutlined />;
      case "revenue":
        return <DollarOutlined />;
      case "settings":
        return <SettingOutlined />;
      default:
        return <DashboardOutlined />;
    }
  };

  return (
    <Layout className="dashboard-layout">
      {/* Sidebar para desktop */}
      <Layout.Sider
        className="dashboard-sider"
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="lg"
        collapsedWidth="80"
        width={250}
        trigger={null}
      >
        <div className="sidebar-header">
          <div className="logo">
            {!collapsed && <h2>Eventos</h2>}
            {collapsed && <CalendarOutlined className="logo-icon" />}
          </div>
        </div>

        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={handleMenuClick}
          className="sidebar-menu"
        />

        <div className="sidebar-footer">
          <Button
            type="text"
            icon={<LogoutOutlined />}
            className="logout-btn"
            onClick={() => console.log("Logout")}
          >
            {!collapsed && "Cerrar Sesión"}
          </Button>
        </div>
      </Layout.Sider>

      <Layout className={`dashboard-content ${collapsed ? "collapsed" : ""}`}>
        {/* Header */}
        <Layout.Header className="dashboard-header">
          <div className="header-left">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={toggleSidebar}
              className="sidebar-trigger"
            />
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={toggleMobileDrawer}
              className="mobile-menu-trigger"
            />
          </div>

          <div className="header-content">
            <Title level={3} className="page-title">
              {getPageTitle()}
            </Title>
          </div>

          <div className="header-actions"></div>
        </Layout.Header>

        {/* Contenido principal */}
        <Layout.Content className="dashboard-main">
          {/* Breadcrumb */}
          <div className="dashboard-breadcrumb-container">
            <DashboardBreadcrumb
              selectedKey={selectedKey}
              equipoName={selectedEquipoName}
            />
          </div>

          {selectedKey === "dashboard" && (
            <div className="dashboard-content-wrapper">
              <Card title="Dashboard General" className="content-card">
                <Space
                  direction="vertical"
                  size="large"
                  style={{ width: "100%" }}
                >
                  {/* Estadísticas principales */}
                  <Card title="Estadísticas Generales" size="small">
                    <Row gutter={[16, 16]} className="stats-row">
                      {loadingStats ? (
                        <Col span={24}>
                          <div style={{ textAlign: "center", padding: "20px" }}>
                            <Spin size="large" />
                            <Text
                              style={{ display: "block", marginTop: "12px" }}
                            >
                              Cargando estadísticas...
                            </Text>
                          </div>
                        </Col>
                      ) : (
                        dashboardStats.map((stat, index) => (
                          <Col xs={24} sm={12} lg={6} key={index}>
                            <Card
                              className="stat-card"
                              hoverable
                              data-stat={stat.statType}
                              size="small"
                            >
                              <Statistic
                                title={stat.title}
                                value={stat.value}
                                prefix={stat.prefix}
                                suffix={stat.suffix}
                                valueStyle={{ color: stat.color }}
                              />
                            </Card>
                          </Col>
                        ))
                      )}
                    </Row>
                  </Card>

                  {/* Sección de Equipos */}
                  <Card
                    title={
                      <Space>
                        <TeamOutlined />
                        <span>Equipos Registrados ({equipos.length})</span>
                      </Space>
                    }
                    extra={
                      <Button
                        type="link"
                        icon={<EyeOutlined />}
                        onClick={() => setSelectedKey("equipos-list")}
                        size="small"
                      >
                        Ver todos
                      </Button>
                    }
                    size="small"
                  >
                    {equipos.length === 0 ? (
                      <Empty
                        description="No hay equipos registrados"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        style={{ padding: "20px" }}
                      />
                    ) : (
                      <Table
                        dataSource={equipos.slice(0, 4)}
                        pagination={false}
                        size="small"
                        className="equipos-table"
                        scroll={{ x: 600 }}
                        onRow={(record) => ({
                          onClick: () => handleEquipoSelect(record.id),
                          style: { cursor: "pointer" },
                        })}
                      >
                        <Table.Column
                          title="Equipo"
                          dataIndex="nombre_equipo"
                          key="nombre_equipo"
                          width={200}
                          render={(text: string) => (
                            <Space size="small">
                              <Avatar size="small" icon={<TeamOutlined />} />
                              <Text strong style={{ fontSize: "11px" }}>
                                {text}
                              </Text>
                            </Space>
                          )}
                        />
                        <Table.Column
                          title="Entidad"
                          dataIndex="entidad_federativa"
                          key="entidad_federativa"
                          width={120}
                          render={(text: string) => (
                            <Text style={{ fontSize: "11px" }}>{text}</Text>
                          )}
                        />
                        <Table.Column
                          title="Anfitrión"
                          dataIndex="nombre_anfitrion"
                          key="nombre_anfitrion"
                          width={150}
                          render={(text: string) => (
                            <Text style={{ fontSize: "11px" }}>{text}</Text>
                          )}
                        />
                        <Table.Column
                          title="Estatus"
                          dataIndex="estatus_del_equipo"
                          key="estatus_del_equipo"
                          width={80}
                          render={(status: string) => (
                            <Tag
                              color={
                                status === "activo" ? "success" : "default"
                              }
                            >
                              {status}
                            </Tag>
                          )}
                        />
                      </Table>
                    )}
                  </Card>

                  {/* Estadísticas Detalladas */}
                  <Card title="Estadísticas Detalladas" size="small">
                    <Row gutter={[12, 12]} className="stats-detail-section">
                      {/* Participantes por entidad federativa */}
                      <Col xs={24} lg={12}>
                        <Card
                          title={
                            <Space size="small">
                              <EnvironmentOutlined
                                style={{ color: "#1890ff" }}
                              />
                              <span style={{ fontSize: "12px" }}>
                                Por Entidad Federativa
                              </span>
                            </Space>
                          }
                          className="chart-card"
                          size="small"
                        >
                          {Object.entries(stats.participantesPorEntidad)
                            .sort(([, a], [, b]) => b - a)
                            .slice(0, 5)
                            .map(([entidad, count], index) => (
                              <div key={index} className="participant-item">
                                <div className="participant-info">
                                  <Text strong style={{ fontSize: "11px" }}>
                                    {entidad}
                                  </Text>
                                  <Text
                                    type="secondary"
                                    style={{ fontSize: "10px" }}
                                  >
                                    {count} participantes
                                  </Text>
                                </div>
                                <Progress
                                  percent={Math.round(
                                    (count / stats.totalParticipantes) * 100
                                  )}
                                  strokeColor="#1890ff"
                                  showInfo={false}
                                  size="small"
                                />
                              </div>
                            ))}
                        </Card>
                      </Col>

                      {/* Especialidades más populares */}
                      <Col xs={24} lg={12}>
                        <Card
                          title={
                            <Space size="small">
                              <TrophyOutlined style={{ color: "#52c41a" }} />
                              <span style={{ fontSize: "12px" }}>
                                Especialidades Populares
                              </span>
                            </Space>
                          }
                          className="chart-card"
                          size="small"
                        >
                          {Object.entries(stats.especialidades)
                            .sort(([, a], [, b]) => b - a)
                            .slice(0, 5)
                            .map(([especialidad, count], index) => (
                              <div key={index} className="participant-item">
                                <div className="participant-info">
                                  <Text strong style={{ fontSize: "11px" }}>
                                    {especialidad}
                                  </Text>
                                  <Text
                                    type="secondary"
                                    style={{ fontSize: "10px" }}
                                  >
                                    {count} participantes
                                  </Text>
                                </div>
                                <Progress
                                  percent={Math.round(
                                    (count / stats.totalParticipantes) * 100
                                  )}
                                  strokeColor="#52c41a"
                                  showInfo={false}
                                  size="small"
                                />
                              </div>
                            ))}
                        </Card>
                      </Col>

                      {/* Distribución por tipo de sangre */}
                      <Col xs={24} lg={12}>
                        <Card
                          title={
                            <Space size="small">
                              <HeartOutlined style={{ color: "#ff4d4f" }} />
                              <span style={{ fontSize: "12px" }}>
                                Tipos de Sangre
                              </span>
                            </Space>
                          }
                          className="chart-card"
                          size="small"
                        >
                          {Object.entries(stats.tiposSangre)
                            .sort(([, a], [, b]) => b - a)
                            .slice(0, 5)
                            .map(([tipo, count], index) => (
                              <div key={index} className="participant-item">
                                <div className="participant-info">
                                  <Text strong style={{ fontSize: "11px" }}>
                                    {tipo}
                                  </Text>
                                  <Text
                                    type="secondary"
                                    style={{ fontSize: "10px" }}
                                  >
                                    {count} participantes
                                  </Text>
                                </div>
                                <Progress
                                  percent={Math.round(
                                    (count / stats.totalParticipantes) * 100
                                  )}
                                  strokeColor="#ff4d4f"
                                  showInfo={false}
                                  size="small"
                                />
                              </div>
                            ))}
                        </Card>
                      </Col>

                      {/* Distribución por semestre */}
                      <Col xs={24} lg={12}>
                        <Card
                          title={
                            <Space size="small">
                              <CalendarOutlined style={{ color: "#722ed1" }} />
                              <span style={{ fontSize: "12px" }}>
                                Por Semestre
                              </span>
                            </Space>
                          }
                          className="chart-card"
                          size="small"
                        >
                          {Object.entries(stats.semestres)
                            .sort(([, a], [, b]) => b - a)
                            .slice(0, 5)
                            .map(([semestre, count], index) => (
                              <div key={index} className="participant-item">
                                <div className="participant-info">
                                  <Text strong style={{ fontSize: "11px" }}>
                                    {semestre}
                                  </Text>
                                  <Text
                                    type="secondary"
                                    style={{ fontSize: "10px" }}
                                  >
                                    {count} participantes
                                  </Text>
                                </div>
                                <Progress
                                  percent={Math.round(
                                    (count / stats.totalParticipantes) * 100
                                  )}
                                  strokeColor="#722ed1"
                                  showInfo={false}
                                  size="small"
                                />
                              </div>
                            ))}
                        </Card>
                      </Col>
                    </Row>
                  </Card>
                </Space>
              </Card>
            </div>
          )}

          {selectedKey === "events" && (
            <div className="dashboard-content-wrapper">
              <Card title="Gestión de Eventos" className="content-card">
                {/* Cargador y selector de eventos */}
                <Space
                  direction="vertical"
                  size="large"
                  style={{ width: "100%" }}
                >
                  <EventSelector />
                </Space>
              </Card>
            </div>
          )}

          {selectedKey === "equipos-list" && (
            <div className="dashboard-content-wrapper">
              <EquiposTable
                onEquipoSelect={handleEquipoSelect}
                isEmbedded={true}
              />
            </div>
          )}

          {selectedKey === "equipos" && (
            <div className="dashboard-content-wrapper">
              <EquiposTable
                onEquipoSelect={handleEquipoSelect}
                isEmbedded={true}
              />
            </div>
          )}

          {selectedKey === "equipo-detalle" && selectedEquipoId && (
            <div className="dashboard-content-wrapper">
              <EquipoDetalle
                equipoId={selectedEquipoId}
                isEmbedded={true}
                onBackToEquipos={() => setSelectedKey("equipos-list")}
              />
            </div>
          )}

          {selectedKey === "participants" && (
            <div className="dashboard-content-wrapper">
              <ParticipantesTable />
            </div>
          )}

          {selectedKey === "usuarios" && (
            <div className="dashboard-content-wrapper">
              <UsuariosTable isEmbedded={true} />
            </div>
          )}

          {selectedKey === "revenue" && (
            <div className="dashboard-content-wrapper">
              <Card title="Reportes de Ingresos" className="content-card">
                <p>Aquí irán los reportes de ingresos</p>
              </Card>
            </div>
          )}

          {selectedKey === "settings" && (
            <div className="dashboard-content-wrapper">
              <Card title="Configuración" className="content-card">
                <p>Aquí irá la configuración del sistema</p>
              </Card>
            </div>
          )}
        </Layout.Content>
      </Layout>

      {/* Drawer para móvil */}
      <Drawer
        title="Menú"
        placement="left"
        onClose={() => setMobileDrawerVisible(false)}
        open={mobileDrawerVisible}
        className="mobile-drawer"
      >
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={handleMenuClick}
          className="mobile-menu"
        />
      </Drawer>
    </Layout>
  );
};

export default Dashboard;

// Componente para estadísticas de participantes
const ParticipantesStats: React.FC = () => {
  const [participantes, setParticipantes] = useState<
    (Participante & { equipo: Equipo })[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalParticipantes: 0,
    totalEquipos: 0,
    participantesConSeguro: 0,
    participantesAlergicos: 0,
    participantesPorEntidad: {} as Record<string, number>,
    tiposSangre: {} as Record<string, number>,
    especialidades: {} as Record<string, number>,
    semestres: {} as Record<string, number>,
  });

  useEffect(() => {
    loadParticipantes();
  }, []);

  const loadParticipantes = async () => {
    try {
      setLoading(true);
      const response = await eventosService.listParticipantes();
      const data = response.data;
      setParticipantes(data);

      // Calcular estadísticas
      const equiposUnicos = new Set(data.map((p) => p.equipo_id));
      const participantesConSeguro = data.filter(
        (p) => p.seguro_facultativo
      ).length;
      const participantesAlergicos = data.filter((p) => p.alergico).length;

      // Estadísticas por entidad federativa
      const participantesPorEntidad: Record<string, number> = {};
      data.forEach((p) => {
        const entidad = p.equipo?.entidad_federativa || "Sin especificar";
        participantesPorEntidad[entidad] =
          (participantesPorEntidad[entidad] || 0) + 1;
      });

      // Estadísticas por tipo de sangre
      const tiposSangre: Record<string, number> = {};
      data.forEach((p) => {
        const tipo = p.tipo_sangre_participante || "Sin especificar";
        tiposSangre[tipo] = (tiposSangre[tipo] || 0) + 1;
      });

      // Estadísticas por especialidad
      const especialidades: Record<string, number> = {};
      data.forEach((p) => {
        const especialidad = p.especialidad_participante || "Sin especificar";
        especialidades[especialidad] = (especialidades[especialidad] || 0) + 1;
      });

      // Estadísticas por semestre
      const semestres: Record<string, number> = {};
      data.forEach((p) => {
        const semestre = p.semestre_participante || "Sin especificar";
        semestres[semestre] = (semestres[semestre] || 0) + 1;
      });

      setStats({
        totalParticipantes: data.length,
        totalEquipos: equiposUnicos.size,
        participantesConSeguro,
        participantesAlergicos,
        participantesPorEntidad,
        tiposSangre,
        especialidades,
        semestres,
      });
    } catch (error: any) {
      console.error("Error loading participantes:", error);
      message.error(
        error?.message || "No se pudo cargar las estadísticas de participantes"
      );
    } finally {
      setLoading(false);
    }
  };

  const statsCards = [
    {
      title: "Total de Participantes",
      value: stats.totalParticipantes,
      prefix: <TeamOutlined />,
      color: "#1890ff",
      suffix: "participantes",
      statType: "participantes",
    },
    {
      title: "Total de Equipos",
      value: stats.totalEquipos,
      prefix: <TrophyOutlined />,
      color: "#52c41a",
      suffix: "equipos",
      statType: "equipos",
    },
    {
      title: "Con Seguro Facultativo",
      value: stats.participantesConSeguro,
      prefix: <SafetyOutlined />,
      color: "#faad14",
      suffix: "participantes",
      statType: "seguro",
    },
    {
      title: "Con Alergias",
      value: stats.participantesAlergicos,
      prefix: <AlertOutlined />,
      color: "#ff4d4f",
      suffix: "participantes",
      statType: "alergias",
    },
  ];

  const getTopEntidades = () => {
    return Object.entries(stats.participantesPorEntidad)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);
  };

  const getTopEspecialidades = () => {
    return Object.entries(stats.especialidades)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <Spin size="large" />
        <Text style={{ display: "block", marginTop: "16px" }}>
          Cargando estadísticas de participantes...
        </Text>
      </div>
    );
  }

  return (
    <div className="dashboard-content-wrapper">
      {/* Estadísticas principales */}
      <Row gutter={[24, 24]} className="stats-row">
        {statsCards.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card className="stat-card" hoverable data-stat={stat.statType}>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                valueStyle={{ color: stat.color }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Estadísticas detalladas */}
      <Row gutter={[24, 24]} className="main-content">
        {/* Participantes por entidad federativa */}
        <Col xs={24} lg={12}>
          <Card
            title="Participantes por Entidad Federativa"
            className="chart-card"
          >
            {getTopEntidades().map(([entidad, count], index) => (
              <div key={index} className="participant-item">
                <div className="participant-info">
                  <Text strong>{entidad}</Text>
                  <Text type="secondary">{count} participantes</Text>
                </div>
                <Progress
                  percent={Math.round((count / stats.totalParticipantes) * 100)}
                  strokeColor="#1890ff"
                  showInfo={false}
                  size="small"
                />
              </div>
            ))}
          </Card>
        </Col>

        {/* Especialidades más populares */}
        <Col xs={24} lg={12}>
          <Card title="Especialidades Más Populares" className="chart-card">
            {getTopEspecialidades().map(([especialidad, count], index) => (
              <div key={index} className="participant-item">
                <div className="participant-info">
                  <Text strong>{especialidad}</Text>
                  <Text type="secondary">{count} participantes</Text>
                </div>
                <Progress
                  percent={Math.round((count / stats.totalParticipantes) * 100)}
                  strokeColor="#52c41a"
                  showInfo={false}
                  size="small"
                />
              </div>
            ))}
          </Card>
        </Col>

        {/* Distribución por tipo de sangre */}
        <Col xs={24} lg={12}>
          <Card title="Distribución por Tipo de Sangre" className="chart-card">
            {Object.entries(stats.tiposSangre).map(([tipo, count], index) => (
              <div key={index} className="participant-item">
                <div className="participant-info">
                  <Text strong>{tipo}</Text>
                  <Text type="secondary">{count} participantes</Text>
                </div>
                <Progress
                  percent={Math.round((count / stats.totalParticipantes) * 100)}
                  strokeColor="#faad14"
                  showInfo={false}
                  size="small"
                />
              </div>
            ))}
          </Card>
        </Col>

        {/* Distribución por semestre */}
        <Col xs={24} lg={12}>
          <Card title="Distribución por Semestre" className="chart-card">
            {Object.entries(stats.semestres).map(([semestre, count], index) => (
              <div key={index} className="participant-item">
                <div className="participant-info">
                  <Text strong>{semestre}</Text>
                  <Text type="secondary">{count} participantes</Text>
                </div>
                <Progress
                  percent={Math.round((count / stats.totalParticipantes) * 100)}
                  strokeColor="#722ed1"
                  showInfo={false}
                  size="small"
                />
              </div>
            ))}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

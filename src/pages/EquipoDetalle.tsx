import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  Space,
  Tag,
  Avatar,
  Typography,
  Button,
  Descriptions,
  Spin,
  message,
  Empty,
  Row,
  Col,
  Table,
  Divider,
  Breadcrumb,
  Statistic,
  Modal,
  Form,
  Input,
  Select,
  Switch,
} from "antd";
import {
  TeamOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  BookOutlined,
  FileTextOutlined,
  TrophyOutlined,
  SafetyCertificateOutlined,
  ArrowLeftOutlined,
  HomeOutlined,
  UsergroupAddOutlined,
  CiOutlined,
  InfoCircleOutlined,
  SettingOutlined,
  EyeOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { eventosService } from "../services/eventos";
import type {
  Equipo,
  Participante,
  Acompanante,
  Receta,
  CedulaRegistro,
} from "../services/eventos";
import dayjs from "dayjs";
import "./EquipoDetalle.css";

const { Text, Title, Paragraph } = Typography;

interface EquipoDetalleProps {
  equipoId?: number;
  isEmbedded?: boolean;
  onBackToEquipos?: () => void;
}

const EquipoDetalle: React.FC<EquipoDetalleProps> = ({
  equipoId,
  isEmbedded = false,
  onBackToEquipos,
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [equipo, setEquipo] = useState<Equipo | null>(null);
  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editForm] = Form.useForm();
  const [updating, setUpdating] = useState(false);

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

  // Estados para el detalle del acompañante
  const [acompananteDetail, setAcompananteDetail] = useState<
    (Acompanante & { equipo: Equipo }) | null
  >(null);
  const [acompananteDetailVisible, setAcompananteDetailVisible] =
    useState(false);
  const [acompananteDetailLoading, setAcompananteDetailLoading] =
    useState(false);

  // Estados para editar acompañante
  const [editAcompananteModalVisible, setEditAcompananteModalVisible] =
    useState(false);
  const [editAcompananteForm] = Form.useForm();
  const [updatingAcompanante, setUpdatingAcompanante] = useState(false);
  const [selectedAcompanante, setSelectedAcompanante] =
    useState<Acompanante | null>(null);

  // Usar equipoId de props si está disponible, sino usar el parámetro de URL
  const finalEquipoId = equipoId || (id ? parseInt(id) : null);

  useEffect(() => {
    if (finalEquipoId) {
      loadEquipoDetail(finalEquipoId);
    }
  }, [finalEquipoId]);

  const loadEquipoDetail = async (equipoId: number) => {
    try {
      setLoading(true);
      console.log("Cargando equipo con ID:", equipoId);
      const response = await eventosService.getEquipoDetail(equipoId);
      console.log("Respuesta del servidor:", response);
      setEquipo(response.data);
    } catch (error: any) {
      console.error("Error loading equipo:", error);
      message.error(
        error?.message || "No se pudo cargar la información del equipo"
      );
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (iso?: string) =>
    iso ? dayjs(iso).format("DD/MM/YYYY HH:mm") : "-";

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "activo":
        return "success";
      case "inactivo":
        return "default";
      case "pendiente":
        return "warning";
      case "cancelado":
        return "error";
      default:
        return "default";
    }
  };

  const handleEdit = () => {
    if (equipo) {
      editForm.setFieldsValue({
        nombre_equipo: equipo.nombre_equipo,
        entidad_federativa: equipo.entidad_federativa,
        estatus_del_equipo: equipo.estatus_del_equipo,
        nombre_anfitrion: equipo.nombre_anfitrion,
        telefono_anfitrion: equipo.telefono_anfitrion,
        correo_anfitrion: equipo.correo_anfitrion,
      });
      setEditModalVisible(true);
    }
  };

  const handleUpdate = async (values: any) => {
    if (!equipo) return;

    setUpdating(true);
    try {
      const res = await eventosService.updateEquipo(equipo.id, values);
      setEquipo(res.data);
      setEditModalVisible(false);
      message.success("Equipo actualizado exitosamente");
    } catch (err: any) {
      message.error(err?.message || "No se pudo actualizar el equipo");
    } finally {
      setUpdating(false);
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
      // Recargar el equipo para obtener los datos actualizados
      if (finalEquipoId) {
        loadEquipoDetail(finalEquipoId);
      }
    } catch (err: any) {
      message.error(err?.message || "No se pudo actualizar el participante");
    } finally {
      setUpdatingParticipante(false);
    }
  };

  // Funciones para manejar acompañantes
  const handleViewAcompanante = async (acompanante: Acompanante) => {
    try {
      setAcompananteDetailLoading(true);
      const response = await eventosService.getAcompananteDetail(
        acompanante.id
      );
      setAcompananteDetail(response.data);
      setAcompananteDetailVisible(true);
    } catch (error: any) {
      message.error(
        error?.message || "No se pudo cargar el detalle del acompañante"
      );
    } finally {
      setAcompananteDetailLoading(false);
    }
  };

  const handleEditAcompanante = (acompanante: Acompanante) => {
    setSelectedAcompanante(acompanante);
    editAcompananteForm.setFieldsValue({
      nombre_acompanante: acompanante.nombre_acompanante,
      rol: acompanante.rol,
      puesto: acompanante.puesto,
      talla: acompanante.talla,
      telefono: acompanante.telefono,
      email: acompanante.email,
    });
    setEditAcompananteModalVisible(true);
  };

  const handleUpdateAcompanante = async (values: any) => {
    if (!selectedAcompanante) return;

    setUpdatingAcompanante(true);
    try {
      await eventosService.updateAcompanante(selectedAcompanante.id, values);
      setEditAcompananteModalVisible(false);
      message.success("Acompañante actualizado exitosamente");
      // Recargar el equipo para obtener los datos actualizados
      if (finalEquipoId) {
        loadEquipoDetail(finalEquipoId);
      }
    } catch (err: any) {
      message.error(err?.message || "No se pudo actualizar el acompañante");
    } finally {
      setUpdatingAcompanante(false);
    }
  };

  if (loading) {
    return (
      <div className="equipo-detalle-loading">
        <Spin size="large" />
        <Text>Cargando información del equipo...</Text>
      </div>
    );
  }

  if (!equipo) {
    return (
      <div className="equipo-detalle-error">
        <Empty description="No se encontró la información del equipo" />
        <Button type="primary" onClick={() => navigate("/dashboard")}>
          Volver al Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="equipo-detalle-container">
      {/* Breadcrumb - solo mostrar si no está embebido */}
      {!isEmbedded && (
        <Breadcrumb className="equipo-detalle-breadcrumb">
          <Breadcrumb.Item>
            <Button
              type="link"
              icon={<HomeOutlined />}
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </Button>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Button
              type="link"
              icon={<TeamOutlined />}
              onClick={() => navigate("/dashboard?tab=equipos")}
            >
              Equipos
            </Button>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{equipo.nombre_equipo}</Breadcrumb.Item>
        </Breadcrumb>
      )}

      {/* Header con información principal */}
      <Card className="equipo-detalle-header">
        <Row gutter={24} align="middle">
          <Col xs={24} md={16}>
            <Space direction="vertical" size="small">
              <Title level={2} className="equipo-nombre">
                <TeamOutlined /> {equipo.nombre_equipo}
              </Title>
              <Space size="large">
                <Space>
                  <EnvironmentOutlined />
                  <Text strong>{equipo.entidad_federativa}</Text>
                </Space>
                <Tag color={getStatusColor(equipo.estatus_del_equipo)}>
                  {equipo.estatus_del_equipo?.charAt(0).toUpperCase() +
                    equipo.estatus_del_equipo?.slice(1)}
                </Tag>
              </Space>
            </Space>
          </Col>
          <Col xs={24} md={8}>
            <Space direction="vertical" size="small" style={{ width: "100%" }}>
              <Button
                type="primary"
                icon={<ArrowLeftOutlined />}
                onClick={() => {
                  if (isEmbedded && onBackToEquipos) {
                    onBackToEquipos();
                    navigate("/dashboard?tab=equipos");
                  } else {
                    navigate("/dashboard?tab=equipos");
                  }
                }}
                block
              >
                Volver a Equipos
              </Button>
              <Button
                type="default"
                icon={<SettingOutlined />}
                onClick={handleEdit}
                block
              >
                Editar Equipo
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Información básica del equipo */}
      <Card title="Información del Equipo" className="equipo-info-card">
        <Descriptions bordered column={2} size="middle">
          <Descriptions.Item label="Nombre del Equipo" span={2}>
            <Text strong style={{ fontSize: "16px" }}>
              {equipo.nombre_equipo}
            </Text>
          </Descriptions.Item>

          <Descriptions.Item label="Entidad Federativa">
            <Space>
              <EnvironmentOutlined />
              <Text>{equipo.entidad_federativa}</Text>
            </Space>
          </Descriptions.Item>

          <Descriptions.Item label="Estatus">
            <Tag color={getStatusColor(equipo.estatus_del_equipo)}>
              {equipo.estatus_del_equipo?.charAt(0).toUpperCase() +
                equipo.estatus_del_equipo?.slice(1)}
            </Tag>
          </Descriptions.Item>

          <Descriptions.Item label="Anfitrión">
            <Space>
              <UserOutlined />
              <Text strong>{equipo.nombre_anfitrion}</Text>
            </Space>
          </Descriptions.Item>

          <Descriptions.Item label="Teléfono">
            <Space>
              <PhoneOutlined />
              <Text>{equipo.telefono_anfitrion}</Text>
            </Space>
          </Descriptions.Item>

          <Descriptions.Item label="Correo" span={2}>
            <Space>
              <MailOutlined />
              <a href={`mailto:${equipo.correo_anfitrion}`}>
                {equipo.correo_anfitrion}
              </a>
            </Space>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* Información del evento */}
      {equipo.evento && (
        <Card title="Información del Evento" className="equipo-info-card">
          <Descriptions bordered column={2} size="middle">
            <Descriptions.Item label="Nombre del Evento" span={2}>
              <Text strong style={{ fontSize: "16px" }}>
                {equipo.evento.nombre_evento}
              </Text>
            </Descriptions.Item>

            <Descriptions.Item label="Sede">
              <Text>{equipo.evento.sede_evento}</Text>
            </Descriptions.Item>

            <Descriptions.Item label="Límite de Participantes">
              <Text strong>{equipo.evento.lim_de_participantes_evento}</Text>
            </Descriptions.Item>

            <Descriptions.Item label="Fecha de Inicio">
              <Text>{formatDateTime(equipo.evento.inicio_evento)}</Text>
            </Descriptions.Item>

            <Descriptions.Item label="Fecha de Fin">
              <Text>{formatDateTime(equipo.evento.fin_evento)}</Text>
            </Descriptions.Item>
          </Descriptions>
        </Card>
      )}

      {/* Participantes */}
      {equipo.participantes && equipo.participantes.length > 0 && (
        <Card
          title={`Participantes (${equipo.participantes.length})`}
          className="equipo-info-card"
        >
          <Table
            dataSource={equipo.participantes}
            rowKey="id"
            size="middle"
            pagination={false}
            columns={[
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
                title: "Plantel",
                dataIndex: "plantel_participante",
                key: "plantel_participante",
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
                  <Tag color={value ? "error" : "success"}>
                    {value ? "Sí" : "No"}
                  </Tag>
                ),
              },
              {
                title: "Acciones",
                key: "actions",
                render: (_, record: Participante) => (
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
            ]}
          />
        </Card>
      )}

      {/* Acompañantes */}
      {equipo.acompanantes && equipo.acompanantes.length > 0 && (
        <Card
          title={`Acompañantes (${equipo.acompanantes.length})`}
          className="equipo-info-card"
        >
          <Table
            dataSource={equipo.acompanantes}
            rowKey="id"
            size="middle"
            pagination={false}
            columns={[
              {
                title: "Nombre",
                dataIndex: "nombre_acompanante",
                key: "nombre_acompanante",
                render: (text: string) => <Text strong>{text}</Text>,
              },
              {
                title: "Rol",
                dataIndex: "rol",
                key: "rol",
              },
              {
                title: "Puesto",
                dataIndex: "puesto",
                key: "puesto",
              },
              {
                title: "Teléfono",
                dataIndex: "telefono",
                key: "telefono",
              },
              {
                title: "Email",
                dataIndex: "email",
                key: "email",
                render: (text: string) => <a href={`mailto:${text}`}>{text}</a>,
              },
              {
                title: "Talla",
                dataIndex: "talla",
                key: "talla",
              },
              {
                title: "Acciones",
                key: "actions",
                render: (_, record: Acompanante) => (
                  <Space size="small">
                    <Button
                      type="text"
                      icon={<EyeOutlined />}
                      onClick={() => handleViewAcompanante(record)}
                      title="Ver detalle"
                    />
                    <Button
                      type="text"
                      icon={<EditOutlined />}
                      onClick={() => handleEditAcompanante(record)}
                      title="Editar"
                    />
                  </Space>
                ),
              },
            ]}
          />
        </Card>
      )}

      {/* Recetas */}
      {equipo.recetas && equipo.recetas.length > 0 && (
        <Card
          title={`Recetas (${equipo.recetas.length})`}
          className="equipo-info-card"
        >
          {equipo.recetas.map((receta, index) => (
            <Card
              key={receta.id}
              type="inner"
              title={`${receta.tipo_receta} - ${receta.descripcion}`}
              style={{ marginBottom: 16 }}
              extra={
                <Text type="secondary">Creado por: {receta.creado_por}</Text>
              }
            >
              <Descriptions column={1} size="small">
                <Descriptions.Item label="Ingredientes">
                  <Text>{receta.ingredientes}</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Preparación">
                  <Text style={{ whiteSpace: "pre-line" }}>
                    {receta.preparacion}
                  </Text>
                </Descriptions.Item>
                {receta.observaciones && (
                  <Descriptions.Item label="Observaciones">
                    <Text>{receta.observaciones}</Text>
                  </Descriptions.Item>
                )}
              </Descriptions>
            </Card>
          ))}
        </Card>
      )}

      {/* Cédulas de Registro */}
      {equipo.cedulas_registro && equipo.cedulas_registro.length > 0 && (
        <Card
          title={`Cédulas de Registro (${equipo.cedulas_registro.length})`}
          className="equipo-info-card"
        >
          {equipo.cedulas_registro.map((cedula, index) => (
            <Card
              key={cedula.id}
              type="inner"
              title={`Cédula #${cedula.id}`}
              style={{ marginBottom: 16 }}
              extra={
                <Tag
                  color={cedula.estado === "aprobada" ? "success" : "warning"}
                >
                  {cedula.estado}
                </Tag>
              }
            >
              <div>
                <Text strong>Participantes:</Text>
                <ul style={{ margin: "8px 0", paddingLeft: "20px" }}>
                  {cedula.participantes.map((participante, idx) => (
                    <li key={idx}>{participante}</li>
                  ))}
                </ul>
                <Divider />
                <Text strong>Asesores:</Text>
                <ul style={{ margin: "8px 0", paddingLeft: "20px" }}>
                  {cedula.asesores.map((asesor, idx) => (
                    <li key={idx}>{asesor}</li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </Card>
      )}

      {/* Modal de edición del equipo */}
      <Modal
        title="Editar Equipo"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form form={editForm} layout="vertical" onFinish={handleUpdate}>
          <Form.Item
            name="nombre_equipo"
            label="Nombre del Equipo"
            rules={[
              {
                required: true,
                message: "Por favor ingresa el nombre del equipo",
              },
              {
                max: 255,
                message: "El nombre no puede exceder 255 caracteres",
              },
            ]}
          >
            <Input placeholder="Nombre del equipo" />
          </Form.Item>

          <Form.Item
            name="entidad_federativa"
            label="Entidad Federativa"
            rules={[
              {
                required: true,
                message: "Por favor ingresa la entidad federativa",
              },
              {
                max: 255,
                message: "La entidad no puede exceder 255 caracteres",
              },
            ]}
          >
            <Input placeholder="Entidad federativa" />
          </Form.Item>

          <Form.Item
            name="nombre_anfitrion"
            label="Nombre del Anfitrión"
            rules={[
              {
                required: true,
                message: "Por favor ingresa el nombre del anfitrión",
              },
              {
                max: 255,
                message: "El nombre no puede exceder 255 caracteres",
              },
            ]}
          >
            <Input placeholder="Nombre del anfitrión" />
          </Form.Item>

          <Form.Item
            name="telefono_anfitrion"
            label="Teléfono del Anfitrión"
            rules={[
              {
                required: true,
                message: "Por favor ingresa el teléfono del anfitrión",
              },
              {
                max: 20,
                message: "El teléfono no puede exceder 20 caracteres",
              },
            ]}
          >
            <Input placeholder="Teléfono del anfitrión" />
          </Form.Item>

          <Form.Item
            name="correo_anfitrion"
            label="Correo del Anfitrión"
            rules={[
              {
                required: true,
                message: "Por favor ingresa el correo del anfitrión",
              },
              {
                type: "email",
                message: "Por favor ingresa un correo válido",
              },
              {
                max: 255,
                message: "El correo no puede exceder 255 caracteres",
              },
            ]}
          >
            <Input placeholder="Correo del anfitrión" />
          </Form.Item>

          <Form.Item
            name="estatus_del_equipo"
            label="Estatus del Equipo"
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
              <Select.Option value="eliminado">Eliminado</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item style={{ marginTop: 24, textAlign: "right" }}>
            <Space>
              <Button onClick={() => setEditModalVisible(false)}>
                Cancelar
              </Button>
              <Button type="primary" htmlType="submit" loading={updating}>
                {updating ? "Actualizando..." : "Actualizar Equipo"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

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

      {/* Modal de detalle del acompañante */}
      <Modal
        title="Detalle del Acompañante"
        open={acompananteDetailVisible}
        onCancel={() => setAcompananteDetailVisible(false)}
        footer={[
          <Button
            key="close"
            onClick={() => setAcompananteDetailVisible(false)}
          >
            Cerrar
          </Button>,
        ]}
        width={800}
      >
        {acompananteDetailLoading ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <Spin size="large" />
            <Text style={{ display: "block", marginTop: "16px" }}>
              Cargando información del acompañante...
            </Text>
          </div>
        ) : acompananteDetail ? (
          <div>
            <Descriptions bordered column={2} size="middle">
              <Descriptions.Item label="Nombre" span={2}>
                <Text strong style={{ fontSize: "16px" }}>
                  {acompananteDetail.nombre_acompanante}
                </Text>
              </Descriptions.Item>

              <Descriptions.Item label="Rol">
                <Text>{acompananteDetail.rol}</Text>
              </Descriptions.Item>

              <Descriptions.Item label="Puesto">
                <Text>{acompananteDetail.puesto}</Text>
              </Descriptions.Item>

              <Descriptions.Item label="Teléfono">
                <Text>{acompananteDetail.telefono}</Text>
              </Descriptions.Item>

              <Descriptions.Item label="Email">
                <a href={`mailto:${acompananteDetail.email}`}>
                  {acompananteDetail.email}
                </a>
              </Descriptions.Item>

              <Descriptions.Item label="Talla">
                <Text>{acompananteDetail.talla}</Text>
              </Descriptions.Item>

              <Descriptions.Item label="Equipo">
                <Text strong>{acompananteDetail.equipo?.nombre_equipo}</Text>
              </Descriptions.Item>
            </Descriptions>
          </div>
        ) : (
          <Empty description="No se encontró la información del acompañante" />
        )}
      </Modal>

      {/* Modal de edición del acompañante */}
      <Modal
        title="Editar Acompañante"
        open={editAcompananteModalVisible}
        onCancel={() => setEditAcompananteModalVisible(false)}
        footer={null}
        width={800}
      >
        <Form
          form={editAcompananteForm}
          layout="vertical"
          onFinish={handleUpdateAcompanante}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="nombre_acompanante"
                label="Nombre del Acompañante"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa el nombre del acompañante",
                  },
                ]}
              >
                <Input placeholder="Nombre del acompañante" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="rol"
                label="Rol"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa el rol",
                  },
                ]}
              >
                <Input placeholder="Rol del acompañante" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="puesto"
                label="Puesto"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa el puesto",
                  },
                ]}
              >
                <Input placeholder="Puesto del acompañante" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    type: "email",
                    message: "Por favor ingresa un correo válido",
                  },
                ]}
              >
                <Input placeholder="Email del acompañante" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="telefono"
                label="Teléfono"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa el teléfono",
                  },
                ]}
              >
                <Input placeholder="Teléfono del acompañante" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="talla"
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

          <Form.Item style={{ marginTop: 24, textAlign: "right" }}>
            <Space>
              <Button onClick={() => setEditAcompananteModalVisible(false)}>
                Cancelar
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={updatingAcompanante}
              >
                {updatingAcompanante
                  ? "Actualizando..."
                  : "Actualizar Acompañante"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EquipoDetalle;

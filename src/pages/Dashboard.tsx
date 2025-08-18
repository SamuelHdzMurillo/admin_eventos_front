import React, { useEffect, useState } from "react";
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
} from "@ant-design/icons";
import "./Dashboard.css";
import { eventosService } from "../services/eventos";
import type { Evento, Equipo } from "../services/eventos";
import dayjs from "dayjs";

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

const { Title, Text } = Typography;

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [mobileDrawerVisible, setMobileDrawerVisible] = useState(false);
  // Datos de estadísticas
  const stats = [
    {
      title: "Total de Eventos",
      value: 156,
      prefix: <CalendarOutlined />,
      color: "#1890ff",
      change: "+12%",
      changeType: "increase",
    },
    {
      title: "Participantes",
      value: 2847,
      prefix: <TeamOutlined />,
      color: "#52c41a",
      change: "+8%",
      changeType: "increase",
    },
    {
      title: "Ingresos",
      value: 45680,
      prefix: <DollarOutlined />,
      color: "#faad14",
      change: "+23%",
      changeType: "increase",
      suffix: "USD",
    },
    {
      title: "Eventos Completados",
      value: 142,
      prefix: <TrophyOutlined />,
      color: "#722ed1",
      change: "+5%",
      changeType: "increase",
    },
  ];

  // Datos de eventos recientes
  const recentEvents = [
    {
      id: 1,
      name: "Conferencia de Tecnología 2024",
      date: "2024-01-15",
      status: "Completado",
      participants: 250,
      revenue: 15000,
    },
    {
      id: 2,
      name: "Workshop de Marketing Digital",
      date: "2024-01-20",
      status: "En Progreso",
      participants: 180,
      revenue: 12000,
    },
    {
      id: 3,
      name: "Seminario de Liderazgo",
      date: "2024-01-25",
      status: "Programado",
      participants: 120,
      revenue: 8000,
    },
    {
      id: 4,
      name: "Expo de Innovación",
      date: "2024-02-01",
      status: "Programado",
      participants: 300,
      revenue: 20000,
    },
  ];

  // Datos de participantes por categoría
  const participantData = [
    { type: "Profesionales", value: 45, color: "#1890ff" },
    { type: "Estudiantes", value: 30, color: "#52c41a" },
    { type: "Empresarios", value: 15, color: "#faad14" },
    { type: "Otros", value: 10, color: "#722ed1" },
  ];

  // Columnas para la tabla de eventos
  const columns = [
    {
      title: "Evento",
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <Space>
          <Avatar icon={<CalendarOutlined />} />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: "Fecha",
      dataIndex: "date",
      key: "date",
      render: (date: string) => (
        <Text type="secondary">{new Date(date).toLocaleDateString()}</Text>
      ),
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let color = "default";
        let icon = <ClockCircleOutlined />;

        if (status === "Completado") {
          color = "success";
          icon = <CheckCircleOutlined />;
        } else if (status === "En Progreso") {
          color = "processing";
          icon = <ClockCircleOutlined />;
        } else if (status === "Programado") {
          color = "warning";
          icon = <ExclamationCircleOutlined />;
        }

        return (
          <Tag color={color} icon={icon}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Participantes",
      dataIndex: "participants",
      key: "participants",
      render: (value: number) => <Text strong>{value.toLocaleString()}</Text>,
    },
    {
      title: "Ingresos",
      dataIndex: "revenue",
      key: "revenue",
      render: (value: number) => (
        <Text strong style={{ color: "#52c41a" }}>
          ${value.toLocaleString()}
        </Text>
      ),
    },
  ];

  // Datos para el calendario
  const getListData = (value: any) => {
    const listData = [];
    const date = value.format("YYYY-MM-DD");

    if (date === "2024-01-15") {
      listData.push({
        type: "success",
        content: "Conferencia de Tecnología",
      });
    }
    if (date === "2024-01-20") {
      listData.push({
        type: "processing",
        content: "Workshop Marketing",
      });
    }
    if (date === "2024-01-25") {
      listData.push({
        type: "warning",
        content: "Seminario Liderazgo",
      });
    }

    return listData;
  };

  const dateCellRender = (value: any) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li key={index}>
            <Badge status={item.type as any} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

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
      key: "participants",
      icon: <TeamOutlined />,
      label: "Participantes",
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
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileDrawer = () => {
    setMobileDrawerVisible(!mobileDrawerVisible);
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
              {selectedKey === "dashboard" && "Dashboard"}
              {selectedKey === "events" && "Gestión de Eventos"}
              {selectedKey === "participants" && "Participantes"}
              {selectedKey === "revenue" && "Reportes de Ingresos"}
              {selectedKey === "settings" && "Configuración"}
            </Title>
          </div>

          <div className="header-actions">
            <Button type="primary" size="large">
              Crear Nuevo Evento
            </Button>
          </div>
        </Layout.Header>

        {/* Contenido principal */}
        <Layout.Content className="dashboard-main">
          {selectedKey === "dashboard" && (
            <div className="dashboard-content-wrapper">
              {/* Estadísticas principales */}
              <Row gutter={[24, 24]} className="stats-row">
                {stats.map((stat, index) => (
                  <Col xs={24} sm={12} lg={6} key={index}>
                    <Card className="stat-card" hoverable>
                      <Statistic
                        title={stat.title}
                        value={stat.value}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                        valueStyle={{ color: stat.color }}
                      />
                      <div className="stat-change">
                        <Text
                          type={
                            stat.changeType === "increase"
                              ? "success"
                              : "danger"
                          }
                        >
                          {stat.changeType === "increase" ? (
                            <RiseOutlined />
                          ) : (
                            <FallOutlined />
                          )}{" "}
                          {stat.change}
                        </Text>
                        <Text type="secondary">vs mes anterior</Text>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>

              {/* Contenido principal */}
              <Row gutter={[24, 24]} className="main-content">
                {/* Tabla de eventos recientes */}
                <Col xs={24} lg={16}>
                  <Card
                    title="Eventos Recientes"
                    extra={<Button type="link">Ver todos</Button>}
                    className="events-card"
                  >
                    <Table
                      columns={columns}
                      dataSource={recentEvents}
                      pagination={false}
                      rowKey="id"
                      className="events-table"
                    />
                  </Card>
                </Col>

                {/* Sidebar con estadísticas adicionales */}
                <Col xs={24} lg={8}>
                  <Space
                    direction="vertical"
                    size="large"
                    style={{ width: "100%" }}
                  >
                    {/* Participantes por categoría */}
                    <Card
                      title="Participantes por Categoría"
                      className="chart-card"
                    >
                      {participantData.map((item, index) => (
                        <div key={index} className="participant-item">
                          <div className="participant-info">
                            <Text strong>{item.type}</Text>
                            <Text type="secondary">{item.value}%</Text>
                          </div>
                          <Progress
                            percent={item.value}
                            strokeColor={item.color}
                            showInfo={false}
                            size="small"
                          />
                        </div>
                      ))}
                    </Card>

                    {/* Calendario */}
                    <Card
                      title="Calendario de Eventos"
                      className="calendar-card"
                    >
                      <Calendar
                        fullscreen={false}
                        dateCellRender={dateCellRender}
                        className="dashboard-calendar"
                      />
                    </Card>

                    {/* Actividad reciente */}
                    <Card title="Actividad Reciente" className="activity-card">
                      <List
                        itemLayout="horizontal"
                        dataSource={[
                          {
                            title: "Nuevo evento creado",
                            description: "Conferencia de Tecnología 2024",
                            time: "Hace 2 horas",
                          },
                          {
                            title: "Participante registrado",
                            description:
                              "Juan Pérez se registró en Workshop Marketing",
                            time: "Hace 4 horas",
                          },
                          {
                            title: "Evento completado",
                            description:
                              "Seminario de Liderazgo finalizado exitosamente",
                            time: "Hace 1 día",
                          },
                        ]}
                        renderItem={(item) => (
                          <List.Item>
                            <List.Item.Meta
                              avatar={<Avatar icon={<UserOutlined />} />}
                              title={item.title}
                              description={
                                <div>
                                  <div>{item.description}</div>
                                  <Text
                                    type="secondary"
                                    style={{ fontSize: "12px" }}
                                  >
                                    {item.time}
                                  </Text>
                                </div>
                              }
                            />
                          </List.Item>
                        )}
                      />
                    </Card>
                  </Space>
                </Col>
              </Row>
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

          {selectedKey === "participants" && (
            <div className="dashboard-content-wrapper">
              <Card title="Participantes" className="content-card">
                <p>Aquí irá la tabla de participantes</p>
              </Card>
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

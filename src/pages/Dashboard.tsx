import React, { useState } from "react";
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
  Divider,
  Calendar,
  Badge,
  Layout,
  Menu,
  Drawer,
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
  TableOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import "./Dashboard.css";

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
                <p>Aquí irá la tabla de gestión de eventos</p>
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

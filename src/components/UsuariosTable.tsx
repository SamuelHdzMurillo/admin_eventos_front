import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  message,
  Popconfirm,
  Tag,
  Card,
  Typography,
  Row,
  Col,
  Statistic,
  Avatar,
  Tooltip,
  Badge,
  Spin,
} from "antd";
import {
  UserOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  CrownOutlined,
  UserSwitchOutlined,
  ExclamationCircleOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { usuariosService } from "../services/usuarios";
import type {
  Usuario,
  CreateUsuarioRequest,
  UpdateUsuarioRequest,
  UsuarioStats,
} from "../services/usuarios";
import dayjs from "dayjs";
import "./UsuariosTable.css";

const { Title, Text } = Typography;
const { Option } = Select;

interface UsuariosTableProps {
  isEmbedded?: boolean;
}

const UsuariosTable: React.FC<UsuariosTableProps> = ({
  isEmbedded = false,
}) => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingStats, setLoadingStats] = useState(false);
  const [stats, setStats] = useState<UsuarioStats>({
    total_users: 0,
    admin_users: 0,
    regular_users: 0,
  });

  // Estados para modales
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [roleModalVisible, setRoleModalVisible] = useState(false);

  // Estados para formularios
  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [roleForm] = Form.useForm();

  // Estados para operaciones
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [changingRole, setChangingRole] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    loadUsuarios();
  }, []);

  // Calcular estadísticas cuando cambien los usuarios
  useEffect(() => {
    loadStats();
  }, [usuarios]);

  const loadUsuarios = async () => {
    try {
      setLoading(true);
      const response = await usuariosService.listUsuarios();
      console.log("Respuesta del servicio de usuarios:", response);
      setUsuarios(response.data || []);
    } catch (error: any) {
      console.error("Error cargando usuarios:", error);
      message.error(error?.message || "No se pudo cargar la lista de usuarios");
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      setLoadingStats(true);
      // Calcular estadísticas localmente basándose en los usuarios cargados
      const totalUsers = usuarios.length;
      const adminUsers = usuarios.filter(
        (user) => user.role === "admin"
      ).length;
      const regularUsers = usuarios.filter(
        (user) => user.role === "usuario"
      ).length;

      console.log("Usuarios cargados:", usuarios);
      console.log("Estadísticas calculadas:", {
        total_users: totalUsers,
        admin_users: adminUsers,
        regular_users: regularUsers,
      });

      setStats({
        total_users: totalUsers,
        admin_users: adminUsers,
        regular_users: regularUsers,
      });
    } catch (error: any) {
      console.error("Error calculating stats:", error);
      // Establecer valores por defecto en caso de error
      setStats({
        total_users: 0,
        admin_users: 0,
        regular_users: 0,
      });
    } finally {
      setLoadingStats(false);
    }
  };

  const handleCreate = async (values: CreateUsuarioRequest) => {
    try {
      setCreating(true);
      await usuariosService.createUsuario(values);
      message.success("Usuario creado exitosamente");
      setCreateModalVisible(false);
      createForm.resetFields();
      loadUsuarios();
      loadStats();
    } catch (error: any) {
      message.error(error?.message || "No se pudo crear el usuario");
    } finally {
      setCreating(false);
    }
  };

  const handleEdit = async (values: UpdateUsuarioRequest) => {
    if (!selectedUsuario) return;

    try {
      setUpdating(true);
      await usuariosService.updateUsuario(selectedUsuario.id, values);
      message.success("Usuario actualizado exitosamente");
      setEditModalVisible(false);
      editForm.resetFields();
      setSelectedUsuario(null);
      loadUsuarios();
    } catch (error: any) {
      message.error(error?.message || "No se pudo actualizar el usuario");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await usuariosService.deleteUsuario(id);
      message.success("Usuario eliminado exitosamente");
      loadUsuarios();
      loadStats();
    } catch (error: any) {
      message.error(error?.message || "No se pudo eliminar el usuario");
    }
  };

  const handleChangeRole = async (values: { role: "admin" | "usuario" }) => {
    if (!selectedUsuario) return;

    try {
      setChangingRole(true);
      await usuariosService.changeRole(selectedUsuario.id, values.role);
      message.success("Rol del usuario cambiado exitosamente");
      setRoleModalVisible(false);
      roleForm.resetFields();
      setSelectedUsuario(null);
      loadUsuarios();
      loadStats();
    } catch (error: any) {
      message.error(error?.message || "No se pudo cambiar el rol del usuario");
    } finally {
      setChangingRole(false);
    }
  };

  const openEditModal = (usuario: Usuario) => {
    setSelectedUsuario(usuario);
    editForm.setFieldsValue({
      name: usuario.name,
      email: usuario.email,
      role: usuario.role,
    });
    setEditModalVisible(true);
  };

  const openViewModal = (usuario: Usuario) => {
    setSelectedUsuario(usuario);
    setViewModalVisible(true);
  };

  const openRoleModal = (usuario: Usuario) => {
    setSelectedUsuario(usuario);
    roleForm.setFieldsValue({
      role: usuario.role,
    });
    setRoleModalVisible(true);
  };

  const columns = [
    {
      title: "Usuario",
      key: "user",
      render: (usuario: Usuario) => (
        <Space>
          <Avatar
            className="usuario-avatar"
            icon={<UserOutlined />}
            style={{
              backgroundColor: usuario.role === "admin" ? "#f50" : "#1890ff",
            }}
          />
          <div>
            <div style={{ fontWeight: "bold" }}>{usuario.name}</div>
            <div style={{ fontSize: "12px", color: "#666" }}>
              {usuario.email}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: "Rol",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <Tag
          className="usuario-role-tag"
          color={role === "admin" ? "red" : "blue"}
          icon={role === "admin" ? <CrownOutlined /> : <UserOutlined />}
        >
          {role === "admin" ? "Administrador" : "Usuario"}
        </Tag>
      ),
    },
    {
      title: "Fecha de Creación",
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string) => dayjs(date).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Acciones",
      key: "actions",
      render: (usuario: Usuario) => (
        <Space className="usuario-actions-space">
          <Tooltip title="Ver detalles">
            <Button
              className="usuario-action-button"
              type="text"
              icon={<EyeOutlined />}
              onClick={() => openViewModal(usuario)}
            />
          </Tooltip>
          <Tooltip title="Editar usuario">
            <Button
              className="usuario-action-button"
              type="text"
              icon={<EditOutlined />}
              onClick={() => openEditModal(usuario)}
            />
          </Tooltip>
          <Tooltip title="Cambiar rol">
            <Button
              className="usuario-action-button"
              type="text"
              icon={<UserSwitchOutlined />}
              onClick={() => openRoleModal(usuario)}
            />
          </Tooltip>
          <Popconfirm
            title="¿Estás seguro de que quieres eliminar este usuario?"
            description="Esta acción no se puede deshacer."
            onConfirm={() => handleDelete(usuario.id)}
            okText="Sí, eliminar"
            cancelText="Cancelar"
            icon={<ExclamationCircleOutlined style={{ color: "red" }} />}
          >
            <Tooltip title="Eliminar usuario">
              <Button
                className="usuario-action-button"
                type="text"
                danger
                icon={<DeleteOutlined />}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const statsCards = [
    {
      title: "Total de Usuarios",
      value: stats.total_users,
      prefix: <UserOutlined />,
      color: "#1890ff",
    },
    {
      title: "Administradores",
      value: stats.admin_users,
      prefix: <CrownOutlined />,
      color: "#f50",
    },
    {
      title: "Usuarios Regulares",
      value: stats.regular_users,
      prefix: <UserOutlined />,
      color: "#52c41a",
    },
  ];

  return (
    <div
      className="usuarios-table-container"
      style={{ padding: isEmbedded ? 0 : 24 }}
    >
      {!isEmbedded && (
        <div style={{ marginBottom: 24 }}>
          <Title level={2}>Gestión de Usuarios</Title>
          <Text type="secondary">
            Administra los usuarios del sistema y sus permisos
          </Text>
        </div>
      )}

      {/* Estadísticas */}
      <Row gutter={[16, 16]} className="usuarios-stats-row">
        {loadingStats ? (
          <Col span={24}>
            <div style={{ textAlign: "center", padding: "20px" }}>
              <Spin size="large" />
              <Text style={{ display: "block", marginTop: "12px" }}>
                Calculando estadísticas...
              </Text>
            </div>
          </Col>
        ) : usuarios.length === 0 && !loading ? (
          <Col span={24}>
            <Card className="usuarios-stats-card">
              <div style={{ textAlign: "center", padding: "20px" }}>
                <Text type="secondary">
                  No hay usuarios registrados. Las estadísticas se mostrarán
                  cuando se agreguen usuarios.
                </Text>
              </div>
            </Card>
          </Col>
        ) : (
          statsCards.map((stat, index) => (
            <Col xs={24} sm={8} key={index}>
              <Card className="usuarios-stats-card">
                <Statistic
                  title={stat.title}
                  value={stat.value}
                  prefix={stat.prefix}
                  valueStyle={{ color: stat.color }}
                />
              </Card>
            </Col>
          ))
        )}
      </Row>

      {/* Tabla de usuarios */}
      <Card
        title="Lista de Usuarios"
        className="usuarios-table-card"
        extra={
          <Space>
            <Button
              icon={<ReloadOutlined />}
              onClick={() => {
                loadUsuarios();
                loadStats();
              }}
              loading={loading || loadingStats}
              size="small"
            >
              Actualizar
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setCreateModalVisible(true)}
            >
              Nuevo Usuario
            </Button>
          </Space>
        }
      >
        <Table
          columns={columns}
          dataSource={usuarios}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} de ${total} usuarios`,
            className: "usuario-table-pagination",
          }}
        />
      </Card>

      {/* Modal para crear usuario */}
      <Modal
        title="Crear Nuevo Usuario"
        open={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        footer={null}
        destroyOnClose
        className="usuario-form-modal"
      >
        <Form form={createForm} layout="vertical" onFinish={handleCreate}>
          <Form.Item
            name="name"
            label="Nombre"
            rules={[
              { required: true, message: "Por favor ingresa el nombre" },
              { min: 2, message: "El nombre debe tener al menos 2 caracteres" },
            ]}
          >
            <Input placeholder="Nombre completo" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Correo Electrónico"
            rules={[
              { required: true, message: "Por favor ingresa el correo" },
              { type: "email", message: "Por favor ingresa un correo válido" },
            ]}
          >
            <Input placeholder="correo@ejemplo.com" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Contraseña"
            rules={[
              { required: true, message: "Por favor ingresa la contraseña" },
              {
                min: 8,
                message: "La contraseña debe tener al menos 8 caracteres",
              },
            ]}
          >
            <Input.Password placeholder="Contraseña" />
          </Form.Item>

          <Form.Item
            name="role"
            label="Rol"
            rules={[{ required: true, message: "Por favor selecciona el rol" }]}
          >
            <Select placeholder="Selecciona el rol">
              <Option value="usuario">Usuario</Option>
              <Option value="admin">Administrador</Option>
            </Select>
          </Form.Item>

          <Form.Item style={{ marginTop: 24, textAlign: "right" }}>
            <Space>
              <Button onClick={() => setCreateModalVisible(false)}>
                Cancelar
              </Button>
              <Button type="primary" htmlType="submit" loading={creating}>
                {creating ? "Creando..." : "Crear Usuario"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal para editar usuario */}
      <Modal
        title="Editar Usuario"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
        destroyOnClose
        className="usuario-form-modal"
      >
        <Form form={editForm} layout="vertical" onFinish={handleEdit}>
          <Form.Item
            name="name"
            label="Nombre"
            rules={[
              { required: true, message: "Por favor ingresa el nombre" },
              { min: 2, message: "El nombre debe tener al menos 2 caracteres" },
            ]}
          >
            <Input placeholder="Nombre completo" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Correo Electrónico"
            rules={[
              { required: true, message: "Por favor ingresa el correo" },
              { type: "email", message: "Por favor ingresa un correo válido" },
            ]}
          >
            <Input placeholder="correo@ejemplo.com" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Contraseña (opcional)"
            rules={[
              {
                min: 8,
                message: "La contraseña debe tener al menos 8 caracteres",
              },
            ]}
          >
            <Input.Password placeholder="Dejar vacío para no cambiar" />
          </Form.Item>

          <Form.Item
            name="role"
            label="Rol"
            rules={[{ required: true, message: "Por favor selecciona el rol" }]}
          >
            <Select placeholder="Selecciona el rol">
              <Option value="usuario">Usuario</Option>
              <Option value="admin">Administrador</Option>
            </Select>
          </Form.Item>

          <Form.Item style={{ marginTop: 24, textAlign: "right" }}>
            <Space>
              <Button onClick={() => setEditModalVisible(false)}>
                Cancelar
              </Button>
              <Button type="primary" htmlType="submit" loading={updating}>
                {updating ? "Actualizando..." : "Actualizar Usuario"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal para ver detalles del usuario */}
      <Modal
        title="Detalles del Usuario"
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setViewModalVisible(false)}>
            Cerrar
          </Button>,
        ]}
        destroyOnClose
        className="usuario-detail-modal"
      >
        {selectedUsuario && (
          <div>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <div style={{ textAlign: "center", marginBottom: 16 }}>
                  <Avatar
                    size={64}
                    className="usuario-detail-avatar"
                    icon={<UserOutlined />}
                    style={{
                      backgroundColor:
                        selectedUsuario.role === "admin" ? "#f50" : "#1890ff",
                    }}
                  />
                </div>
              </Col>
              <Col span={12}>
                <Text strong>Nombre:</Text>
                <br />
                <Text>{selectedUsuario.name}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Correo:</Text>
                <br />
                <Text>{selectedUsuario.email}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Rol:</Text>
                <br />
                <Tag
                  color={selectedUsuario.role === "admin" ? "red" : "blue"}
                  icon={
                    selectedUsuario.role === "admin" ? (
                      <CrownOutlined />
                    ) : (
                      <UserOutlined />
                    )
                  }
                >
                  {selectedUsuario.role === "admin"
                    ? "Administrador"
                    : "Usuario"}
                </Tag>
              </Col>
              <Col span={12}>
                <Text strong>Fecha de Creación:</Text>
                <br />
                <Text>
                  {dayjs(selectedUsuario.created_at).format("DD/MM/YYYY HH:mm")}
                </Text>
              </Col>
              <Col span={12}>
                <Text strong>Última Actualización:</Text>
                <br />
                <Text>
                  {dayjs(selectedUsuario.updated_at).format("DD/MM/YYYY HH:mm")}
                </Text>
              </Col>
            </Row>
          </div>
        )}
      </Modal>

      {/* Modal para cambiar rol */}
      <Modal
        title="Cambiar Rol de Usuario"
        open={roleModalVisible}
        onCancel={() => setRoleModalVisible(false)}
        footer={null}
        destroyOnClose
        className="usuario-form-modal"
      >
        <Form form={roleForm} layout="vertical" onFinish={handleChangeRole}>
          <Form.Item
            name="role"
            label="Nuevo Rol"
            rules={[
              { required: true, message: "Por favor selecciona el nuevo rol" },
            ]}
          >
            <Select placeholder="Selecciona el nuevo rol">
              <Option value="usuario">Usuario</Option>
              <Option value="admin">Administrador</Option>
            </Select>
          </Form.Item>

          <Form.Item style={{ marginTop: 24, textAlign: "right" }}>
            <Space>
              <Button onClick={() => setRoleModalVisible(false)}>
                Cancelar
              </Button>
              <Button type="primary" htmlType="submit" loading={changingRole}>
                {changingRole ? "Cambiando..." : "Cambiar Rol"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UsuariosTable;

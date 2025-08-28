import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Card,
  Space,
  Tag,
  Avatar,
  Typography,
  Button,
  Spin,
  message,
  Empty,
} from "antd";
import {
  TeamOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { eventosService } from "../services/eventos";
import type { Equipo } from "../services/eventos";
import "./EquiposTable.css";

const { Text, Title } = Typography;

interface EquiposTableProps {
  onEquipoSelect?: (equipoId: number) => void;
  isEmbedded?: boolean; // Nueva prop para indicar si está embebido en el dashboard
}

const EquiposTable: React.FC<EquiposTableProps> = ({
  onEquipoSelect,
  isEmbedded = false,
}) => {
  const navigate = useNavigate();
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadEquipos();
  }, []);

  const loadEquipos = async () => {
    try {
      setLoading(true);
      const response = await eventosService.listEquipos();
      setEquipos(response.data || []);
    } catch (error: any) {
      message.error(error?.message || "No se pudo cargar la lista de equipos");
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = (equipoId: number) => {
    if (onEquipoSelect) {
      onEquipoSelect(equipoId);
    } else {
      navigate(`/equipo/${equipoId}`);
    }
  };

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

  const columns = [
    {
      title: "Equipo",
      dataIndex: "nombre_equipo",
      key: "nombre_equipo",
      render: (text: string) => (
        <Space>
          <Avatar className="equipo-avatar" icon={<TeamOutlined />} />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: "Entidad Federativa",
      dataIndex: "entidad_federativa",
      key: "entidad_federativa",
      render: (text: string) => (
        <Space>
          <EnvironmentOutlined />
          <Text>{text}</Text>
        </Space>
      ),
    },
    {
      title: "Anfitrión",
      dataIndex: "nombre_anfitrion",
      key: "nombre_anfitrion",
      render: (text: string) => (
        <Space>
          <Avatar icon={<UserOutlined />} size="small" />
          <Text>{text}</Text>
        </Space>
      ),
    },
    {
      title: "Teléfono",
      dataIndex: "telefono_anfitrion",
      key: "telefono_anfitrion",
      render: (text: string) => (
        <Space>
          <PhoneOutlined />
          <Text>{text}</Text>
        </Space>
      ),
    },
    {
      title: "Correo",
      dataIndex: "correo_anfitrion",
      key: "correo_anfitrion",
      render: (text: string) => (
        <Space>
          <MailOutlined />
          <a href={`mailto:${text}`}>{text}</a>
        </Space>
      ),
    },
    {
      title: "Estatus",
      dataIndex: "estatus_del_equipo",
      key: "estatus_del_equipo",
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {status?.charAt(0).toUpperCase() + status?.slice(1)}
        </Tag>
      ),
    },
    {
      title: "Acciones",
      key: "actions",
      render: (_: any, record: Equipo) => (
        <Button
          type="primary"
          icon={<EyeOutlined />}
          size="small"
          onClick={() => handleViewDetail(record.id)}
        >
          Ver Completo
        </Button>
      ),
    },
  ];

  // Si está embebido en el dashboard, mostrar solo la tabla sin el card contenedor
  if (isEmbedded) {
    return (
      <Table
        className="equipos-table"
        columns={columns}
        dataSource={equipos}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} de ${total} equipos`,
        }}
        scroll={{ x: 1200 }}
        locale={{
          emptyText: (
            <Empty
              className="equipos-table-empty"
              description="No hay equipos registrados"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          ),
        }}
      />
    );
  }

  return (
    <div className="equipos-table-container">
      <Card
        className="equipos-table-card"
        title={
          <Space>
            <TeamOutlined />
            <Title level={4} style={{ margin: 0 }}>
              Lista de Equipos
            </Title>
          </Space>
        }
        extra={
          <Button type="primary" onClick={loadEquipos} loading={loading}>
            Actualizar
          </Button>
        }
      >
        <Table
          className="equipos-table"
          columns={columns}
          dataSource={equipos}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} de ${total} equipos`,
          }}
          scroll={{ x: 1200 }}
          locale={{
            emptyText: (
              <Empty
                className="equipos-table-empty"
                description="No hay equipos registrados"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            ),
          }}
        />
      </Card>
    </div>
  );
};

export default EquiposTable;

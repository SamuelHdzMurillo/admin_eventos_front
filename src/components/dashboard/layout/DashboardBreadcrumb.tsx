import React from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrumb, Button, Space, Typography } from "antd";
import {
  HomeOutlined,
  CalendarOutlined,
  TeamOutlined,
  EyeOutlined,
  UserOutlined,
  DollarOutlined,
  SettingOutlined,
  RightOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

interface DashboardBreadcrumbProps {
  selectedKey: string;
  equipoName?: string;
}

const DashboardBreadcrumb: React.FC<DashboardBreadcrumbProps> = ({
  selectedKey,
  equipoName,
}) => {
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

export default DashboardBreadcrumb;

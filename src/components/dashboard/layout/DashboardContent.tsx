import React from "react";
import { Layout, Card, Drawer, Menu } from "antd";
import type { MenuProps } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  MessageOutlined,
  CalendarOutlined,
  TeamOutlined,
  EyeOutlined,
  ShopOutlined,
  HomeOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import EventSelector from "../events/EventSelector";
import ParticipantesTable from "../participants/ParticipantesTable";
import DashboardStats from "../stats/DashboardStats";
import EquiposTable from "../../EquiposTable";
import EquipoDetalle from "../../../pages/EquipoDetalle";
import UsuariosTable from "../../UsuariosTable";

const { Content } = Layout;

interface DashboardContentProps {
  selectedKey: string;
  selectedEquipoId: number | null;
  selectedEquipoName: string;
  onEquipoSelect: (equipoId: number) => void;
  onBackToEquipos: () => void;
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  selectedKey,
  selectedEquipoId,
  selectedEquipoName,
  onEquipoSelect,
  onBackToEquipos,
}) => {
  // Menú del sidebar para el drawer móvil
  const menuItems: MenuProps["items"] = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      type: "divider",
    },
    {
      key: "usuarios",
      icon: <UserOutlined />,
      label: "Usuarios",
    },
    {
      key: "buzon-asistencia",
      icon: <MessageOutlined />,
      label: "Buzón de Asistencia",
    },
    {
      type: "divider",
    },
    {
      key: "events",
      icon: <CalendarOutlined />,
      label: "Eventos",
    },
    {
      key: "participants",
      icon: <UserOutlined />,
      label: "Participantes",
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
      ],
    },
    {
      type: "divider",
    },
    {
      key: "restaurantes",
      icon: <ShopOutlined />,
      label: "Restaurantes",
    },
    {
      key: "hospedajes",
      icon: <HomeOutlined />,
      label: "Hospedajes",
    },
    {
      key: "lugares-interes",
      icon: <EnvironmentOutlined />,
      label: "Lugares de Interés",
    },
  ];

  const renderContent = () => {
    switch (selectedKey) {
      case "dashboard":
        return <DashboardStats onEquipoSelect={onEquipoSelect} />;

      case "events":
        return (
          <div className="dashboard-content-wrapper">
            <Card title="Gestión de Eventos" className="content-card">
              <EventSelector />
            </Card>
          </div>
        );

      case "equipos-list":
        return (
          <div className="dashboard-content-wrapper">
            <EquiposTable
              onEquipoSelect={onEquipoSelect}
              isEmbedded={true}
            />
          </div>
        );

      case "equipos":
        return (
          <div className="dashboard-content-wrapper">
            <EquiposTable
              onEquipoSelect={onEquipoSelect}
              isEmbedded={true}
            />
          </div>
        );

      case "equipo-detalle":
        if (selectedEquipoId) {
          return (
            <div className="dashboard-content-wrapper">
              <EquipoDetalle
                equipoId={selectedEquipoId}
                isEmbedded={true}
                onBackToEquipos={onBackToEquipos}
              />
            </div>
          );
        }
        return null;

      case "participants":
        return (
          <div className="dashboard-content-wrapper">
            <ParticipantesTable />
          </div>
        );

      case "usuarios":
        return (
          <div className="dashboard-content-wrapper">
            <UsuariosTable isEmbedded={true} />
          </div>
        );

      case "buzon-asistencia":
        return (
          <div className="dashboard-content-wrapper">
            <Card title="Buzón de Asistencia" className="content-card">
              <p>Aquí irá el buzón de asistencia</p>
            </Card>
          </div>
        );

      case "restaurantes":
        return (
          <div className="dashboard-content-wrapper">
            <Card title="Gestión de Restaurantes" className="content-card">
              <p>Aquí irá la gestión de restaurantes</p>
            </Card>
          </div>
        );

      case "hospedajes":
        return (
          <div className="dashboard-content-wrapper">
            <Card title="Gestión de Hospedajes" className="content-card">
              <p>Aquí irá la gestión de hospedajes</p>
            </Card>
          </div>
        );

      case "lugares-interes":
        return (
          <div className="dashboard-content-wrapper">
            <Card title="Lugares de Interés" className="content-card">
              <p>Aquí irán los lugares de interés</p>
            </Card>
          </div>
        );

      default:
        return <DashboardStats onEquipoSelect={onEquipoSelect} />;
    }
  };

  return (
    <Content className="dashboard-main">
      {renderContent()}
    </Content>
  );
};

export default DashboardContent;

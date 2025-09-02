import React from "react";
import { Drawer, Menu } from "antd";
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

interface DashboardMobileDrawerProps {
  visible: boolean;
  selectedKey: string;
  selectedEquipoId: number | null;
  onClose: () => void;
  onMenuClick: (e: any) => void;
}

const DashboardMobileDrawer: React.FC<DashboardMobileDrawerProps> = ({
  visible,
  selectedKey,
  selectedEquipoId,
  onClose,
  onMenuClick,
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

  return (
    <Drawer
      title="Menú"
      placement="left"
      onClose={onClose}
      open={visible}
      className="mobile-drawer"
    >
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        items={menuItems}
        onClick={onMenuClick}
        className="mobile-menu"
      />
    </Drawer>
  );
};

export default DashboardMobileDrawer;

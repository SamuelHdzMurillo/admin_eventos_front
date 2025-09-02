import React from "react";
import { Layout, Menu } from "antd";
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
import logo from "../../../assets/logo_cecyte_chef_sin_fondo.png";

const { Sider } = Layout;

interface DashboardSidebarProps {
  collapsed: boolean;
  selectedKey: string;
  onMenuClick: (e: any) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  collapsed,
  selectedKey,
  onMenuClick,
}) => {
  // Menú del sidebar
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
          disabled: true, // Se habilita dinámicamente
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
    <Sider
      className="dashboard-sider"
      collapsed={collapsed}
      breakpoint="lg"
      collapsedWidth="80"
      width={250}
      trigger={null}
    >
      <div className="sidebar-header">
        <div className="logo">
          <div
            className="logo-container"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{
                width: collapsed ? 48 : 120,
                height: collapsed ? 48 : 120,
                transition: "all 0.3s",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      </div>

      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        items={menuItems}
        onClick={onMenuClick}
        className="sidebar-menu"
      />

      <div className="sidebar-footer">
        {/* Footer del sidebar sin botón de logout */}
      </div>
    </Sider>
  );
};

export default DashboardSidebar;

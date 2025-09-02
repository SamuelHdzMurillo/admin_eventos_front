import React from "react";
import { Layout, Button, Typography } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MenuOutlined,
} from "@ant-design/icons";

const { Header } = Layout;
const { Title } = Typography;

interface DashboardHeaderProps {
  collapsed: boolean;
  onToggleSidebar: () => void;
  onToggleMobileDrawer: () => void;
  pageTitle: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  collapsed,
  onToggleSidebar,
  onToggleMobileDrawer,
  pageTitle,
}) => {
  return (
    <Header className="dashboard-header">
      <div className="header-left">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggleSidebar}
          className="sidebar-trigger"
        />
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={onToggleMobileDrawer}
          className="mobile-menu-trigger"
        />
      </div>

      <div className="header-content">
        <Title level={3} className="page-title">
          {pageTitle}
        </Title>
      </div>

      <div className="header-actions"></div>
    </Header>
  );
};

export default DashboardHeader;

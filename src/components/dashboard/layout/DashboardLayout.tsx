import React from "react";
import { Layout } from "antd";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import DashboardContent from "./DashboardContent";
import DashboardBreadcrumb from "./DashboardBreadcrumb";
import DashboardMobileDrawer from "./DashboardMobileDrawer";

const { Sider, Content } = Layout;

interface DashboardLayoutProps {
  collapsed: boolean;
  selectedKey: string;
  selectedEquipoId: number | null;
  selectedEquipoName: string;
  mobileDrawerVisible: boolean;
  onMenuClick: (e: any) => void;
  onToggleSidebar: () => void;
  onToggleMobileDrawer: () => void;
  onEquipoSelect: (equipoId: number) => void;
  onBackToEquipos: () => void;
  getPageTitle: () => string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  collapsed,
  selectedKey,
  selectedEquipoId,
  selectedEquipoName,
  mobileDrawerVisible,
  onMenuClick,
  onToggleSidebar,
  onToggleMobileDrawer,
  onEquipoSelect,
  onBackToEquipos,
  getPageTitle,
}) => {
  return (
    <Layout className="dashboard-layout">
      {/* Sidebar para desktop */}
      <DashboardSidebar
        collapsed={collapsed}
        selectedKey={selectedKey}
        onMenuClick={onMenuClick}
      />

      <Layout className={`dashboard-content ${collapsed ? "collapsed" : ""}`}>
        {/* Header */}
        <DashboardHeader
          collapsed={collapsed}
          onToggleSidebar={onToggleSidebar}
          onToggleMobileDrawer={onToggleMobileDrawer}
          pageTitle={getPageTitle()}
        />

        {/* Contenido principal */}
        <Layout.Content className="dashboard-main">
          {/* Breadcrumb */}
          <div className="dashboard-breadcrumb-container">
            <DashboardBreadcrumb
              selectedKey={selectedKey}
              equipoName={selectedEquipoName}
            />
          </div>

          {/* Contenido del dashboard */}
          <DashboardContent
            selectedKey={selectedKey}
            selectedEquipoId={selectedEquipoId}
            selectedEquipoName={selectedEquipoName}
            onEquipoSelect={onEquipoSelect}
            onBackToEquipos={onBackToEquipos}
          />
        </Layout.Content>
      </Layout>

      {/* Drawer para móvil */}
      <DashboardMobileDrawer
        visible={mobileDrawerVisible}
        selectedKey={selectedKey}
        selectedEquipoId={selectedEquipoId}
        onClose={onToggleMobileDrawer}
        onMenuClick={onMenuClick}
      />
    </Layout>
  );
};

export default DashboardLayout;

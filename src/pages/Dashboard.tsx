import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Dashboard.css";
import DashboardLayout from "../components/dashboard/layout/DashboardLayout";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [mobileDrawerVisible, setMobileDrawerVisible] = useState(false);
  const [selectedEquipoId, setSelectedEquipoId] = useState<number | null>(null);
  const [selectedEquipoName, setSelectedEquipoName] = useState<string>("");

  // Verificar si hay un parámetro de pestaña en la URL
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setSelectedKey(tab);
    }
  }, [searchParams]);

  const handleMenuClick = (e: any) => {
    setSelectedKey(e.key);
    setMobileDrawerVisible(false);
    // Actualizar la URL con el parámetro de pestaña
    if (e.key === "dashboard") {
      navigate("/dashboard");
    } else {
      navigate(`/dashboard?tab=${e.key}`);
    }
  };

  const handleEquipoSelect = (equipoId: number) => {
    // Aquí deberías obtener el nombre del equipo desde el servicio
    // Por ahora usamos un placeholder
    setSelectedEquipoId(equipoId);
    setSelectedEquipoName("Equipo Seleccionado");
    setSelectedKey("equipo-detalle");
    navigate(`/dashboard?tab=equipo-detalle&equipo=${equipoId}`);
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileDrawer = () => {
    setMobileDrawerVisible(!mobileDrawerVisible);
  };

  const getPageTitle = () => {
    switch (selectedKey) {
      case "dashboard":
        return "Dashboard General";
      case "events":
        return "Gestión de Eventos";
      case "equipos-list":
        return "Lista de Equipos";
      case "equipos":
        return "Gestión de Equipos";
      case "equipo-detalle":
        return `Detalle del Equipo: ${selectedEquipoName}`;
      case "participants":
        return "Gestión de Participantes";
      case "usuarios":
        return "Gestión de Usuarios";
      case "buzon-asistencia":
        return "Buzón de Asistencia";
      case "restaurantes":
        return "Gestión de Restaurantes";
      case "hospedajes":
        return "Gestión de Hospedajes";
      case "lugares-interes":
        return "Lugares de Interés";
      default:
        return "Dashboard";
    }
  };

  const onBackToEquipos = () => {
    setSelectedKey("equipos-list");
    navigate("/dashboard?tab=equipos-list");
  };

  return (
    <DashboardLayout
      collapsed={collapsed}
      selectedKey={selectedKey}
      selectedEquipoId={selectedEquipoId}
      selectedEquipoName={selectedEquipoName}
      mobileDrawerVisible={mobileDrawerVisible}
      onMenuClick={handleMenuClick}
      onToggleSidebar={toggleSidebar}
      onToggleMobileDrawer={toggleMobileDrawer}
      onEquipoSelect={handleEquipoSelect}
      onBackToEquipos={onBackToEquipos}
      getPageTitle={getPageTitle}
    />
  );
};

export default Dashboard;

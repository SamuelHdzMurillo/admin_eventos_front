import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Progress,
  Table,
  Tag,
  Avatar,
  Typography,
  Space,
  Button,
  Empty,
  Spin,
  message,
} from "antd";
import {
  TeamOutlined,
  TrophyOutlined,
  SafetyOutlined,
  AlertOutlined,
  EnvironmentOutlined,
  HeartOutlined,
  CalendarOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { eventosService } from "../../../services/eventos";
import type { Participante, Equipo } from "../../../services/eventos";

const { Text } = Typography;

interface DashboardStatsProps {
  onEquipoSelect: (equipoId: number) => void;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ onEquipoSelect }) => {
  const [participantes, setParticipantes] = useState<
    (Participante & { equipo: Equipo })[]
  >([]);
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [stats, setStats] = useState({
    totalParticipantes: 0,
    totalEquipos: 0,
    participantesConSeguro: 0,
    participantesAlergicos: 0,
    participantesPorEntidad: {} as Record<string, number>,
    tiposSangre: {} as Record<string, number>,
    especialidades: {} as Record<string, number>,
    semestres: {} as Record<string, number>,
  });

  // Cargar estadísticas dinámicas
  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      setLoadingStats(true);
      const [participantesRes, equiposRes] = await Promise.all([
        eventosService.listParticipantes(),
        eventosService.listEquipos(),
      ]);

      const participantesData = participantesRes.data;
      const equiposData = equiposRes.data;

      setParticipantes(participantesData);
      setEquipos(equiposData);

      // Calcular estadísticas
      const equiposUnicos = new Set(participantesData.map((p) => p.equipo_id));
      const participantesConSeguro = participantesData.filter(
        (p) => p.seguro_facultativo
      ).length;
      const participantesAlergicos = participantesData.filter(
        (p) => p.alergico
      ).length;

      // Estadísticas por entidad federativa
      const participantesPorEntidad: Record<string, number> = {};
      participantesData.forEach((p) => {
        const entidad = p.equipo?.entidad_federativa || "Sin especificar";
        participantesPorEntidad[entidad] =
          (participantesPorEntidad[entidad] || 0) + 1;
      });

      // Estadísticas por tipo de sangre
      const tiposSangre: Record<string, number> = {};
      participantesData.forEach((p) => {
        const tipo = p.tipo_sangre_participante || "Sin especificar";
        tiposSangre[tipo] = (tiposSangre[tipo] || 0) + 1;
      });

      // Estadísticas por especialidad
      const especialidades: Record<string, number> = {};
      participantesData.forEach((p) => {
        const especialidad = p.especialidad_participante || "Sin especificar";
        especialidades[especialidad] = (especialidades[especialidad] || 0) + 1;
      });

      // Estadísticas por semestre
      const semestres: Record<string, number> = {};
      participantesData.forEach((p) => {
        const semestre = p.semestre_participante || "Sin especificar";
        semestres[semestre] = (semestres[semestre] || 0) + 1;
      });

      setStats({
        totalParticipantes: participantesData.length,
        totalEquipos: equiposUnicos.size,
        participantesConSeguro,
        participantesAlergicos,
        participantesPorEntidad,
        tiposSangre,
        especialidades,
        semestres,
      });
    } catch (error: any) {
      console.error("Error loading dashboard stats:", error);
      message.error(
        error?.message || "No se pudo cargar las estadísticas del dashboard"
      );
    } finally {
      setLoadingStats(false);
    }
  };

  // Estadísticas dinámicas para el dashboard
  const dashboardStats = [
    {
      title: "Total de Participantes",
      value: stats.totalParticipantes,
      prefix: <TeamOutlined />,
      color: "#1890ff",
      suffix: "participantes",
      statType: "participantes",
    },
    {
      title: "Total de Equipos",
      value: stats.totalEquipos,
      prefix: <TrophyOutlined />,
      color: "#52c41a",
      suffix: "equipos",
      statType: "equipos",
    },
    {
      title: "Con Seguro Facultativo",
      value: stats.participantesConSeguro,
      prefix: <SafetyOutlined />,
      color: "#faad14",
      suffix: "participantes",
      statType: "seguro",
    },
    {
      title: "Con Alergias",
      value: stats.participantesAlergicos,
      prefix: <AlertOutlined />,
      color: "#ff4d4f",
      suffix: "participantes",
      statType: "alergias",
    },
  ];

  return (
    <div className="dashboard-content-wrapper">
      <Card title="Dashboard General" className="content-card">
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {/* Estadísticas principales */}
          <Card title="Estadísticas Generales" size="small">
            <Row gutter={[16, 16]} className="stats-row">
              {loadingStats ? (
                <Col span={24}>
                  <div style={{ textAlign: "center", padding: "20px" }}>
                    <Spin size="large" />
                    <Text style={{ display: "block", marginTop: "12px" }}>
                      Cargando estadísticas...
                    </Text>
                  </div>
                </Col>
              ) : (
                dashboardStats.map((stat, index) => (
                  <Col xs={24} sm={12} lg={6} key={index}>
                    <Card
                      className="stat-card"
                      hoverable
                      data-stat={stat.statType}
                      size="small"
                    >
                      <Statistic
                        title={stat.title}
                        value={stat.value}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                        valueStyle={{ color: stat.color }}
                      />
                    </Card>
                  </Col>
                ))
              )}
            </Row>
          </Card>

          {/* Sección de Equipos */}
          <Card
            title={
              <Space>
                <TeamOutlined />
                <span>Equipos Registrados ({equipos.length})</span>
              </Space>
            }
            extra={
              <Button
                type="link"
                icon={<EyeOutlined />}
                size="small"
                href="/dashboard?tab=equipos-list"
              >
                Ver todos
              </Button>
            }
            size="small"
          >
            {equipos.length === 0 ? (
              <Empty
                description="No hay equipos registrados"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                style={{ padding: "20px" }}
              />
            ) : (
              <Table
                dataSource={equipos.slice(0, 4)}
                pagination={false}
                size="small"
                className="equipos-table"
                scroll={{ x: "100%" }}
                onRow={(record) => ({
                  onClick: () => onEquipoSelect(record.id),
                  style: { cursor: "pointer" },
                })}
              >
                <Table.Column
                  title="Equipo"
                  dataIndex="nombre_equipo"
                  key="nombre_equipo"
                  render={(text: string) => (
                    <Space size="small">
                      <Avatar size="small" icon={<TeamOutlined />} />
                      <Text strong style={{ fontSize: "11px" }}>
                        {text}
                      </Text>
                    </Space>
                  )}
                />
                <Table.Column
                  title="Entidad"
                  dataIndex="entidad_federativa"
                  key="entidad_federativa"
                  render={(text: string) => (
                    <Text style={{ fontSize: "11px" }}>{text}</Text>
                  )}
                />
                <Table.Column
                  title="Anfitrión"
                  dataIndex="nombre_anfitrion"
                  key="nombre_anfitrion"
                  render={(text: string) => (
                    <Text style={{ fontSize: "11px" }}>{text}</Text>
                  )}
                />
                <Table.Column
                  title="Estatus"
                  dataIndex="estatus_del_equipo"
                  key="estatus_del_equipo"
                  render={(status: string) => (
                    <Tag color={status === "activo" ? "success" : "default"}>
                      {status}
                    </Tag>
                  )}
                />
              </Table>
            )}
          </Card>

          {/* Estadísticas Detalladas */}
          <Card title="Estadísticas Detalladas" size="small">
            <Row gutter={[12, 12]} className="stats-detail-section">
              {/* Participantes por entidad federativa */}
              <Col xs={24} lg={12}>
                <Card
                  title={
                    <Space size="small">
                      <EnvironmentOutlined style={{ color: "#1890ff" }} />
                      <span style={{ fontSize: "12px" }}>
                        Por Entidad Federativa
                      </span>
                    </Space>
                  }
                  className="chart-card"
                  size="small"
                >
                  {Object.entries(stats.participantesPorEntidad)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 5)
                    .map(([entidad, count], index) => (
                      <div key={index} className="participant-item">
                        <div className="participant-info">
                          <Text strong style={{ fontSize: "11px" }}>
                            {entidad}
                          </Text>
                          <Text type="secondary" style={{ fontSize: "10px" }}>
                            {count} participantes
                          </Text>
                        </div>
                        <Progress
                          percent={Math.round(
                            (count / stats.totalParticipantes) * 100
                          )}
                          strokeColor="#1890ff"
                          showInfo={false}
                          size="small"
                        />
                      </div>
                    ))}
                </Card>
              </Col>

              {/* Especialidades más populares */}
              <Col xs={24} lg={12}>
                <Card
                  title={
                    <Space size="small">
                      <TrophyOutlined style={{ color: "#52c41a" }} />
                      <span style={{ fontSize: "12px" }}>
                        Especialidades Populares
                      </span>
                    </Space>
                  }
                  className="chart-card"
                  size="small"
                >
                  {Object.entries(stats.especialidades)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 5)
                    .map(([especialidad, count], index) => (
                      <div key={index} className="participant-item">
                        <div className="participant-info">
                          <Text strong style={{ fontSize: "11px" }}>
                            {especialidad}
                          </Text>
                          <Text type="secondary" style={{ fontSize: "10px" }}>
                            {count} participantes
                          </Text>
                        </div>
                        <Progress
                          percent={Math.round(
                            (count / stats.totalParticipantes) * 100
                          )}
                          strokeColor="#52c41a"
                          showInfo={false}
                          size="small"
                        />
                      </div>
                    ))}
                </Card>
              </Col>

              {/* Distribución por tipo de sangre */}
              <Col xs={24} lg={12}>
                <Card
                  title={
                    <Space size="small">
                      <HeartOutlined style={{ color: "#ff4d4f" }} />
                      <span style={{ fontSize: "12px" }}>Tipos de Sangre</span>
                    </Space>
                  }
                  className="chart-card"
                  size="small"
                >
                  {Object.entries(stats.tiposSangre)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 5)
                    .map(([tipo, count], index) => (
                      <div key={index} className="participant-item">
                        <div className="participant-info">
                          <Text strong style={{ fontSize: "11px" }}>
                            {tipo}
                          </Text>
                          <Text type="secondary" style={{ fontSize: "10px" }}>
                            {count} participantes
                          </Text>
                        </div>
                        <Progress
                          percent={Math.round(
                            (count / stats.totalParticipantes) * 100
                          )}
                          strokeColor="#ff4d4f"
                          showInfo={false}
                          size="small"
                        />
                      </div>
                    ))}
                </Card>
              </Col>

              {/* Distribución por semestre */}
              <Col xs={24} lg={12}>
                <Card
                  title={
                    <Space size="small">
                      <CalendarOutlined style={{ color: "#722ed1" }} />
                      <span style={{ fontSize: "12px" }}>Por Semestre</span>
                    </Space>
                  }
                  className="chart-card"
                  size="small"
                >
                  {Object.entries(stats.semestres)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 5)
                    .map(([semestre, count], index) => (
                      <div key={index} className="participant-item">
                        <div className="participant-info">
                          <Text strong style={{ fontSize: "11px" }}>
                            {semestre}
                          </Text>
                          <Text type="secondary" style={{ fontSize: "10px" }}>
                            {count} participantes
                          </Text>
                        </div>
                        <Progress
                          percent={Math.round(
                            (count / stats.totalParticipantes) * 100
                          )}
                          strokeColor="#722ed1"
                          showInfo={false}
                          size="small"
                        />
                      </div>
                    ))}
                </Card>
              </Col>
            </Row>
          </Card>
        </Space>
      </Card>
    </div>
  );
};

export default DashboardStats;

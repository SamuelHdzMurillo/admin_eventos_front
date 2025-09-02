import React, { useEffect, useState } from "react";
import {
  Card,
  Space,
  Statistic,
  Table,
  Tag,
  Avatar,
  Typography,
  Button,
  Select,
  Descriptions,
  Spin,
  Empty,
  Modal,
  Form,
  Input,
  DatePicker,
  InputNumber,
  Row,
  Col,
  message,
} from "antd";
import { TeamOutlined } from "@ant-design/icons";
import { eventosService } from "../../../services/eventos";
import type { Evento, Equipo } from "../../../services/eventos";
import dayjs from "dayjs";

const { Text } = Typography;

const EventSelector: React.FC = () => {
  const [loadingList, setLoadingList] = useState(false);
  const [events, setEvents] = useState<Evento[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [detail, setDetail] = useState<Evento | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editForm] = Form.useForm();
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoadingList(true);
        const res = await eventosService.listEvents();
        setEvents(res.data || []);
      } catch (err: any) {
        message.error(err?.message || "No se pudo cargar la lista de eventos");
      } finally {
        setLoadingList(false);
      }
    };
    loadEvents();
  }, []);

  const handleSelect = async (value: number) => {
    setSelectedId(value);
    setLoadingDetail(true);
    try {
      const res = await eventosService.getEventDetail(value);
      setDetail(res.data);
    } catch (err: any) {
      message.error(err?.message || "No se pudo cargar el detalle del evento");
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleEdit = () => {
    if (detail) {
      editForm.setFieldsValue({
        nombre_evento: detail.nombre_evento,
        sede_evento: detail.sede_evento,
        inicio_evento: detail.inicio_evento
          ? dayjs(detail.inicio_evento)
          : null,
        fin_evento: detail.fin_evento ? dayjs(detail.fin_evento) : null,
        lim_de_participantes_evento: detail.lim_de_participantes_evento,
        estatus_evento: detail.estatus_evento,
      });
      setEditModalVisible(true);
    }
  };

  const handleUpdate = async (values: any) => {
    if (!detail) return;

    setUpdating(true);
    try {
      const updateData = {
        ...values,
        inicio_evento: values.inicio_evento?.toISOString(),
        fin_evento: values.fin_evento?.toISOString(),
      };

      const res = await eventosService.updateEvent(detail.id, updateData);
      setDetail(res.data);
      setEditModalVisible(false);
      message.success("Evento actualizado exitosamente");

      // Actualizar la lista de eventos
      const updatedEvents = events.map((ev) =>
        ev.id === detail.id ? res.data : ev
      );
      setEvents(updatedEvents);
    } catch (err: any) {
      message.error(err?.message || "No se pudo actualizar el evento");
    } finally {
      setUpdating(false);
    }
  };

  const formatDateTime = (iso?: string) =>
    iso ? new Date(iso).toLocaleString() : "-";

  const equiposColumns = [
    {
      title: "Equipo",
      dataIndex: "nombre_equipo",
      key: "nombre_equipo",
      render: (text: string) => (
        <Space>
          <Avatar icon={<TeamOutlined />} />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: "Entidad",
      dataIndex: "entidad_federativa",
      key: "entidad_federativa",
    },
    {
      title: "Anfitrión",
      dataIndex: "nombre_anfitrion",
      key: "nombre_anfitrion",
    },
    {
      title: "Teléfono",
      dataIndex: "telefono_anfitrion",
      key: "telefono_anfitrion",
    },
    {
      title: "Correo",
      dataIndex: "correo_anfitrion",
      key: "correo_anfitrion",
      render: (value: string) => <a href={`mailto:${value}`}>{value}</a>,
    },
    {
      title: "Estatus",
      dataIndex: "estatus_del_equipo",
      key: "estatus_del_equipo",
      render: (status: string) => (
        <Tag color={status === "activo" ? "success" : "default"}>{status}</Tag>
      ),
    },
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card>
        <Space direction="vertical" style={{ width: "100%" }} size="small">
          <Text strong>Selecciona un evento</Text>
          <Spin spinning={loadingList}>
            <Select
              showSearch
              placeholder="Buscar y seleccionar evento"
              style={{ width: "100%" }}
              optionFilterProp="label"
              value={selectedId ?? undefined}
              onChange={handleSelect}
              options={events.map((ev) => ({
                value: ev.id,
                label: ev.nombre_evento,
              }))}
            />
          </Spin>
        </Space>
      </Card>

      <Card
        title="Detalle del Evento"
        loading={loadingDetail}
        extra={
          detail && (
            <Button type="primary" onClick={handleEdit}>
              Editar Evento
            </Button>
          )
        }
      >
        {!detail ? (
          <Empty description="Selecciona un evento para ver su detalle" />
        ) : (
          <Descriptions bordered column={1} size="middle">
            <Descriptions.Item label="Nombre">
              <Text strong>{detail.nombre_evento}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Sede">
              {detail.sede_evento}
            </Descriptions.Item>
            <Descriptions.Item label="Estatus">
              <Tag
                color={
                  detail.estatus_evento === "activo" ? "success" : "default"
                }
              >
                {detail.estatus_evento}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Inicio">
              {formatDateTime(detail.inicio_evento)}
            </Descriptions.Item>
            <Descriptions.Item label="Fin">
              {formatDateTime(detail.fin_evento)}
            </Descriptions.Item>
            <Descriptions.Item label="Límite de participantes">
              {detail.lim_de_participantes_evento}
            </Descriptions.Item>
            <Descriptions.Item label="Equipos registrados">
              {detail.equipos?.length ?? 0}
            </Descriptions.Item>
            <Descriptions.Item label="Creado">
              {formatDateTime(detail.created_at)}
            </Descriptions.Item>
            <Descriptions.Item label="Actualizado">
              {formatDateTime(detail.updated_at)}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Card>

      <Card title={`Equipos (${detail?.equipos?.length ?? 0})`}>
        {!detail || (detail.equipos?.length ?? 0) === 0 ? (
          <Empty description="Sin equipos registrados" />
        ) : (
          <Table<Equipo>
            columns={equiposColumns as any}
            dataSource={detail.equipos}
            rowKey="id"
            pagination={{ pageSize: 5 }}
            scroll={{ x: 800 }}
          />
        )}
      </Card>

      {/* Modal de edición */}
      <Modal
        title="Editar Evento"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={editForm}
          layout="vertical"
          onFinish={handleUpdate}
          initialValues={{
            estatus_evento: "activo",
          }}
        >
          <Form.Item
            name="nombre_evento"
            label="Nombre del Evento"
            rules={[
              {
                required: true,
                message: "Por favor ingresa el nombre del evento",
              },
              {
                max: 255,
                message: "El nombre no puede exceder 255 caracteres",
              },
            ]}
          >
            <Input placeholder="Nombre del evento" />
          </Form.Item>

          <Form.Item
            name="sede_evento"
            label="Sede del Evento"
            rules={[
              {
                required: true,
                message: "Por favor ingresa la sede del evento",
              },
              { max: 255, message: "La sede no puede exceder 255 caracteres" },
            ]}
          >
            <Input placeholder="Sede del evento" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="inicio_evento"
                label="Fecha de Inicio"
                rules={[
                  {
                    required: true,
                    message: "Por favor selecciona la fecha de inicio",
                  },
                ]}
              >
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  style={{ width: "100%" }}
                  placeholder="Fecha de inicio"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="fin_evento"
                label="Fecha de Fin"
                rules={[
                  {
                    required: true,
                    message: "Por favor selecciona la fecha de fin",
                  },
                ]}
              >
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  style={{ width: "100%" }}
                  placeholder="Fecha de fin"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="lim_de_participantes_evento"
                label="Límite de Participantes"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa el límite de participantes",
                  },
                  {
                    type: "number",
                    min: 1,
                    message: "El límite debe ser mayor a 0",
                  },
                ]}
              >
                <InputNumber
                  min={1}
                  style={{ width: "100%" }}
                  placeholder="Límite de participantes"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="estatus_evento"
                label="Estatus del Evento"
                rules={[
                  {
                    required: true,
                    message: "Por favor selecciona el estatus",
                  },
                ]}
              >
                <Select placeholder="Selecciona el estatus">
                  <Select.Option value="activo">Activo</Select.Option>
                  <Select.Option value="inactivo">Inactivo</Select.Option>
                  <Select.Option value="cancelado">Cancelado</Select.Option>
                  <Select.Option value="finalizado">Finalizado</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ marginTop: 24, textAlign: "right" }}>
            <Space>
              <Button onClick={() => setEditModalVisible(false)}>
                Cancelar
              </Button>
              <Button type="primary" htmlType="submit" loading={updating}>
                {updating ? "Actualizando..." : "Actualizar Evento"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  );
};

export default EventSelector;

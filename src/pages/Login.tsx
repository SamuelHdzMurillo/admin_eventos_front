import React from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log("Login values:", values);
    // Aquí puedes agregar la lógica de autenticación
    message.success("Inicio de sesión exitoso!");
    navigate("/");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    message.error("Por favor, completa todos los campos correctamente.");
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <Card className="login-card">
          <div className="login-header">
            <Title level={2} className="login-title">
              Iniciar Sesión
            </Title>
            <Text type="secondary">Ingresa tus credenciales para acceder</Text>
          </div>

          <Form
            name="login"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa tu correo electrónico!",
                },
                {
                  type: "email",
                  message: "Por favor ingresa un correo electrónico válido!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Correo electrónico"
                className="login-input"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa tu contraseña!",
                },
                {
                  min: 6,
                  message: "La contraseña debe tener al menos 6 caracteres!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Contraseña"
                className="login-input"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-button"
                block
              >
                Iniciar Sesión
              </Button>
            </Form.Item>
          </Form>

          <div className="login-footer">
            <Text type="secondary">
              ¿No tienes una cuenta?{" "}
              <a href="#" onClick={() => message.info("Función en desarrollo")}>
                Regístrate aquí
              </a>
            </Text>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;

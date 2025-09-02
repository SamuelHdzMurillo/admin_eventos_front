// Tipos TypeScript del sistema

// Tipos de autenticación
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

// Tipos de eventos
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
}

// Tipos de equipos
export interface Team {
  id: string;
  name: string;
  members: User[];
  event: Event;
}

// Tipos de hospedajes
export interface Accommodation {
  id: string;
  name: string;
  address: string;
  capacity: number;
}

// Tipos de lugares
export interface Place {
  id: string;
  name: string;
  description: string;
  location: string;
}

// Tipos de restaurantes
export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
}

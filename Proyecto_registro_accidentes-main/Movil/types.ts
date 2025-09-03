export interface Evento {
  id: number;
  fecha: string; // Fecha del evento en formato ISO o similar
  tipo: string; // Tipo de evento (e.g., accidente, incidente)
  lugar: string; // Lugar donde ocurrió el evento
  persona_afectada: string; // Persona afectada por el evento
  descripcion: string; // Descripción detallada del evento
  evidencia?: string | null; // URL o referencia a la evidencia del evento
}
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import type { Evento } from '../Evento';

type Props = {
  evento: Evento;
  onActualizar: (eventoActualizado: Evento) => void;
  onEliminar: (id: number) => void;
  onVolver: () => void;
};

export default function DetalleEvento({ evento, onActualizar, onEliminar, onVolver }: Props) {
  const [tipo, setTipo] = useState(evento.tipo);
  const [descripcion, setDescripcion] = useState(evento.descripcion);
  const [fecha, setFecha] = useState(evento.fecha);
  const [lugar, setLugar] = useState(evento.lugar);
  const [personaAfectada, setPersonaAfectada] = useState(evento.persona_afectada);

  const handleActualizar = () => {
    if (!tipo || !descripcion || !fecha || !lugar || !personaAfectada) {
      Alert.alert('Error', 'Por favor completa todos los campos antes de actualizar.');
      return;
    }
    const eventoActualizado = { ...evento, tipo, descripcion, fecha, lugar, persona_afectada: personaAfectada };
    onActualizar(eventoActualizado);
  };

  const handleEliminar = () => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que deseas eliminar este evento?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => onEliminar(evento.id) },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Detalle del Evento</Text>

      {}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Tipo de Evento:</Text>
        <TextInput
          style={styles.input}
          value={tipo}
          onChangeText={setTipo}
          placeholder="Tipo de evento"
        />
      </View>

      {}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Descripción:</Text>
        <TextInput
          style={styles.input}
          value={descripcion}
          onChangeText={setDescripcion}
          placeholder="Descripción del evento"
          multiline
        />
      </View>

      {}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Fecha:</Text>
        <TextInput
          style={styles.input}
          value={fecha}
          onChangeText={setFecha}
          placeholder="Fecha del evento (YYYY-MM-DD)"
        />
      </View>

      {}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Lugar:</Text>
        <TextInput
          style={styles.input}
          value={lugar}
          onChangeText={setLugar}
          placeholder="Lugar del evento"
        />
      </View>

      {}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Persona Afectada:</Text>
        <TextInput
          style={styles.input}
          value={personaAfectada}
          onChangeText={setPersonaAfectada}
          placeholder="Persona afectada"
        />
      </View>

      {}
      <View style={styles.buttonContainer}>
        <Button title="Actualizar" onPress={handleActualizar} color="#4CAF50" />
        <Button title="Eliminar" onPress={handleEliminar} color="#F44336" />
        <Button title="Volver" onPress={onVolver} color="#2196F3" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 150,
  },
});
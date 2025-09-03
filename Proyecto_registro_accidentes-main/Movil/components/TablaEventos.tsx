import React from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import type { Evento } from '../Evento';

interface Props {
  eventos: Evento[];
  onVerDetalle: (evento: Evento) => void;
  onCrearNuevo: () => void;
  onVerEstadisticas: () => void;
}

export default function TablaEventos({ eventos, onVerDetalle, onCrearNuevo, onVerEstadisticas }: Props) {
  return (
    <View style={styles.container}>
      {/* Botones de acciones */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onCrearNuevo}>
          <Text style={styles.buttonText}>Nuevo Evento</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onVerEstadisticas}>
          <Text style={styles.buttonText}>Estadísticas</Text>
        </TouchableOpacity>
      </View>

      {}
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>Fecha</Text>
        <Text style={styles.headerCell}>Tipo</Text>
        <Text style={styles.headerCell}>Lugar</Text>
        <Text style={styles.headerCell}>Persona</Text>
        <Text style={styles.headerCell}>Acción</Text>
      </View>

      {}
      <FlatList
        data={eventos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{new Date(item.fecha).toLocaleDateString()}</Text>
            <Text style={styles.cell}>{item.tipo}</Text>
            <Text style={styles.cell}>{item.lugar}</Text>
            <Text style={styles.cell}>{item.persona_afectada}</Text>
            <TouchableOpacity onPress={() => onVerDetalle(item)}>
              <Text style={[styles.cell, styles.link]}>Ver</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay eventos registrados</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#ddd',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  headerCell: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    fontSize: 14,
    textAlign: 'center',
  },
  link: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import type { Evento } from '../Evento';

interface Props {
  eventos: Evento[];
  onVolver: () => void;
}

export default function Estadisticas({ eventos, onVolver }: Props) {
  console.log('Eventos recibidos:', eventos);

  const total = eventos.length;
  const accidentes = eventos.filter(e => e.tipo === 'Accidente').length;
  const incidentes = eventos.filter(e => e.tipo === 'Incidente').length;

  const porcentajeAccidentes = total > 0 ? ((accidentes / total) * 100).toFixed(1) : '0';
  const porcentajeIncidentes = total > 0 ? ((incidentes / total) * 100).toFixed(1) : '0';

  return (
    <View style={styles.container}>
      {total > 0 ? (
        <>
          <Text style={styles.title}>Estadísticas de Eventos</Text>
          <Text style={styles.text}>Total eventos: {total}</Text>
          <Text style={styles.text}>Accidentes: {accidentes} ({porcentajeAccidentes}%)</Text>
          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBar,
                { width: `${parseFloat(porcentajeAccidentes)}%`, backgroundColor: '#ff4d4d' },
              ]}
            />
          </View>
          <Text style={styles.text}>Incidentes: {incidentes} ({porcentajeIncidentes}%)</Text>
          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBar,
                { width: `${parseFloat(porcentajeIncidentes)}%`, backgroundColor: '#4d79ff' },
              ]}
            />
          </View>
        </>
      ) : (
        <Text style={styles.noData}>No hay datos estadísticos disponibles.</Text>
      )}
      <Button title="Volver" onPress={onVolver} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 5,
  },
  progressBar: {
    height: '100%',
    borderRadius: 5,
  },
  noData: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
});
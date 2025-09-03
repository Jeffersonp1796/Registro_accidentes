import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import FormularioEvento from './components/FormularioEvento';
import TablaEventos from './components/TablaEventos';
import DetalleEvento from './components/DetalleEvento';
import Estadisticas from './components/Estadisticas';
import type { Evento } from './Evento';

export default function App() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [selectedEvento, setSelectedEvento] = useState<Evento | null>(null);
  const [view, setView] = useState<'form' | 'list' | 'detail' | 'stats'>('list');

  const agregarEvento = (nuevoEvento: Evento) => {
    setEventos([...eventos, { ...nuevoEvento, id: Date.now() }]);
    setView('list');
  };

  const actualizarEvento = (eventoActualizado: Evento) => {
    setEventos(eventos.map(e => (e.id === eventoActualizado.id ? eventoActualizado : e)));
    setSelectedEvento(null);
    setView('list');
  };

  const eliminarEvento = (id: number) => {
    setEventos(eventos.filter(e => e.id !== id));
    setSelectedEvento(null);
    setView('list');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📋 Registro de Accidentes e Incidentes Laborales</Text>
       


      {view === 'form' && (
        <FormularioEvento onGuardar={agregarEvento} onCancelar={() => setView('list')} />
      )}
      {view === 'list' && (
        <TablaEventos
          eventos={eventos}
          onVerDetalle={(evento) => {
            setSelectedEvento(evento);
            setView('detail');
          }}
          onCrearNuevo={() => setView('form')}
          onVerEstadisticas={() => setView('stats')}
        />
      )}
      {view === 'detail' && selectedEvento && (
        <DetalleEvento
          evento={selectedEvento}
          onActualizar={actualizarEvento}
          onEliminar={eliminarEvento}
          onVolver={() => setView('list')}
        />
      )}
      {view === 'stats' && (
        <Estadisticas eventos={eventos} onVolver={() => setView('list')} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  header: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 },
});
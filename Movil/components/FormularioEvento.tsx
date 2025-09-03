import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Modal, FlatList, Alert } from 'react-native';
import type { Evento } from '../Evento';

interface Props {
  onGuardar: (evento: Evento) => void;
  onCancelar: () => void;
}

const obtenerFechaHoraActual = (): string => {
  const hoy = new Date();
  const año = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const día = String(hoy.getDate()).padStart(2, '0'); 
  const horas = String(hoy.getHours()).padStart(2, '0'); 
  const minutos = String(hoy.getMinutes()).padStart(2, '0'); 
  const segundos = String(hoy.getSeconds()).padStart(2, '0'); 
  return `${año}-${mes}-${día} ${horas}:${minutos}:${segundos}`;
};

export default function FormularioEvento({ onGuardar, onCancelar }: Props) {
  const [fecha, setFecha] = useState(obtenerFechaHoraActual());
  const [tipo, setTipo] = useState('');
  const [lugar, setLugar] = useState('');
  const [persona, setPersona] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const guardar = () => {
    if (!tipo || !lugar || !persona || !descripcion) {
      Alert.alert('Error', 'Complete todos los campos');
      return;
    }

    onGuardar({
      id: Date.now(),
      fecha,
      tipo,
      lugar,
      persona_afectada: persona,
      descripcion,
    });
  };

  const opcionesTipo = ['Accidente', 'Incidente'];

  return (
    <View style={styles.container}>
      {}
      <Text>Fecha y Hora</Text>
      <TextInput
        style={styles.input}
        value={fecha}
        editable={false}
      />

      {}
      <Text>Tipo</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.dropdownText}>
          {tipo || 'Seleccione un tipo'}
        </Text>
      </TouchableOpacity>

      {}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Seleccione un tipo</Text>
            <FlatList
              data={opcionesTipo}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    setTipo(item);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {}
      <Text>Lugar</Text>
      <TextInput
        style={styles.input}
        value={lugar}
        onChangeText={setLugar}
        placeholder="Lugar del evento"
      />

      {}
      <Text>Persona afectada</Text>
      <TextInput
        style={styles.input}
        value={persona}
        onChangeText={setPersona}
        placeholder="Nombre de la persona afectada"
      />

      {}
      <Text>Descripción</Text>
      <TextInput
        style={styles.input}
        value={descripcion}
        onChangeText={setDescripcion}
        placeholder="Descripción del evento"
        multiline
      />

      {}
      <View style={styles.buttonContainer}>
        <Button title="Guardar" onPress={guardar} />
        <Button title="Cancelar" onPress={onCancelar} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 5,
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#f9f9f9',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 4,
    backgroundColor: '#f9f9f9',
    marginVertical: 5,
  },
  dropdownText: {
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
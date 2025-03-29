import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { PaperProvider, TextInput, Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';

export default function App() {
  let [cep, setCep] = useState('');
  let [nome, setNome] = useState('');
  let [idade, setIdade] = useState('');
  let [numero, setNumero] = useState('');
  let [dados, setDados] = useState({});
  let [complemento, setComplemento] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const buscacep = (xcep) => {
    if (xcep.trim() !== '') {
      setDados({});
      setSelectedValue('');
      let url = `https://viacep.com.br/ws/${xcep}/json/`;

      fetch(url)
        .then((resp) => resp.json())
        .then((dados) => {
          if (!dados.erro) {
            setDados(dados);
            setSelectedValue(dados.uf);
          }
        })
        .catch((x) => {
          console.log(x);
        });
    }
  };

  const handleSubmit = () => {
    setCep('');
    setNome('');
    setIdade('');
    setNumero('');
    setDados({});
    setComplemento('');
    setSelectedValue('');
    setModalVisible(true);
  };

  const handleClear = () => {
    setCep('');
    setNome('');
    setIdade('');
    setNumero('');
    setDados({});
    setComplemento('');
    setSelectedValue('');
  };

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.text_title}>Insira Sua Informações:</Text>
        <TextInput label='Nome' mode='outlined' value={nome} onChangeText={setNome} style={styles.input} />
        <TextInput label='Idade' mode='outlined' value={idade} onChangeText={setIdade} style={styles.input} />
        
        <Text style={styles.text_title}>Insira o Seu Endereço:</Text>
        <TextInput
          label='CEP'
          mode='outlined'
          value={cep}
          onChangeText={(value) => {
            const numericValue = value.replace(/[^0-9]/g, '');
            setCep(numericValue);
            buscacep(numericValue);
          }}
          keyboardType='numeric'
          maxLength={8}
          style={styles.input}
        />
        
        <TextInput label='Rua' mode='outlined' value={dados.logradouro || ''} onChangeText={(value) => setDados({ ...dados, logradouro: value })} style={styles.input} />
        <TextInput label='Número' mode='outlined' value={numero} onChangeText={setNumero} style={styles.input} />
        <TextInput label='Complemento' mode='outlined' value={complemento} onChangeText={setComplemento} style={styles.input} />
        <TextInput label='Bairro' mode='outlined' value={dados.bairro || ''} onChangeText={(value) => setDados({ ...dados, bairro: value })} style={styles.input} />
        <TextInput label='Cidade' mode='outlined' value={dados.localidade || ''} onChangeText={(value) => setDados({ ...dados, localidade: value })} style={styles.input} />
      
        <Text style={styles.text_title}>Estado:</Text>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label='Selecione o Estado' value='' />
          <Picker.Item label='AC' value='AC' />
          <Picker.Item label='AL' value='AL' />
          <Picker.Item label='AP' value='AP' />
          <Picker.Item label='AM' value='AM' />
          <Picker.Item label='BA' value='BA' />
          <Picker.Item label='CE' value='CE' />
          <Picker.Item label='DF' value='DF' />
          <Picker.Item label='ES' value='ES' />
          <Picker.Item label='GO' value='GO' />
          <Picker.Item label='MA' value='MA' />
          <Picker.Item label='MT' value='MT' />
          <Picker.Item label='MS' value='MS' />
          <Picker.Item label='MG' value='MG' />
          <Picker.Item label='PA' value='PA' />
          <Picker.Item label='PB' value='PB' />
          <Picker.Item label='PR' value='PR' />
          <Picker.Item label='PE' value='PE' />
          <Picker.Item label='PI' value='PI' />
          <Picker.Item label='RJ' value='RJ' />
          <Picker.Item label='RN' value='RN' />
          <Picker.Item label='RS' value='RS' />
          <Picker.Item label='RO' value='RO' />
          <Picker.Item label='RR' value='RR' />
          <Picker.Item label='SC' value='SC' />
          <Picker.Item label='SP' value='SP' />
          <Picker.Item label='SE' value='SE' />
          <Picker.Item label='TO' value='TO' />
        </Picker>
        
        <View style={styles.buttonContainer}>
          <Button mode='contained' onPress={handleSubmit} style={styles.button}>Enviar</Button>
          <Button mode='outlined' onPress={handleClear} style={styles.button}>Limpar Campos</Button>
        </View>
        <StatusBar style='auto' />
      </ScrollView>
          {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Informações enviadas com sucesso!</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>



    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  picker: {
    width: '85%',
    height: 50,
    marginBottom: 12,
  },
  text_title: {
    color: '#000',
    fontSize: 18,
    marginTop: 15,
    marginBottom: 5,
  },
  input: {
    marginBottom: 12,
    width: '85%',
    borderRadius: 25,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    height: 45,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    marginTop: 15,
  },
  button: {
    borderRadius: 20,
    height: 45,
    justifyContent: 'center',
    width: '48%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import { List, PaperProvider, TextInput, Button } from 'react-native-paper';
import { useState } from 'react';

export default function App() {
  let [cep, setCep] = useState('');
  let [nome, setNome] = useState('');
  let [idade, setIdade] = useState('');
  let [numero, setNumero] = useState('');
  let [dados, setDados] = useState({});
  let [complemento, setComplemento] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  // Para tornar o app mais responsivo
  const { width } = Dimensions.get('window');

  const handlePress = () => { setExpanded(!expanded); };

  const handleItemPress = (value) => {
    setSelectedValue(value);
    setExpanded(false);
  };

  const buscacep = (xcep) => {
    // Reseta os dados antes de buscar um novo CEP
    setDados({});
    let url = `https://viacep.com.br/ws/${xcep}/json/`;

    fetch(url)
      .then((resp) => resp.json())
      .then((dados) => {
        setDados(dados);
        setSelectedValue(dados.uf);
      })
      .catch((x) => {
        console.log(x);
      });
  };

  const handleSubmit = () => {
    // Limpa todos os campos
    setCep('');
    setNome('');
    setIdade('');
    setNumero('');
    setDados({});
    setComplemento('');
    setSelectedValue(null);
    setExpanded(false);
  };

  const handleClear = () => {
    // Limpa todos os campos sem submeter o formulário
    setCep('');
    setNome('');
    setIdade('');
    setNumero('');
    setDados({});
    setComplemento('');
    setSelectedValue(null);
    setExpanded(false);
  };

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          label='Nome'
          mode='outlined'
          value={nome}
          onChangeText={(value) => setNome(value)}
          style={[styles.input, { width: width * 0.8 }]} // Largura ajustada
        />

        <TextInput
          label='Idade'
          mode='outlined'
          value={idade}
          onChangeText={(value) => setIdade(value)}
          style={[styles.input, { width: width * 0.8 }]} // Largura ajustada
        />

        <TextInput
          label="CEP"
          value={cep}
          onChangeText={(value) => {
            setCep(value);
            buscacep(value);
          }}
          mode='outlined'
          keyboardType='numeric'
          onBlur={() => { buscacep(cep) }}
          style={[styles.input, { width: width * 0.8 }]} // Largura ajustada
        />
        <TextInput
          label='Rua'
          mode='outlined'
          value={dados.logradouro || ''}
          onChangeText={(value) => { setDados({ ...dados, logradouro: value }) }}
          style={[styles.input, { width: width * 0.8 }]} // Largura ajustada
        />

        <TextInput
          label='Número'
          mode='outlined'
          value={numero}
          onChangeText={(value) => setNumero(value)}
          style={[styles.input, { width: width * 0.8 }]} // Largura ajustada
        />

        <TextInput
          label='Complemento'
          mode='outlined'
          value={complemento}
          onChangeText={(value) => setComplemento(value)}
          style={[styles.input, { width: width * 0.8 }]} // Largura ajustada
        />

        <TextInput
          label='Bairro'
          mode='outlined'
          value={dados.bairro || ''}
          onChangeText={(value) => { setDados({ ...dados, bairro: value }) }}
          style={[styles.input, { width: width * 0.8 }]} // Largura ajustada
        />

        <TextInput
          label='Cidade'
          mode='outlined'
          value={dados.localidade || ''}
          onChangeText={(value) => { setDados({ ...dados, localidade: value }) }}
          style={[styles.input, { width: width * 0.8 }]} // Largura ajustada
        />

        <TextInput
          label='Estado'
          mode='outlined'
          value={selectedValue || ''}
          onChangeText={(value) => { setSelectedValue(value) }}
          style={[styles.input, { width: width * 0.8 }]} // Largura ajustada
        />

        <List.Section title='Estado'>
          <List.Accordion title={selectedValue == null ? 'Selecione o Estado' : selectedValue}
            expanded={expanded} onPress={handlePress}>
            <List.Item title="AC" onPress={() => { handleItemPress('AC') }} />
            <List.Item title="SP" onPress={() => { handleItemPress('SP') }} />
            <List.Item title="RJ" onPress={() => { handleItemPress('RJ') }} />
            <List.Item title="BH" onPress={() => { handleItemPress('BH') }} />
          </List.Accordion>
        </List.Section>

        <Text style={styles.textoCep}>{dados.logradouro || ''}</Text>

        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={handleSubmit} style={styles.button}>
            Enviar
          </Button>
          <Button mode="outlined" onPress={handleClear} style={styles.button}>
            Limpar Campos
          </Button>
        </View>

        <StatusBar style="auto" />
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,  // Permite o conteúdo crescer e o ScrollView rolar
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20, // Ajuste da distância das bordas
    paddingVertical: 10, // Adiciona espaço entre as caixas de texto e os botões
  },
  input: {
    marginBottom: 10,
  },
  textoCep: {
    color: 'white',
  },
  button: {
    marginTop: 20,
    width: '45%',
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
});

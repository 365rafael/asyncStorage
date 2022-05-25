/**
 * instalar AsyncStorage: npm install @react-native-async-storage/async-storage
 *
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Keyboard
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      nome: '',
    };

    this.gravaNome = this.gravaNome.bind(this);
  }
// componentDidMount - quando o componente é montado em tela
async componentDidMount(){
  await AsyncStorage.getItem('nome').then((value)=>{
    this.setState({nome: value});
  })
}

//componentDidUpdate - toda vez que um state é atualizado, fazer algo
async componentDidUpdate(_, prevState){
  const nome = this.state.nome; //desconstrução pra nao precisar escrever this.state.nome, basta agora escrever nome
  if(prevState !== nome){
    await AsyncStorage.setItem('nome', nome);
  }

}

  gravaNome() {
    this.setState({
      nome: this.state.input,
    });
    alert('Salvo com sucesso!');
    Keyboard.dismiss();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewInput}>
          <TextInput
            style={styles.input}
            value={this.state.input}
            onChangeText={text => this.setState({input: text})}
            underlineColorAndroid="transparent"
          />
          <TouchableOpacity onPress={this.gravaNome}>
            <Text style={styles.botao}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.nome}>{this.state.nome}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItens: 'Center',
  },
  viewInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
    margin: 10,
  },
  botao: {
    backgroundColor: '#222',
    color: '#FFF',
    height: 40,
    padding: 10,
    marginLeft: 4,
  },
  nome: {
    fontSize: 30,
    textAlign: 30,
    textAlign: 'center',
  },
});

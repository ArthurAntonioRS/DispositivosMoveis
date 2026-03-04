import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function RootLayout() {
  const [tela, setTela] = useState<string>("");
  const [numero1, setNumero1] = useState<number | null>(null);
  const [operacao, setOperacao] = useState<string | null>(null);

  function limpar(): void {
  setTela("");
  setNumero1(null);
  setOperacao(null);
  }

  function clicarNumero(valor: string): void {
    setTela(tela + valor);
  }

  function clicarOperacao(op: string): void {
    if (tela === "") return;

    setNumero1(parseFloat(tela));
    setOperacao(op);
    setTela("");
  }

  function calcular(): void {
    if (tela === "" || numero1 === null || operacao === null) return;

    const numero2 = parseFloat(tela);
    let resultado: number = 0;

    if (operacao === "+") {
      resultado = numero1 + numero2;
    } else if (operacao === "-") {
      resultado = numero1 - numero2;
    } else if (operacao === "**") {
      resultado = numero1 ** numero2;
    } else if (operacao === "*") {
      resultado = numero1 * numero2;
    } else if (operacao === "/") {
      
      if (numero2 === 0) {
        setTela("Erro");
        return;
      }
      resultado = numero1 / numero2;
    }

    setTela(resultado.toString());
    setNumero1(null);
    setOperacao(null);
  }

  function raiz(): void {
    if (tela === "" || numero1 === null || operacao === null) return;

    let resultado: number = 0;
    resultado = Math.sqrt(numero1);

    setTela(resultado.toString());
  }

  return (
    <View style={styles.quadrado}>

      <View style={styles.tela}>
        <Text style={styles.telaTexto}>
          {tela === "" ? "0" : tela}
        </Text>
      </View>

      <View style={styles.linha}>
        <Botao texto="/" onPress={() => clicarOperacao("/")} />
        <Botao texto="*" onPress={() => clicarOperacao("*")} />
        <Botao texto="-" onPress={() => clicarOperacao("-")} />
        <Botao texto="+" onPress={() => clicarOperacao("+")} />
      </View>

      <View style={styles.linha}>
        <Botao texto="6" onPress={() => clicarNumero("6")} />
        <Botao texto="7" onPress={() => clicarNumero("7")} />
        <Botao texto="8" onPress={() => clicarNumero("8")} />
        <Botao texto="9" onPress={() => clicarNumero("9")} />
      </View>

      <View style={styles.linha}>
        <Botao texto="2" onPress={() => clicarNumero("2")} />
        <Botao texto="3" onPress={() => clicarNumero("3")} />
        <Botao texto="4" onPress={() => clicarNumero("4")} />
        <Botao texto="5" onPress={() => clicarNumero("5")} />
      </View>

      <View style={styles.linha}>
        <Botao texto="," onPress={() => clicarNumero(".")} />
        <Botao texto="0" onPress={() => clicarNumero("0")} />
        <Botao texto="1" onPress={() => clicarNumero("1")} />
        <Botao texto="=" onPress={calcular} />
      </View>

      <View style={styles.linha}>
        <Botao texto="C" onPress={limpar} />
        <Botao texto="Potencia" onPress={() => clicarOperacao("**")} />
        <Botao texto="Raiz" onPress={() => raiz()} />
      </View>

    </View>
  );
}

type BotaoProps = {
  texto: string;
  onPress: () => void;
};

function Botao({ texto, onPress }: BotaoProps) {
  return (
    <TouchableOpacity style={styles.botao} onPress={onPress}>
      <Text style={styles.botaoTexto}>{texto}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  quadrado: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },

  tela: {
    marginBottom: 20,
    alignItems: 'flex-end',
    borderRadius: 8,
    borderColor: '#0f0f0f',
    borderWidth: 1
  },

  telaTexto: {
    fontSize: 40,
  },

  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  botao: {
    backgroundColor: '#ddd',
    padding: 20,
    flex: 1,
    margin: 5,
    alignItems: 'center',
    borderRadius: 8,
    borderColor: '#0f0f0f',
    borderWidth: 1
  },

  botaoTexto: {
    fontSize: 22,
  }

});
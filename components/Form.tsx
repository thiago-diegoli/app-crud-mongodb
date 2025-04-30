import { Usuario } from "@/types/usuario";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  Card,
  Title,
  TextInput,
  Button,
  SegmentedButtons,
} from "react-native-paper";

interface FormProps {
  usuario?: Usuario | null;
  onSave: (id: string | undefined, usuarioData: Usuario) => void;
  onCancel: () => void;
}

const Form = ({ usuario, onSave, onCancel }: FormProps) => {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [sexo, setSexo] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (usuario) {
      setNome(usuario.nome || "");
      setIdade(usuario.idade ? String(usuario.idade) : "");
      setSexo(usuario.sexo || "");
    } else {
      setNome("");
      setIdade("");
      setSexo("");
    }
  }, [usuario]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!nome.trim()) {
      newErrors.nome = "Nome é obrigatório";
    }

    if (!idade.trim()) {
      newErrors.idade = "Idade é obrigatória";
    } else if (isNaN(Number(idade)) || Number(idade) < 0) {
      newErrors.idade = "Idade deve ser um número positivo";
    }

    if (!sexo.trim()) {
      newErrors.sexo = "Sexo é obrigatório";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const usuarioData: Usuario = {
      nome,
      idade: Number(idade),
      sexo,
    };
    onSave(usuario?._id, usuarioData);
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{usuario ? "Editar Usuário" : "Adicionar Usuário"}</Title>

        <TextInput
          label="Nome"
          value={nome}
          onChangeText={setNome}
          mode="outlined"
          style={styles.input}
          error={!!errors.nome}
        />
        {errors.nome ? (
          <Text style={styles.errorText}>{errors.nome}</Text>
        ) : null}

        <TextInput
          label="Idade"
          value={idade}
          onChangeText={setIdade}
          mode="outlined"
          style={styles.input}
          error={!!errors.idade}
          keyboardType="numeric"
        />
        {errors.idade ? (
          <Text style={styles.errorText}>{errors.idade}</Text>
        ) : null}

        <Text style={styles.label}>Sexo</Text>
        <SegmentedButtons
          value={sexo}
          onValueChange={setSexo}
          buttons={[
            { value: "M", label: "Masculino" },
            { value: "F", label: "Feminino" },
          ]}
          style={styles.segmentedControl}
        />
        {errors.sexo ? (
          <Text style={styles.errorText}>{errors.sexo}</Text>
        ) : null}

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={handleSave}
            style={styles.saveButton}
          >
            Salvar
          </Button>
          <Button
            mode="contained"
            onPress={onCancel}
            style={styles.cancelButton}
          >
            Cancelar
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 16,
    elevation: 2,
  },
  input: {
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    marginTop: 8,
    marginBottom: 4,
  },
  segmentedControl: {
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
  },
  saveButton: {
    marginRight: 8,
    backgroundColor: "#4CAF50",
  },
  cancelButton: {
    backgroundColor: "#F44336",
  },
  errorText: {
    color: "#F44336",
    marginBottom: 8,
  },
});

export default Form;

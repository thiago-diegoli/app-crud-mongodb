import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  Card,
  Title,
  TextInput,
  Button,
  SegmentedButtons,
} from "react-native-paper";

interface User {
  _id?: string;
  name: string;
  idade: number;
  sexo: string;
}

interface UserFormProps {
  user?: User | null;
  onSave: (id: string | undefined, userData: User) => void;
  onCancel: () => void;
}

const UserForm = ({ user, onSave, onCancel }: UserFormProps) => {
  const [name, setName] = useState("");
  const [idade, setIdade] = useState("");
  const [sexo, setSexo] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setIdade(user.idade ? String(user.idade) : "");
      setSexo(user.sexo || "");
    } else {
      setName("");
      setIdade("");
      setSexo("");
    }
  }, [user]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = "Nome é obrigatório";
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

    const userData: User = {
      name,
      idade: Number(idade),
      sexo,
    };
    onSave(user?._id, userData);
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{user ? "Editar Usuário" : "Adicionar Usuário"}</Title>

        <TextInput
          label="Nome"
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={styles.input}
          error={!!errors.name}
        />
        {errors.name ? (
          <Text style={styles.errorText}>{errors.name}</Text>
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
            { value: "Masculino", label: "Masculino" },
            { value: "Feminino", label: "Feminino" },
            { value: "Outro", label: "Outro" },
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
            mode="outlined"
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
    borderColor: "#F44336",
  },
  errorText: {
    color: "#F44336",
    marginBottom: 8,
  },
});

export default UserForm;

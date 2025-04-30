import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Provider as PaperProvider,
  ActivityIndicator,
  Snackbar,
} from "react-native-paper";

import Tabela from "../components/Tabela";
import Form from "../components/Form";

import buscarUsuarios from "../services/usuario/buscarUsuarios";
import criarUsuario from "../services/usuario/criarUsuario";
import atualizarUsuario from "../services/usuario/atualizarUsuario";
import deletarUsuario from "../services/usuario/deletarUsuario";
import { Usuario } from "@/types/usuario";

export default function HomePage() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const data = await buscarUsuarios();
      setUsuarios(data);
      setError(null);
    } catch (err) {
      setError("Falha ao carregar usuários");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const adicionar = async (_id: string | undefined, dadosUsuario: Usuario) => {
    try {
      await criarUsuario(
        dadosUsuario.nome,
        dadosUsuario.idade,
        dadosUsuario.sexo
      );
      setMessage("Usuário adicionado com sucesso!");
      await fetchUsuarios();
      setIsFormVisible(false);
    } catch (err) {
      setError("Erro ao adicionar usuário");
    }
  };

  const editar = async (id: string | undefined, dadosUsuario: Usuario) => {
    if (!id) return;
    try {
      await atualizarUsuario(id, dadosUsuario);
      setMessage("Usuário atualizado com sucesso!");
      await fetchUsuarios();
      setSelectedUsuario(null);
      setIsFormVisible(false);
    } catch (err) {
      setError("Erro ao atualizar usuário");
    }
  };

  const deletar = async (id: string) => {
    try {
      await deletarUsuario(id);
      setMessage("Usuário removido com sucesso!");
      await fetchUsuarios();
    } catch (err) {
      setError("Erro ao excluir usuário");
    }
  };

  const abrirForm = (usuario: Usuario) => {
    setSelectedUsuario(usuario);
    setIsFormVisible(true);
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {loading ? (
            <ActivityIndicator animating={true} size="large" />
          ) : (
            <>
              <Tabela
                usuarios={usuarios}
                onEdit={abrirForm}
                onDelete={deletar}
                onAddNew={() => {
                  setSelectedUsuario(null);
                  setIsFormVisible(true);
                }}
              />

              {isFormVisible && (
                <Form
                  usuario={selectedUsuario}
                  onSave={selectedUsuario ? editar : adicionar}
                  onCancel={() => {
                    setIsFormVisible(false);
                    setSelectedUsuario(null);
                  }}
                />
              )}
            </>
          )}
        </ScrollView>

        <Snackbar
          visible={!!message || !!error}
          onDismiss={() => {
            setMessage("");
            setError(null);
          }}
          duration={3000}
          style={error ? styles.errorSnackbar : styles.successSnackbar}
        >
          {message || error}
        </Snackbar>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    padding: 16,
  },
  successSnackbar: {
    backgroundColor: "#4CAF50",
  },
  errorSnackbar: {
    backgroundColor: "#F44336",
  },
});

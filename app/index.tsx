import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Provider as PaperProvider,
  ActivityIndicator,
  Snackbar,
} from "react-native-paper";

import UserTable from "../components/UserTable";
import UserForm from "../components/UserForm";

import getAllUsers from "../services/user/get";
import createUser from "../services/user/create";
import updateUser from "../services/user/put";
import deleteUser from "../services/user/delete";

interface User {
  _id?: string;
  name: string;
  idade: number;
  sexo: string;
}

export default function HomePage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError("Falha ao carregar usuários");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (_id: string | undefined, userData: User) => {
    try {
      await createUser(userData.name, userData.idade, userData.sexo);
      setMessage("Usuário adicionado com sucesso!");
      await fetchUsers();
      setIsFormVisible(false);
    } catch (err) {
      setError("Erro ao adicionar usuário");
    }
  };

  const handleEditUser = async (id: string | undefined, userData: User) => {
    if (!id) return;
    try {
      await updateUser(id, userData);
      setMessage("Usuário atualizado com sucesso!");
      await fetchUsers();
      setSelectedUser(null);
      setIsFormVisible(false);
    } catch (err) {
      setError("Erro ao atualizar usuário");
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser(id);
      setMessage("Usuário removido com sucesso!");
      await fetchUsers();
    } catch (err) {
      setError("Erro ao excluir usuário");
    }
  };

  const openEditForm = (user: User) => {
    setSelectedUser(user);
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
              <UserTable
                users={users}
                onEdit={openEditForm}
                onDelete={handleDeleteUser}
                onAddNew={() => {
                  setSelectedUser(null);
                  setIsFormVisible(true);
                }}
              />

              {isFormVisible && (
                <UserForm
                  user={selectedUser}
                  onSave={selectedUser ? handleEditUser : handleAddUser}
                  onCancel={() => {
                    setIsFormVisible(false);
                    setSelectedUser(null);
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

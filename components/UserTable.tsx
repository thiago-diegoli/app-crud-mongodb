import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { DataTable, FAB, Card, Title, IconButton, Text } from 'react-native-paper';

interface User {
  _id: string;
  name: string;
  idade: number;
  sexo: string;
}

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
  onAddNew: () => void;
}

const UserTable = ({ users, onEdit, onDelete, onAddNew }: UserTableProps) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.headerContainer}>
          <Title>Lista de Usuários</Title>
        </View>
        
        <ScrollView horizontal>
          <DataTable style={styles.table}>
            <DataTable.Header>
              <DataTable.Title>Nome</DataTable.Title>
              <DataTable.Title>Idade</DataTable.Title>
              <DataTable.Title>Sexo</DataTable.Title>
              <DataTable.Title>Ações</DataTable.Title>
            </DataTable.Header>

            {users.length === 0 ? (
              <DataTable.Row>
                <DataTable.Cell>
                  <Text>Nenhum usuário cadastrado</Text>
                </DataTable.Cell>
                <DataTable.Cell><Text>-</Text></DataTable.Cell>
                <DataTable.Cell><Text>-</Text></DataTable.Cell>
                <DataTable.Cell><Text> </Text></DataTable.Cell>
              </DataTable.Row>
            ) : (
              users.map((user) => (
                <DataTable.Row key={user._id}>
                  <DataTable.Cell>{user.name}</DataTable.Cell>
                  <DataTable.Cell>{user.idade}</DataTable.Cell>
                  <DataTable.Cell>{user.sexo}</DataTable.Cell>
                  <DataTable.Cell>
                    <View style={styles.actionsContainer}>
                      <IconButton 
                        icon="pencil" 
                        size={20} 
                        onPress={() => onEdit(user)} 
                        iconColor="#4CAF50"
                      />
                      <IconButton 
                        icon="delete" 
                        size={20} 
                        onPress={() => onDelete(user._id)} 
                        iconColor="#F44336"
                      />
                    </View>
                  </DataTable.Cell>
                </DataTable.Row>
              ))
            )}
          </DataTable>
        </ScrollView>
      </Card.Content>

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={onAddNew}
        color="#fff"
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  table: {
    minWidth: 400,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#2196F3',
  },
});

export default UserTable;
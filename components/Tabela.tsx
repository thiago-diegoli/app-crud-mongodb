import { Usuario } from '@/types/usuario';
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { DataTable, FAB, Card, Title, IconButton, Text } from 'react-native-paper';

interface TabelaProps {
  usuarios: Usuario[];
  onEdit: (usuario: Usuario) => void;
  onDelete: (id: string) => void;
  onAddNew: () => void;
}

const Tabela = ({ usuarios, onEdit, onDelete, onAddNew }: TabelaProps) => {
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

            {usuarios.length === 0 ? (
              <DataTable.Row>
                <DataTable.Cell>
                  <Text>Nenhum usuário cadastrado</Text>
                </DataTable.Cell>
                <DataTable.Cell><Text>-</Text></DataTable.Cell>
                <DataTable.Cell><Text>-</Text></DataTable.Cell>
                <DataTable.Cell><Text> </Text></DataTable.Cell>
              </DataTable.Row>
            ) : (
              usuarios.map((usuario) => (
                <DataTable.Row key={usuario._id}>
                  <DataTable.Cell>{usuario.nome}</DataTable.Cell>
                  <DataTable.Cell>{usuario.idade}</DataTable.Cell>
                  <DataTable.Cell>{usuario.sexo}</DataTable.Cell>
                  <DataTable.Cell>
                    <View style={styles.actionsContainer}>
                      <IconButton 
                        icon="pencil" 
                        size={20} 
                        onPress={() => onEdit(usuario)} 
                        iconColor="#4CAF50"
                      />
                      <IconButton 
                        icon="delete" 
                        size={20} 
                        onPress={() => usuario._id && onDelete(usuario._id)} 
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

export default Tabela;
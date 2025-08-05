import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import UserItem from '../Item/UserItem';

export default function UserList() {
  const users = useSelector(state => state.users.list);
  const loading = useSelector(state => state.users.loading);
  const searchText = useSelector(state => state.users.searchText);

  if (loading) return <Text style={styles.loading}>Fetching...</Text>;

  if (!searchText.trim()) {
    return <Text style={styles.explore}>Explore Github Users Data Here</Text>;
  }

  if (!users.length) return <Text style={styles.empty}>No Record found</Text>;

  return (
    <FlatList
      data={users}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => <UserItem user={item} />}
      contentContainerStyle={{ paddingBottom: 100 }}
    />
  );
}

const styles = StyleSheet.create({
  loading: {
    margin: 20,
    fontSize: 16,
  },
  empty: {
    margin: 20,
    fontSize: 16,
    fontStyle: 'italic',
  },
  explore: {
    margin: 20,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

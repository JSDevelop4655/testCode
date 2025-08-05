import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import SearchInput from '../src/component/Input/SearchInput';
import UserList from '../src/component/List/UserList';
import UserModal from '../src/component/UserModal/UserModal';
import { store } from '../src/store';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <SearchInput />
        <UserList />
        <UserModal />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});

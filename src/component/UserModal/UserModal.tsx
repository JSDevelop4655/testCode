import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedUser } from '../../store/usersSlice';

export default function UserModal() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.selectedUser);
  const isVisible = !!user;

  const onClose = () => {
    dispatch(clearSelectedUser());
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      useNativeDriver
    >
      {user && (
        <View style={styles.modal}>
          <Image source={{ uri: user.avatar_url }} style={styles.avatar} />
          <Text style={styles.name}>{user.name || user.login}</Text>
          <Text>Location: {user.location || 'N/A'}</Text>
          <Text>Followers: {user.followers}</Text>
          <Text>Following: {user.following}</Text>

          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={{ color: 'white' }}>Close</Text>
          </TouchableOpacity>
        </View>
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    marginBottom: 10,
  },
  closeBtn: {
    marginTop: 20,
    backgroundColor: 'blue',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 5,
  },
});

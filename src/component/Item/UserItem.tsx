import React from 'react';
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { fetchUserDetails } from '../../store/usersSlice';

export default function UserItem({ user }) {
  const dispatch = useDispatch();

  const openProfile = () => {
    Linking.openURL(user.html_url);
  };

  const onPressName = () => {
    dispatch(fetchUserDetails(user.login));
  };

  return (
    <View style={styles.container}>
      <Image
      
      source={{ uri: user.avatar_url }} style={styles.avatar} />
      <View style={styles.info}>
        <TouchableOpacity onPress={onPressName}>
          <Text style={styles.name}>{user.login}</Text>
        </TouchableOpacity>
        <Text style={styles.link} onPress={openProfile}>GitHub Profile</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  info: {
    marginLeft: 12,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  link: {
    color: 'gray',
    fontSize: 12,
  },
});

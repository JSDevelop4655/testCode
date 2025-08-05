import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { clearUsers, searchUsers, setSearchText } from '../../store/usersSlice';

export default function SearchInput() {
  const [text, setTextLocal] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchText(text)); 

    const handler = setTimeout(() => {
      if (text.trim()) {
        dispatch(searchUsers(text));
      } else {
        dispatch(clearUsers());
      }
    }, 1000);

    return () => clearTimeout(handler);
  }, [text]);

  const clearInput = () => {
    setTextLocal('');
    dispatch(setSearchText(''));
    dispatch(clearUsers());
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search Users"
        value={text}
        onChangeText={setTextLocal}
        autoCapitalize="none"
      />
      {text.length > 0 && (
        <TouchableOpacity onPress={clearInput} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>×</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 12,
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 5,
    paddingRight: 30, 
  },
  clearButton: {
    position: 'absolute',
    right: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 18,
    color: 'gray',
  },
});

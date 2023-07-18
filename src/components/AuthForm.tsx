import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export type AuthFormProps = {
  onSubmit: () => void;
  buttonText: string;
  promptText: string;
  PromptActionText: string;
  onPromptActionPress: () => void;
  fields: { label: string; fieldName: string }[];
};

const AuthForm = ({
  onSubmit,
  buttonText,
  promptText,
  PromptActionText,
  onPromptActionPress,
  fields,
}: AuthFormProps) => {
  const handleFormSubmit = () => {
    onSubmit();
  };

  return (
    <View style={styles.container}>
      {fields.map((field) => (
        <View key={field.fieldName} style={styles.fieldContainer}>
          <Text>{field.label}</Text>
          <TextInput
            style={styles.input}
            placeholder={field.fieldName}
            secureTextEntry={field.fieldName.toLowerCase().includes('password')}
          />
        </View>
      ))}
      <TouchableOpacity onPress={handleFormSubmit} style={styles.button}>
        <Text>{buttonText}</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.promptText}>{promptText}</Text>
        <TouchableOpacity onPress={onPromptActionPress}>
          <Text>{PromptActionText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: {
    paddingHorizontal: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#333',
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: '#f7691a',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  promptContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  promptText: {
    marginRight: 4,
  },
};

export default AuthForm;

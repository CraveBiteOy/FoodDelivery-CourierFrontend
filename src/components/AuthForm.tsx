import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { validateConfirmPassword, validateEmail, validateName, validatePassword, validateRequired } from '../utils/validation';

export type AuthFormProps = {
 onSubmit: (values: Record<string, string>) => void;
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

 const [values, setValues] = useState<Record<string, string>>({});
 const [errors, setErrors] = useState<Record<string, string>>({});


  //handles the form submission
  const handleFormSubmit = () => {

   //validate the form values and set errors
  const errors = validateForm(values, fields);

  if (errors) {
    setErrors(errors);
  } else {
    // if no errors, call the onSubmit prop with the form values
    onSubmit(values);
  }
  };
  
  //handles the input change for a specific field
  const handleInputChange = (fieldName: string, value: string) => {
    setValues((prevValues) => ({ ...prevValues, [fieldName]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: '' }));
  };


   //validates the form values and returns errors
  const validateForm = (values: Record<string, string>, fields: { label: string; fieldName: string }[]) => {
    let hasErrors = false;
    
    // Initializes a variable to store the error message for the field
  const newErrors: Record<string, string> = {};

  fields.forEach((field) => {
    let error = '';
    switch (field.fieldName.toLowerCase()) {
      case 'username':
        error = validateName(values[field.fieldName] || '');
        break;
      case 'email':
        error = validateEmail(values[field.fieldName] || '');
        break;
      case 'password':
        error = validatePassword(values[field.fieldName] || '');
        break;
      case 'confirm password':
        error = validateConfirmPassword(values['Password'] || '', values[field.fieldName] || '');
        break;
      default:
        error = validateRequired(values[field.fieldName] || '', field.label);
    }

    if (error) {
      hasErrors = true;
      newErrors[field.fieldName] = error;
    }
  });

  return hasErrors ? newErrors : null;
};

  
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboard}>
      <View style={styles.container}>
        {fields.map((field) => (
          <View key={field.fieldName} style={styles.fieldContainer}>
            <Text style={styles.label}>{field.label}</Text>
            <TextInput
              style={styles.input}
              placeholder={field.fieldName}
              secureTextEntry={field.fieldName.toLowerCase().includes('password')}
              onChangeText={(value) => handleInputChange(field.fieldName, value)}
            />
            {errors[field.fieldName] && <Text style={styles.error}>{errors[field.fieldName]}</Text>}
          </View>
        ))}
        <TouchableOpacity onPress={handleFormSubmit} style={styles.button}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
        <View style={styles.promptContainer}>
          <Text>{promptText}</Text>
          <TouchableOpacity onPress={onPromptActionPress}>
            <Text style={styles.PromptActionText}>{PromptActionText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
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
    position: 'absolute',
    bottom: 0,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  PromptActionText: {
    color: '#f7691a',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
});

export default AuthForm;

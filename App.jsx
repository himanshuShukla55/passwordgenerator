import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

//form validation
import * as Yup from 'yup';

const PasswordSchema = Yup.object({
  passwordLength: Yup.number()
    .min(4, 'Should be atleast 4!')
    .max(16, 'Should be atmost 16!')
    .required('length is required!'),
});

const App = () => {
  const [password, setPassword] = useState('');
  const [isPassGenerated, setIsPassGenerated] = useState(false);
  const [useLowerCase, setUseLowerCase] = useState(false);
  const [useUpperCase, setUseUpperCase] = useState(false);
  const [useNumbers, setUseNumbers] = useState(false);
  const [useSymbols, setUseSymbols] = useState(false);

  const generatePassword = passwordLength => {
    //string to store allowed characters
    let characters = '';
    if (useLowerCase) characters += 'abcdefghijklmnopqrstuvwxyz';
    if (useUpperCase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useNumbers) characters += '0123456789';
    if (useSymbols) characters += '!@#$%^&*-_+?';

    //string to store the final password
    let result = '';

    //ensure that atleast one character among the allowed sets is present
    if (useLowerCase)
      result += 'abcdefghijklmnopqrstuvwxyz'.charAt(
        Math.round(Math.random() * 26),
      );
    if (useUpperCase)
      result += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(
        Math.round(Math.random() * 26),
      );
    if (useNumbers)
      result += '0123456789'.charAt(Math.round(Math.random() * 10));
    if (useSymbols)
      result += '!@#$%^&*-_+?'.charAt(Math.round(Math.random() * 12));

    //add random characters for remaining length and then randomise the result
    if (result.length < passwordLength) {
      result += createPassword(characters, passwordLength - result.length);
      result = result
        .split('')
        .sort(() => 0.5 - Math.random())
        .join('');
    }
    setPassword(result);
    setIsPassGenerated(true);
  };
  const createPassword = (characters, passwordLength) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++)
      result += characters.charAt(
        Math.round(Math.random() * characters.length),
      );
    return result;
  };
  const resetPassword = () => {
    setPassword('');
    setIsPassGenerated('');
    setUseLowerCase(false);
    setUseUpperCase(false);
    setUseNumbers(false);
    setUseSymbols(false);
  };
  return (
    <View>
      <Text>App</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

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
    //
  };
  const createPassword = (characters, passwordLength) => {
    //
  };
  const resetPassword = () => {
    //
  };
  return (
    <View>
      <Text>App</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});

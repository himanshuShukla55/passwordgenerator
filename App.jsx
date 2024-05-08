import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

//form validation
import * as Yup from 'yup';
import {Formik} from 'formik';

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
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Formik
            initialValues={{passwordLength: ''}}
            validationSchema={PasswordSchema}
            onSubmit={values => {
              generatePassword(+values.passwordLength);
            }}>
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
              /* and other goodies */
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text styles={styles.heading}>Password Length</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>
                        {errors.passwordLength}
                      </Text>
                    )}
                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    placeholder="Ex: 8"
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Inclues Lowercase</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={useLowerCase}
                    onPress={() => setUseLowerCase(!useLowerCase)}
                    fillColor="#29AB87"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Inclues Uppercase</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={useUpperCase}
                    onPress={() => setUseUpperCase(!useUpperCase)}
                    fillColor="#FED85D"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Inclues Numbers</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={useNumbers}
                    onPress={() => setUseNumbers(!useNumbers)}
                    fillColor="#C9A0DC"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Inclues Symbols</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={useSymbols}
                    onPress={() => setUseSymbols(!useSymbols)}
                    fillColor="#FC80A5"
                  />
                </View>
                <View style={styles.formActions}>
                  <TouchableOpacity
                    disabled={!isValid}
                    style={styles.primaryBtn}
                    onPress={handleSubmit}>
                    <Text styles={styles.primaryBtnTxt}>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => {
                      handleReset();
                      resetPassword();
                    }}>
                    <Text style={styles.secondaryBtnTxt}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        {isPassGenerated && (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Result: </Text>
            <Text styles={styles.description}>Long Press to Copy</Text>
            <Text style={styles.generatedPassword} selectable={true}>
              {password}
            </Text>
          </View>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnTxt: {
    color: '#fff',
    fontWeight: 'bold',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#BFBFBF',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 12,
    color: '#fff',
  },
});

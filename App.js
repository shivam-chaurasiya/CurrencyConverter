/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
  Text,
  Button,
  ActivityIndicator
} from 'react-native';
import { fetchCurrencyLatest, convertCurrencyAPI } from './api';

const App = () => {
  const [currencyList, setCurrencyList] = useState([]);
  const [open, setOpen] = useState(false);
  const [ targetOpen, setTargetOpen ] = useState(false);
  const [sourceAmount, setSourceAmount] = useState("0");
  const [sourceCurrency, setSourceCurrency] = useState("");
  const [targetAmount, setTargetAmount] = useState("0");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCurrencyLatest()
      .then(list => setCurrencyList(list))
  }, [])

  const convertCurrency = (amount, sourceCurrency, targetCurrency) => {
    setLoading(true);
    convertCurrencyAPI(amount, sourceCurrency, targetCurrency)
      .then(data => {
        const { rates } = data;
        setTargetAmount(String(rates[targetCurrency]));
        setLoading(false);
      })
  }

  return (
    <SafeAreaView>
      <StatusBar />
      <View>
        <View
          style={styles.mainContainer}
        >
            <View>
              <Text>Source Amount</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={value => setSourceAmount(value)}
                value={sourceAmount}
              />
              <Text>Select Source Currency</Text>
              <DropDownPicker
                style={styles.textInput}
                onChangeText={value => setSourceCurrency(value)}
                open={open}
                value={sourceCurrency}
                items={currencyList.map(currency => ({
                  label: currency,
                  value: currency,
                }))}
                setOpen={setOpen}
                setValue={setSourceCurrency}
                dropDownDirection="DEFAULT"
               />
            </View>
            <View>
              <Text>Target Amount</Text>
              <TextInput
                style={styles.textInput}
                editable={false}
                value={targetAmount}
              />
              <Text>Select Target Currency</Text>
              <View>
              <DropDownPicker
                style={styles.textInput}
                onChangeText={value => setTargetCurrency(value)}
                open={targetOpen}
                value={targetCurrency}
                items={currencyList.map(currency => ({
                  label: currency,
                  value: currency,
                }))}
                setOpen={setTargetOpen}
                setValue={setTargetCurrency}
               
              />
              </View>
              
            </View>
            <View>
              {
                loading
                  ? <ActivityIndicator color="#000000" size="large" />
                  : <Button onPress={() => convertCurrency(sourceAmount, sourceCurrency, targetCurrency)} title="Convert"/>
              }
            </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: 20,
    height: 700,
    backgroundColor: "#fff"
  },
  textInput: {
    marginBottom: 10,
    backgroundColor: "lightgrey",
    color: "red",
    marginTop:20
    
  },
  
  
});

export default App;

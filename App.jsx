import React, { useState, useRef } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Animated } from 'react-native';

const EMI_CALCULATOR = () => {
  const [principalAmount, setPrincipalAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [monthlyEMI, setMonthlyEMI] = useState(0);

  const buttonOpacity = useRef(new Animated.Value(1)).current;

  const calculateEMI = () => {
    Animated.timing(buttonOpacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      const principal = parseFloat(principalAmount);
      const interest = parseFloat(interestRate) / 100 / 12;
      const term = parseFloat(loanTerm) * 12;

      if (principal && interest && term) {
        const emi = (principal * interest * Math.pow(1 + interest, term)) / (Math.pow(1 + interest, term) - 1);
        setMonthlyEMI(emi.toFixed(2));
      } else {
        setMonthlyEMI(0);
      }
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EMI Calculator</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Principal Amount (in Rs)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter principal amount"
          keyboardType="numeric"
          value={principalAmount}
          onChangeText={(value) => setPrincipalAmount(value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Interest Rate (in %)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter interest rate"
          keyboardType="numeric"
          value={interestRate}
          onChangeText={(value) => setInterestRate(value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Loan Term (in years)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter loan term"
          keyboardType="numeric"
          value={loanTerm}
          onChangeText={(value) => setLoanTerm(value)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={calculateEMI}>
        <Animated.Text style={[styles.buttonText, { opacity: buttonOpacity }]}>Calculate EMI</Animated.Text>
      </TouchableOpacity>

      {monthlyEMI > 0 && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Monthly EMI:</Text>
          <Text style={styles.resultValue}>{monthlyEMI}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    justifyContent:'center',
    textAlign:'center'

  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    // borderColor:'blue'
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  resultValue: {
    fontSize: 16,
  },
});

export default EMI_CALCULATOR;

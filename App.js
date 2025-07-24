import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity
} from 'react-native';
import Sentiment from 'sentiment';

export default function App() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const sentiment = new Sentiment();

  const analyze = () => {
    setLoading(true);
    const { score } = sentiment.analyze(text);
    setResult(score >= 0 ? 'Positive' : 'Negative');
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: null })}
    >
      <View style={styles.content}>
        <Text style={styles.title}>On-Device Sentiment</Text>

        <TextInput
          style={styles.input}
          placeholder="Type your review here…"
          multiline
          value={text}
          onChangeText={(t) => {
            setText(t);
            if (result !== null) setResult(null);
          }}
          onFocus={() => setResult(null)}
        />

        <TouchableOpacity
          style={[
            styles.analyzeButton,
            (loading || !text.trim()) && styles.disabledButton
          ]}
          onPress={analyze}
          disabled={loading || !text.trim()}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Analyze</Text>
          )}
        </TouchableOpacity>
      </View>

      {result && !loading && (
        <View
          style={[
            styles.outputContainer,
            result === 'Positive' ? styles.outputPos : styles.outputNeg,
            styles.absoluteOutput
          ]}
        >
          <Text style={styles.outputEmoji}>
            {result === 'Positive' ? '😊' : '😞'}
          </Text>
          <Text style={styles.outputText}>{result}</Text>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  content: {
    width: '100%',
    alignItems: 'stretch'
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 6,
    padding: 12,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 16
  },
  analyzeButton: {
    backgroundColor: 'black',  // darker light blue
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 3
  },
  disabledButton: {
    backgroundColor: 'gray'  // lighter disabled blue
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  absoluteOutput: {
    position: 'absolute',
    bottom: 270,
    left: 24,
    right: 24
  },
  outputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 50,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  outputPos: {
    backgroundColor: '#BBDEFB'  // theme light blue
  },
  outputNeg: {
    backgroundColor: 'gray'  // theme light red
  },
  outputEmoji: {
    fontSize: 32,
    marginRight: 8
  },
  outputText: {
    fontSize: 28,
    fontWeight: '700'
  }
});
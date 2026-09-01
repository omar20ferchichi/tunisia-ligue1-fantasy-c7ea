import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function FormationPitch({ formation, onFormationChange }) {
  const formations = [
    '4-4-2',
    '4-3-3',
    '3-4-3',
    '3-5-2',
    '4-2-4',
    '4-1-4-1',
    '3-3-4',
    '2-3-5',
    '5-3-2',
    '5-4-1',
  ];

  return (
    <View style={styles.pitchContainer}>
      <Text style={styles.pitchTitle}>Formation</Text>
      <View style={styles.pitchGrid}>
        {formations.map((f, index) => (
          <TouchableOpacity
            key={index}
            style={styles.pitchButton}
            onPress={() => onFormationChange(f)}
          >
            <Text style={styles.pitchButtonText}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pitchContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    padding: 16,
  },
  pitchTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  pitchGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  pitchButton: {
    width: '45%',
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  pitchButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
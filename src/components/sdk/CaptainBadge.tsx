import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function CaptainBadge({ player }) {
  return (
    <View style={styles.badgeContainer}>
      <View style={styles.badgeImageContainer}>
        <Image
          source={{ uri: player.image }}
          style={styles.badgeImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.badgeContent}>
        <Text style={styles.badgeName}>{player.name}</Text>
        <Text style={styles.badgeClub}>{player.club}</Text>
        <Text style={styles.badgePosition}>{player.position}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  badgeContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
  },
  badgeImageContainer: {
    width: '100%',
    height: '50%',
  },
  badgeImage: {
    width: '100%',
    height: '100%',
  },
  badgeContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  badgeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  badgeClub: {
    fontSize: 14,
    color: '#555',
    marginVertical: 4,
  },
  badgePosition: {
    fontSize: 14,
    color: '#777',
  },
});
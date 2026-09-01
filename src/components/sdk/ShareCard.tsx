import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function ShareCard({ team }) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardImageContainer}>
        <Image
          source={{ uri: team.image }}
          style={styles.cardImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardName}>{team.name}</Text>
        <Text style={styles.cardClub}>{team.club}</Text>
        <Text style={styles.cardPosition}>{team.position}</Text>
        <View style={styles.cardStats}>
          <Text style={styles.cardStat}>Price: {team.price}M</Text>
          <Text style={styles.cardStat}>Rating: {team.rating}</Text>
        </View>
        <TouchableOpacity style={styles.cardShareButton}>
          <Text style={styles.cardShareButtonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
  },
  cardImageContainer: {
    width: '100%',
    height: '50%',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardClub: {
    fontSize: 14,
    color: '#555',
    marginVertical: 4,
  },
  cardPosition: {
    fontSize: 14,
    color: '#777',
  },
  cardStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  cardStat: {
    fontSize: 14,
    color: '#333',
  },
  cardShareButton: {
    backgroundColor: '#007bff',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  cardShareButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
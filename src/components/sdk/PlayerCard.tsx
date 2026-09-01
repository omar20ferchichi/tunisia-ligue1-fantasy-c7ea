import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function PlayerCard({ player, isSelected, isCaptain, isViceCaptain }) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardImageContainer}>
        <Image
          source={{ uri: player.image }}
          style={styles.cardImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardName}>{player.name}</Text>
        <Text style={styles.cardClub}>{player.club}</Text>
        <Text style={styles.cardPosition}>{player.position}</Text>
        <View style={styles.cardStats}>
          <Text style={styles.cardStat}>Price: {player.price}M</Text>
          <Text style={styles.cardStat}>Rating: {player.rating}</Text>
        </View>
        {isSelected && (
          <TouchableOpacity style={styles.cardSelectButton}>
            <Text style={styles.cardSelectButtonText}>Selected</Text>
          </TouchableOpacity>
        )}
        {isCaptain && (
          <TouchableOpacity style={styles.cardCaptainButton}>
            <Text style={styles.cardCaptainButtonText}>Captain</Text>
          </TouchableOpacity>
        )}
        {isViceCaptain && (
          <TouchableOpacity style={styles.cardViceCaptainButton}>
            <Text style={styles.cardViceCaptainButtonText}>Vice Captain</Text>
          </TouchableOpacity>
        )}
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
    marginVertical: 4,
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
  cardSelectButton: {
    backgroundColor: '#228B22',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  cardSelectButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cardCaptainButton: {
    backgroundColor: '#007bff',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  cardCaptainButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cardViceCaptainButton: {
    backgroundColor: '#6c757d',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  cardViceCaptainButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
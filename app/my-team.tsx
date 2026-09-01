import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Modal, ScrollView } from 'react-native';
import { useTeamStore } from '../src/state/team';
import { useAuthStore } from '../src/state/auth';
import { useGameweekStore } from '../src/state/gameweek';
import { useNotificationsStore } from '../src/state/notifications';
import { useSponsorStore } from '../src/state/sponsor';
import { useFootballData } from '../src/services/football-data';
import { PlayerCard } from '../src/components/sdk/PlayerCard';
import { FormationPitch } from '../src/components/sdk/FormationPitch';
import { CaptainBadge } from '../src/components/sdk/CaptainBadge';
import { ShareCard } from '../src/components/sdk/ShareCard';
import { SponsorPlacementRenderer } from '../src/components/sdk/SponsorPlacementRenderer';
import { useNavigation } from 'expo-router';
import { Alert } from 'react-native';

export default function MyTeamScreen() {
  const { team, addPlayer, removePlayer, setCaptain, setFormation } = useTeamStore();
  const { user } = useAuthStore();
  const { currentGameweek } = useGameweekStore();
  const { addNotification } = useNotificationsStore();
  const { sponsors } = useSponsorStore();
  const { getPlayers } = useFootballData();
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState('');
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isCaptain, setIsCaptain] = useState(false);

  const filteredPlayers = getPlayers().filter(player =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.club.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTransfer = (player) => {
    if (team.budget >= player.price) {
      addPlayer(player);
      addNotification({
        type: 'success',
        message: `${player.name} has been added to your squad!`
      });
      setShowTransferModal(false);
    } else {
      Alert.alert('Insufficient Budget', 'You don’t have enough budget to transfer this player.');
    }
  };

  const handleRemove = (player) => {
    removePlayer(player);
    addNotification({
      type: 'info',
      message: `${player.name} has been removed from your squad.`
    });
  };

  const handleFormationChange = (formation) => {
    setFormation(formation);
    addNotification({
      type: 'info',
      message: `Formation set to ${formation}!`
    });
  };

  const handleCaptainChange = (player) => {
    setCaptain(player);
    addNotification({
      type: 'info',
      message: `${player.name} is now your captain!`
    });
  };

  const renderPlayer = ({ item }) => {
    const isSelected = team.players.some(p => p.id === item.id);
    const isCaptain = team.captain?.id === item.id;
    const isViceCaptain = team.viceCaptain?.id === item.id;

    return (
      <TouchableOpacity
        style={styles.playerCard}
        onPress={() => {
          if (!isSelected) {
            setSelectedPlayer(item);
            setShowTransferModal(true);
          } else {
            handleRemove(item);
          }
        }}
      >
        <PlayerCard
          player={item}
          isSelected={isSelected}
          isCaptain={isCaptain}
          isViceCaptain={isViceCaptain}
        />
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Team</Text>
        <Text style={styles.subtitle}>Gameweek {currentGameweek}</Text>
        <Text style={styles.budget}>Budget: {team.budget}M</Text>
        <View style={styles.sponsorContainer}>
          {sponsors.map((sponsor, index) => (
            <SponsorPlacementRenderer
              key={index}
              sponsor={sponsor}
              style={styles.sponsorAd}
            />
          ))}
        </View>
      </View>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search players by name or club"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <View style={styles.playersContainer}>
        <FlatList
          data={filteredPlayers}
          renderItem={renderPlayer}
          keyExtractor={item => item.id}
          numColumns={2}
        />
      </View>
      <View style={styles.formationContainer}>
        <Text style={styles.formationTitle}>Formation</Text>
        <FormationPitch
          formation={team.formation}
          onFormationChange={handleFormationChange}
        />
      </View>
      <View style={styles.captainContainer}>
        <Text style={styles.captainTitle}>Captain</Text>
        <TouchableOpacity
          style={styles.captainButton}
          onPress={() => navigation.navigate('select-captain')}
        >
          <Text style={styles.captainButtonText}>Select Captain</Text>
        </TouchableOpacity>
        {team.captain && (
          <CaptainBadge
            player={team.captain}
            style={styles.captainBadge}
          />
        )}
      </View>
      <View style={styles.shareContainer}>
        <TouchableOpacity
          style={styles.shareButton}
          onPress={() => navigation.navigate('share-team')}
        >
          <Text style={styles.shareButtonText}>Share Team</Text>
        </TouchableOpacity>
        <ShareCard
          team={team}
          style={styles.shareCard}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showTransferModal}
        onRequestClose={() => setShowTransferModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Transfer Player</Text>
            <Text style={styles.modalMessage}>Are you sure you want to transfer {selectedPlayer.name}?</Text>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => handleTransfer(selectedPlayer)}
              >
                <Text style={styles.modalButtonText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtonCancel}
                onPress={() => setShowTransferModal(false)}
              >
                <Text style={styles.modalButtonTextCancel}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    marginVertical: 8,
  },
  budget: {
    fontSize: 16,
    color: '#228B22',
    fontWeight: 'bold',
  },
  sponsorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sponsorAd: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBarContainer: {
    marginBottom: 16,
  },
  searchBar: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 2,
  },
  playersContainer: {
    marginBottom: 24,
  },
  playerCard: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
    elevation: 2,
  },
  formationContainer: {
    marginBottom: 24,
  },
  formationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  captainContainer: {
    marginBottom: 24,
  },
  captainTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  captainButton: {
    backgroundColor: '#228B22',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  captainButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  captainBadge: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  shareContainer: {
    marginBottom: 24,
  },
  shareButton: {
    backgroundColor: '#228B22',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  shareCard: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    backgroundColor: '#228B22',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  modalButtonCancel: {
    flex: 1,
    backgroundColor: '#ccc',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  modalButtonTextCancel: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
  },
});
import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ClubCard } from '@/src/components/sdk/ClubCard';

export default function OnboardingScreen() {
  const [selectedClub, setSelectedClub] = useState<string | null>(null);
  const router = useRouter();

  const clubs = [
    { id: 'CSK', name: 'Club Sportif de Tunis', logo: 'https://example.com/logos/CSK.png' },
    { id: 'ESST', name: 'Espoir Sportif de Sousse', logo: 'https://example.com/logos/ESST.png' },
    { id: 'Etoile', name: 'Etoile du Sahel', logo: 'https://example.com/logos/Etoile.png' },
    { id: 'MCA', name: 'Mouvement Sportif de la Capitale', logo: 'https://example.com/logos/MCA.png' },
    { id: 'USM', name: 'Union Sportive de Monastir', logo: 'https://example.com/logos/USM.png' },
    { id: 'ESG', name: 'Espoir Sportif de Gabès', logo: 'https://example.com/logos/ESG.png' },
    { id: 'CSP', name: 'Club Sportif de Palest', logo: 'https://example.com/logos/CSP.png' },
    { id: 'ESK', name: 'Espoir Sportif de Kairouan', logo: 'https://example.com/logos/ESK.png' },
    { id: 'ESJ', name: 'Espoir Sportif de Jendouba', logo: 'https://example.com/logos/ESJ.png' },
    { id: 'ESM', name: 'Espoir Sportif de Mahdia', logo: 'https://example.com/logos/ESM.png' },
    { id: 'ESM2', name: 'Espoir Sportif de Monastir 2', logo: 'https://example.com/logos/ESM2.png' },
    { id: 'ESO', name: 'Espoir Sportif de Oued Ellil', logo: 'https://example.com/logos/ESO.png' },
    { id: 'ESR', name: 'Espoir Sportif de Rades', logo: 'https://example.com/logos/ESR.png' },
    { id: 'ESS', name: 'Espoir Sportif de Sousse', logo: 'https://example.com/logos/ESS.png' },
    { id: 'EST', name: 'Espoir Sportif de Tunis', logo: 'https://example.com/logos/EST.png' },
    { id: 'ESV', name: 'Espoir Sportif de Gabès', logo: 'https://example.com/logos/ESV.png' },
    { id: 'ESW', name: 'Espoir Sportif de Gabès', logo: 'https://example.com/logos/ESW.png' },
    { id: 'ESX', name: 'Espoir Sportif de Gabès', logo: 'https://example.com/logos/ESX.png' },
    { id: 'ESY', name: 'Espoir Sportif de Gabès', logo: 'https://example.com/logos/ESY.png' },
    { id: 'ESZ', name: 'Espoir Sportif de Gabès', logo: 'https://example.com/logos/ESZ.png' }
  ];

  const handleSelect = (clubId: string) => {
    setSelectedClub(clubId);
  };

  const handleContinue = () => {
    if (selectedClub) {
      router.push('/');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Select Your Favorite Club</Text>
      </View>
      <View style={styles.clubList}>
        {clubs.map((club) => (
          <ClubCard
            key={club.id}
            club={club}
            onSelect={() => handleSelect(club.id)}
            isSelected={selectedClub === club.id}
          />
        ))}
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue} disabled={!selectedClub}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  clubList: {
    flex: 1,
    justifyContent: 'space-around',
  },
  footer: {
    marginBottom: 30,
  },
  continueButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  continueText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  }
});
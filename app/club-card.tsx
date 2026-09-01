import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

interface ClubCardProps {
  club: {
    id: string;
    name: string;
    logo: string;
  };
  onSelect: (clubId: string) => void;
  isSelected: boolean;
}

export default function ClubCard({ club, onSelect, isSelected }: ClubCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onSelect(club.id)}>
      <View style={styles.cardContent}>
        <Image source={{ uri: club.logo }} style={styles.logo} />
        <Text style={styles.clubName}>{club.name}</Text>
      </View>
      {isSelected && <View style={styles.selectedIndicator} />} 
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  clubName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
    marginLeft: 10,
  }
});
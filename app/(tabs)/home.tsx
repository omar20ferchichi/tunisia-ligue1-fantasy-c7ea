import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';
import { SponsorPlacementRenderer } from '@/src/components/sdk/SponsorPlacementRenderer';
import { HomeLayout } from '@/src/components/sdk/HomeLayout';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <HomeLayout>
        <View style={styles.bannerContainer}>
          <Image
            source={require('@/assets/images/banner.jpg')}
            style={styles.banner}
            resizeMode='cover'
          />
          <SponsorPlacementRenderer />
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>My Team</Text>
          <View style={styles.sectionContent}>
            <Text style={styles.sectionText}>Manage your fantasy team and squad.</Text>
            <Text style={styles.sectionText}>Build your 15-player squad within a virtual budget.</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText} onPress={() => navigation.navigate('my-team')}>Go to My Team</Text>
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Matches</Text>
          <View style={styles.sectionContent}>
            <Text style={styles.sectionText}>Track live matches and see real-time rank changes.</Text>
            <Text style={styles.sectionText}>Stay updated on your team's performance during matches.</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText} onPress={() => navigation.navigate('matches')}>Go to Matches</Text>
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Leagues</Text>
          <View style={styles.sectionContent}>
            <Text style={styles.sectionText}>Join private leagues and compete with friends.</Text>
            <Text style={styles.sectionText}>Create and invite others to your private leagues.</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText} onPress={() => navigation.navigate('leagues')}>Go to Leagues</Text>
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Leaderboard</Text>
          <View style={styles.sectionContent}>
            <Text style={styles.sectionText}>See your global rank and compare with others.</Text>
            <Text style={styles.sectionText}>Track your progress and climb the rankings.</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText} onPress={() => navigation.navigate('leaderboard')}>Go to Leaderboard</Text>
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Profile</Text>
          <View style={styles.sectionContent}>
            <Text style={styles.sectionText}>Manage your profile and settings.</Text>
            <Text style={styles.sectionText}>Update your preferences and account information.</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText} onPress={() => navigation.navigate('profile')}>Go to Profile</Text>
          </View>
        </View>
      </HomeLayout>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bannerContainer: {
    marginBottom: 20,
  },
  banner: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  sectionContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionContent: {
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  buttonContainer: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#007bff',
    textDecorationLine: 'underline',
  },
});
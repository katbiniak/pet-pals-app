import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MaxContentWidth, Spacing } from '@/constants/theme';
import PetImage from '@/components/atoms/PetImage';
import Quote from '@/components/atoms/Quote';
import EntryBox from '@/components/molecules/EntryBox';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <PetImage src={require('../../assets/Leo.jpg')} />
        <EntryBox />
        <PetImage src={require('../../assets/Bugsy.jpg')} />
        <Quote quote="My cats love my Pet Pals sitter." name="John" />
        <PetImage src={require('../../assets/Bepper.jpg')} />
        <Quote quote="The only pet sitting service I’ve found for my pig!" name="Jane" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
    maxWidth: MaxContentWidth,
  },
  loginContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
    height: '50%'
  },
});

import { StyleSheet, useWindowDimensions, View, ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import Button from '@/components/atoms/Button';
import { Spacing } from '@/constants/theme';
import { Href, Link } from 'expo-router';

interface EntryBoxProps {
  style?: ViewStyle;
}

export default function EntryBox({ style }: EntryBoxProps) {
  const { height } = useWindowDimensions();
  const createBookingRoute = "/create" as Href;
  const viewBookingsRoute = "/(admin)/bookings" as Href;

  return (
    <View style={[styles.container, {height: height / 2 }, style]} >
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../../../assets/logo.svg')}
          contentFit="contain"
        />
      </View>
      <Button text="+ New Booking" variant='primary' route={createBookingRoute} />
      <Button text="Admin Login" variant='secondary' route={viewBookingsRoute} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    gap: Spacing.three
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 242,
    height: 80,
    paddingBottom: Spacing.three
  },
  image: {
    flex: 1,
    width: '100%',
    flexShrink: 1
  },
});
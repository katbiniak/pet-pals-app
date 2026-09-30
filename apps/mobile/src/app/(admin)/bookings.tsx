import { StyleSheet, View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MaxContentWidth } from '@/constants/theme';
import { useGetBookings } from "@pet-pals/shared";

export default function BookingsScreen() {
  const { bookings, fetchError } = useGetBookings();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text>{"Bookings"}</Text>
      {bookings && !fetchError &&
        <FlatList
        style={styles.bookings}
        data={bookings}
        keyExtractor={(booking) => booking.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.bookingRow}>
            <Text>{item.first_name}</Text>
            <Text>{item.last_name}</Text>
            <Text>{item.animal_name}</Text>
            <Text>{item.animal_type}</Text>
            <Text>{item.hours}</Text>
            <Text>{item.service_date}</Text>
            <Text>{item.total_price}</Text>
            <Text>{item.completed}</Text>
          </View>
        )}
      />
      }
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
  bookings: {
    width: '100%',
    flex: 1,
  },
  bookingRow: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
});

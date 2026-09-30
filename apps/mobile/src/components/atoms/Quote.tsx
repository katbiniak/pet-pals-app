import { Colors, Spacing } from '@/constants/theme';
import { Text, StyleSheet, useWindowDimensions, View, ViewStyle } from 'react-native';

interface QuoteProps {
  quote: string;
  name: string;
  style?: ViewStyle;
}

export default function Quote({ quote = '', name = '', style }: QuoteProps) {
  const { height } = useWindowDimensions();

  return (
    <View style={([styles.quoteContainer, { height: height / 2 } , style])}>
      {quote && <Text style={styles.quote}>{`"${quote}"`}</Text>}
      {name && <Text style={styles.quote}>{`- ${name}`}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  quoteContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: Colors.blossom,
    padding: Spacing.five
  },
  quote: {
    width: '100%',
    color: Colors.charcoal,
    fontSize: 36,
    fontStyle: 'italic',
    textAlign: 'center'
  },
});
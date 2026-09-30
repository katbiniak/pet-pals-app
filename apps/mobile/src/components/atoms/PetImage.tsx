import { Colors } from '@/constants/theme';
import { ImageSourcePropType, StyleSheet, useWindowDimensions, View, ViewStyle } from 'react-native';
import { Image } from 'expo-image';

interface PetImageProps {
  src: ImageSourcePropType | string;
  accessibilityLabel?: string;
  style?: ViewStyle;
}

export default function PetImage({ src, accessibilityLabel, style }: PetImageProps) {
  const { height } = useWindowDimensions();

  return (
    <View style={([styles.imageContainer, { height: height / 2 } , style])}>
      <Image
        style={styles.image}
        source={src}
        accessibilityLabel={accessibilityLabel}
        contentFit="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  image: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.blossom,
  },
});
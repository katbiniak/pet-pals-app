import { Colors, Spacing } from '@/constants/theme';
import { Href, useRouter } from 'expo-router';
import { ImageSourcePropType, Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';

interface ButtonProps {
  text: string;
  variant: 'primary' | 'secondary',
  style?: ViewStyle;
  route: Href;
}

export default function Button({ text = '', variant, style, route}: ButtonProps) {
  const buttonVariantStyles = variant === 'primary' ? styles.primary : styles.secondary;
  const textVariantStyles = variant === 'primary' ? styles.primaryText : styles.secondaryText;
  const router = useRouter();

  return (
    <Pressable style={([styles.button, buttonVariantStyles, style])} onPress={() => router.navigate(route)}>
      {text && <Text style={[styles.text, textVariantStyles]}>{text}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 188,
    height: 52,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  text: {
    fontSize: 20,
    fontWeight: 400
  },
  primary: {
    backgroundColor: Colors.plum,
  },
  secondary: {
    borderWidth: 1,
    borderColor: Colors.plum,
  },
  primaryText: {
    color: Colors.white,
  },
  secondaryText: {
    color: Colors.plum,
  }
});
import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Colors } from '@/constants/colors';

interface HeaderProps {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}

export default function Header({ title, subtitle, right }: HeaderProps) {
  return (
    <View style={styles.header}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <View style={styles.content}>
        <View style={styles.textBlock}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        {right ? <View style={styles.right}>{right}</View> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 48,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  textBlock: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.primaryLight,
    marginTop: 4,
  },
  right: {
    marginLeft: 12,
  },
});

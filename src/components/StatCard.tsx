import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Colors } from '@/constants/colors';

interface StatCardProps {
  icon: string;
  title: string;
  value: string | number;
  color?: string;
  style?: ViewStyle;
}

export default function StatCard({ icon, title, value, color = Colors.primary, style }: StatCardProps) {
  return (
    <View style={[styles.card, style]}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={[styles.value, { color }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    width: '46%',
    margin: '2%',
    padding: 18,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  icon: {
    fontSize: 26,
  },
  title: {
    color: Colors.textSecondary,
    fontSize: 13,
    marginTop: 12,
  },
  value: {
    fontSize: 27,
    fontWeight: 'bold',
    marginTop: 6,
  },
});

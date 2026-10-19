import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator, FlatList, StyleSheet,
  Text, TouchableOpacity, View,
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import Header from '@/components/Header';
import { Colors } from '@/constants/colors';
import { cropService } from '@/services/cropService';
import { Crop } from '@/types/crop';

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  Planned: { bg: Colors.statusPlanned, text: Colors.statusPlannedText },
  Growing: { bg: Colors.statusGrowing, text: Colors.statusGrowingText },
  Harvested: { bg: Colors.statusHarvested, text: Colors.statusHarvestedText },
};

export default function CropsScreen() {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const data = await cropService.getAll();
      setCrops(data);
    } catch (e: any) {
      setError(e.message ?? 'Failed to load crops');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(load);

  const formatDate = (d: string | null) =>
    d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

  return (
    <View style={styles.flex}>
      <Header
        title="Crops"
        subtitle={`${crops.length} crop${crops.length !== 1 ? 's' : ''} tracked`}
        right={
          <TouchableOpacity style={styles.addBtn} onPress={() => router.push('/crops/add')}>
            <Text style={styles.addBtnText}>+ Add</Text>
          </TouchableOpacity>
        }
      />

      {loading ? (
        <ActivityIndicator style={styles.center} size="large" color={Colors.primary} />
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={load} style={styles.retryBtn}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={crops}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => {
            const sc = STATUS_COLORS[item.status] ?? STATUS_COLORS['Planned'];
            return (
              <View style={styles.card}>
                <View style={styles.cardTop}>
                  <Text style={styles.cropName}>🌾 {item.name}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: sc.bg }]}>
                    <Text style={[styles.statusText, { color: sc.text }]}>{item.status}</Text>
                  </View>
                </View>
                {item.field_name ? (
                  <Text style={styles.detail}>📍 Field: {item.field_name}</Text>
                ) : null}
                <Text style={styles.detail}>🌱 Planted: {formatDate(item.planting_date)}</Text>
                <Text style={styles.detail}>🗓️ Harvest: {formatDate(item.expected_harvest_date)}</Text>
              </View>
            );
          }}
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={styles.emptyText}>No crops yet. Tap + Add to get started!</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.background },
  list: { padding: 16, paddingBottom: 32 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  cropName: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary, flex: 1 },
  statusBadge: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  statusText: { fontSize: 12, fontWeight: '700' },
  detail: { fontSize: 13, color: Colors.textMuted, marginTop: 5 },
  addBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  addBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  errorText: { color: Colors.error, fontSize: 14, textAlign: 'center', marginBottom: 12 },
  emptyText: { color: Colors.textSecondary, fontSize: 14, textAlign: 'center' },
  retryBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: { color: '#fff', fontWeight: '600' },
});

import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator, FlatList, StyleSheet,
  Text, TouchableOpacity, View,
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import Header from '@/components/Header';
import { Colors } from '@/constants/colors';
import { inventoryService } from '@/services/inventoryService';
import { StockMovement } from '@/types/inventory';

export default function InventoryScreen() {
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const data = await inventoryService.getAll();
      setMovements(data);
    } catch (e: any) {
      setError(e.message ?? 'Failed to load inventory');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(load);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
    });

  return (
    <View style={styles.flex}>
      <Header
        title="Inventory"
        subtitle="Stock movement history"
        right={
          <TouchableOpacity
            style={styles.adjustBtn}
            onPress={() => router.push('/inventory/adjust-stock')}
          >
            <Text style={styles.adjustBtnText}>Adjust</Text>
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
          data={movements}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <View style={[
                styles.typeTag,
                { backgroundColor: item.movement_type === 'IN' ? Colors.statusGrowing : Colors.statusPlanned },
              ]}>
                <Text style={[
                  styles.typeText,
                  { color: item.movement_type === 'IN' ? Colors.statusGrowingText : Colors.statusPlannedText },
                ]}>
                  {item.movement_type === 'IN' ? '▲ IN' : '▼ OUT'}
                </Text>
              </View>
              <View style={styles.moveInfo}>
                <Text style={styles.productName}>
                  {item.product_name ?? `Product #${item.product_id}`}
                </Text>
                {item.notes ? <Text style={styles.notes} numberOfLines={1}>{item.notes}</Text> : null}
                <Text style={styles.date}>{formatDate(item.movement_date)}</Text>
              </View>
              <Text style={styles.qty}>{item.quantity}</Text>
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={styles.emptyText}>No movements yet. Tap Adjust to record one!</Text>
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
  row: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    elevation: 1,
  },
  typeTag: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    minWidth: 60,
    alignItems: 'center',
  },
  typeText: { fontSize: 11, fontWeight: '800' },
  moveInfo: { flex: 1 },
  productName: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  notes: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
  date: { fontSize: 12, color: Colors.textMuted, marginTop: 3 },
  qty: { fontSize: 18, fontWeight: '800', color: Colors.textPrimary },
  adjustBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  adjustBtnText: { color: '#fff', fontWeight: '600', fontSize: 13 },
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

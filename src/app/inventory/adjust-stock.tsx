import React, { useCallback, useEffect, useState } from 'react';
import {
  KeyboardAvoidingView, Platform, ScrollView,
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { router } from 'expo-router';
import Header from '@/components/Header';
import InputField from '@/components/InputField';
import Button from '@/components/Button';
import { Colors } from '@/constants/colors';
import { inventoryService } from '@/services/inventoryService';
import { productService } from '@/services/productService';
import { MovementType } from '@/types/inventory';
import { Product } from '@/types/product';

export default function AdjustStockScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [movementType, setMovementType] = useState<MovementType>('IN');
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    productService.getAll().then(setProducts).catch(() => {});
  }, []);

  async function handleSave() {
    if (!selectedProduct) {
      setError('Please select a product.');
      return;
    }
    const qty = parseFloat(quantity);
    if (!quantity || isNaN(qty) || qty <= 0) {
      setError('Enter a valid quantity greater than 0.');
      return;
    }
    try {
      setLoading(true);
      setError('');
      await inventoryService.adjust({
        product_id: selectedProduct.id,
        movement_type: movementType,
        quantity: qty,
        notes: notes.trim() || undefined,
      });
      router.back();
    } catch (e: any) {
      setError(e.message ?? 'Failed to record stock movement');
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Header title="Adjust Stock" subtitle="Record a stock IN or OUT movement" />
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {error ? <Text style={styles.errorBanner}>{error}</Text> : null}

        {/* Product picker */}
        <Text style={styles.label}>SELECT PRODUCT</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productScroll}>
          {products.map((p) => (
            <TouchableOpacity
              key={p.id}
              style={[styles.productChip, selectedProduct?.id === p.id && styles.productChipActive]}
              onPress={() => setSelectedProduct(p)}
            >
              <Text style={[styles.productChipText, selectedProduct?.id === p.id && styles.productChipTextActive]}>
                {p.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Movement type */}
        <Text style={styles.label}>MOVEMENT TYPE</Text>
        <View style={styles.typeRow}>
          {(['IN', 'OUT'] as MovementType[]).map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.typeChip, movementType === t && styles.typeChipActive]}
              onPress={() => setMovementType(t)}
            >
              <Text style={[styles.typeChipText, movementType === t && styles.typeChipTextActive]}>
                {t === 'IN' ? '▲ Stock IN' : '▼ Stock OUT'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <InputField
          label="Quantity"
          value={quantity}
          onChangeText={setQuantity}
          placeholder="0"
          keyboardType="numeric"
        />
        <InputField
          label="Notes (optional)"
          value={notes}
          onChangeText={setNotes}
          placeholder="e.g. Harvested from north field"
          multiline
          numberOfLines={2}
        />

        <Button title="Record Movement" onPress={handleSave} loading={loading} style={styles.btn} />
        <Button title="Cancel" onPress={() => router.back()} variant="outline" style={styles.btn} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.background },
  container: { padding: 20, paddingBottom: 40 },
  errorBanner: {
    backgroundColor: '#FFEBEE',
    color: Colors.error,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 13,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  productScroll: { marginBottom: 20 },
  productChip: {
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: Colors.surface,
  },
  productChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  productChipText: { fontSize: 13, color: Colors.textSecondary, fontWeight: '600' },
  productChipTextActive: { color: '#fff' },
  typeRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  typeChip: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: Colors.surface,
  },
  typeChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  typeChipText: { fontSize: 13, fontWeight: '700', color: Colors.textSecondary },
  typeChipTextActive: { color: '#fff' },
  btn: { marginBottom: 12 },
});

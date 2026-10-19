import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator, FlatList, StyleSheet,
  Text, TouchableOpacity, View,
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { Colors } from '@/constants/colors';
import { productService } from '@/services/productService';
import { Product } from '@/types/product';

export default function ProductsScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const data = await productService.getAll();
      setProducts(data);
    } catch (e: any) {
      setError(e.message ?? 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(load);

  return (
    <View style={styles.flex}>
      <Header
        title="Products"
        subtitle={`${products.length} item${products.length !== 1 ? 's' : ''}`}
        right={
          <TouchableOpacity
            style={styles.catBtn}
            onPress={() => router.push('/products/categories')}
          >
            <Text style={styles.catBtnText}>Categories</Text>
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
          data={products}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <ProductCard product={item} />}
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={styles.emptyText}>No products yet.</Text>
            </View>
          }
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.background },
  list: { paddingVertical: 12, paddingBottom: 32 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  errorText: { color: Colors.error, fontSize: 14, textAlign: 'center', marginBottom: 12 },
  emptyText: { color: Colors.textSecondary, fontSize: 15 },
  retryBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: { color: '#fff', fontWeight: '600' },
  catBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  catBtnText: { color: '#fff', fontWeight: '600', fontSize: 13 },
});

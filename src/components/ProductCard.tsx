import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '@/constants/colors';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
}

export default function ProductCard({ product, onPress }: ProductCardProps) {
  const isLowStock = product.quantity < 10;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.row}>
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
          {product.category_name ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{product.category_name}</Text>
            </View>
          ) : null}
        </View>
        <View style={styles.priceBlock}>
          <Text style={styles.price}>₹{Number(product.price).toFixed(2)}</Text>
          <Text style={styles.unit}>/ {product.unit}</Text>
        </View>
      </View>

      <View style={styles.stockRow}>
        <Text style={[styles.stock, isLowStock && styles.lowStock]}>
          {isLowStock ? '⚠️' : '📦'} {product.quantity} {product.unit} in stock
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  info: {
    flex: 1,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  badge: {
    marginTop: 6,
    backgroundColor: Colors.primaryLight,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: '600',
  },
  priceBlock: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.primary,
  },
  unit: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  stockRow: {
    marginTop: 10,
  },
  stock: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  lowStock: {
    color: Colors.warning,
  },
});

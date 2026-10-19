import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator, FlatList, StyleSheet,
  Text, TouchableOpacity, View, Alert,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import Header from '@/components/Header';
import InputField from '@/components/InputField';
import Button from '@/components/Button';
import { Colors } from '@/constants/colors';
import { categoryService } from '@/services/categoryService';
import { Category } from '@/types/category';

export default function CategoriesScreen() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (e: any) {
      setError(e.message ?? 'Failed to load categories');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(load);

  async function handleAdd() {
    if (!name.trim()) {
      setError('Category name is required.');
      return;
    }
    try {
      setSaving(true);
      setError('');
      await categoryService.create({ name: name.trim(), description: description.trim() || undefined });
      setName('');
      setDescription('');
      load();
    } catch (e: any) {
      setError(e.message ?? 'Failed to add category');
    } finally {
      setSaving(false);
    }
  }

  return (
    <View style={styles.flex}>
      <Header title="Categories" subtitle="Manage product categories" />

      {/* Add form */}
      <View style={styles.form}>
        <Text style={styles.formTitle}>Add New Category</Text>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <InputField label="Name" value={name} onChangeText={setName} placeholder="e.g. Vegetables" />
        <InputField
          label="Description (optional)"
          value={description}
          onChangeText={setDescription}
          placeholder="Short description…"
          multiline
          numberOfLines={2}
        />
        <Button title="Add Category" onPress={handleAdd} loading={saving} />
      </View>

      {/* List */}
      {loading ? (
        <ActivityIndicator style={styles.center} size="large" color={Colors.primary} />
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <View style={styles.info}>
                <Text style={styles.catName}>{item.name}</Text>
                {item.description ? (
                  <Text style={styles.catDesc} numberOfLines={1}>{item.description}</Text>
                ) : null}
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>#{item.id}</Text>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={styles.emptyText}>No categories yet. Add one above!</Text>
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
  form: {
    backgroundColor: Colors.surface,
    margin: 16,
    padding: 16,
    borderRadius: 16,
    elevation: 2,
  },
  formTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary, marginBottom: 14 },
  errorText: { color: Colors.error, fontSize: 13, marginBottom: 10 },
  list: { paddingHorizontal: 16, paddingBottom: 32 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  row: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
  },
  info: { flex: 1 },
  catName: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  catDesc: { fontSize: 13, color: Colors.textSecondary, marginTop: 3 },
  badge: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: { fontSize: 12, color: Colors.primary, fontWeight: '600' },
  emptyText: { color: Colors.textSecondary, fontSize: 14, textAlign: 'center' },
});

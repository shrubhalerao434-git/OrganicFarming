import React, { useState } from 'react';
import {
  KeyboardAvoidingView, Platform, ScrollView,
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { router } from 'expo-router';
import Header from '@/components/Header';
import InputField from '@/components/InputField';
import Button from '@/components/Button';
import { Colors } from '@/constants/colors';
import { CROP_STATUSES } from '@/constants/config';
import { cropService } from '@/services/cropService';
import { CropStatus } from '@/types/crop';

export default function AddCropScreen() {
  const [name, setName] = useState('');
  const [fieldName, setFieldName] = useState('');
  const [plantingDate, setPlantingDate] = useState('');
  const [harvestDate, setHarvestDate] = useState('');
  const [status, setStatus] = useState<CropStatus>('Planned');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSave() {
    if (!name.trim()) {
      setError('Crop name is required.');
      return;
    }
    try {
      setLoading(true);
      setError('');
      await cropService.create({
        name: name.trim(),
        field_name: fieldName.trim() || undefined,
        planting_date: plantingDate || undefined,
        expected_harvest_date: harvestDate || undefined,
        status,
      });
      router.back();
    } catch (e: any) {
      setError(e.message ?? 'Failed to add crop');
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Header title="Add Crop" subtitle="Track a new crop season" />
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {error ? <Text style={styles.errorBanner}>{error}</Text> : null}

        <InputField label="Crop Name *" value={name} onChangeText={setName} placeholder="e.g. Tomatoes" />
        <InputField label="Field Name" value={fieldName} onChangeText={setFieldName} placeholder="e.g. North Field" />
        <InputField
          label="Planting Date (YYYY-MM-DD)"
          value={plantingDate}
          onChangeText={setPlantingDate}
          placeholder="2025-06-01"
          keyboardType="numeric"
        />
        <InputField
          label="Expected Harvest Date (YYYY-MM-DD)"
          value={harvestDate}
          onChangeText={setHarvestDate}
          placeholder="2025-09-01"
          keyboardType="numeric"
        />

        {/* Status picker */}
        <Text style={styles.pickerLabel}>STATUS</Text>
        <View style={styles.statusRow}>
          {CROP_STATUSES.map((s) => (
            <TouchableOpacity
              key={s}
              style={[styles.statusChip, status === s && styles.statusChipActive]}
              onPress={() => setStatus(s)}
            >
              <Text style={[styles.statusChipText, status === s && styles.statusChipTextActive]}>
                {s}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Button title="Save Crop" onPress={handleSave} loading={loading} style={styles.btn} />
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
  pickerLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  statusRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  statusChip: {
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.surface,
  },
  statusChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  statusChipText: { fontSize: 13, color: Colors.textSecondary, fontWeight: '600' },
  statusChipTextActive: { color: '#fff' },
  btn: { marginBottom: 12 },
});

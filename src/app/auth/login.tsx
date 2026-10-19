import Button from '@/components/Button';
import InputField from '@/components/InputField';
import { Colors } from '@/constants/colors';
import { authService } from '@/services/authService';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView, Platform, ScrollView,
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin() {
    if (!email.trim() || !password) {
      setError('Please fill in all fields.');
      return;
    }
    try {
      setLoading(true);
      setError('');
      await authService.login({ email: email.trim(), password });
      router.replace('/');
    } catch (e: any) {
      setError(e.message ?? 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {/* Logo */}
        <View style={styles.logoBlock}>
          <Text style={styles.logoEmoji}>🌱</Text>
          <Text style={styles.logoTitle}>OrganicFarming</Text>
          <Text style={styles.logoSub}>Farm & Inventory Management</Text>
        </View>

        {/* Form Card */}
        <View style={styles.card}>
          <Text style={styles.heading}>Welcome back</Text>
          <Text style={styles.sub}>Sign in to continue</Text>

          {error ? <Text style={styles.errorBanner}>{error}</Text> : null}

          <InputField
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            keyboardType="email-address"
          />
          <InputField
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry
          />

          <Button title="Sign In" onPress={handleLogin} loading={loading} style={styles.btn} />

          <TouchableOpacity onPress={() => router.push('/auth/register' as any)}style={styles.link}>
            <Text style={styles.linkText}>
              Don't have an account? <Text style={styles.linkBold}>Register</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.background },
  container: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  logoBlock: { alignItems: 'center', marginBottom: 32 },
  logoEmoji: { fontSize: 56 },
  logoTitle: { fontSize: 28, fontWeight: '800', color: Colors.primaryDark, marginTop: 8 },
  logoSub: { fontSize: 13, color: Colors.textSecondary, marginTop: 4 },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  heading: { fontSize: 22, fontWeight: '800', color: Colors.textPrimary, marginBottom: 4 },
  sub: { fontSize: 14, color: Colors.textSecondary, marginBottom: 20 },
  errorBanner: {
    backgroundColor: '#FFEBEE',
    color: Colors.error,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 13,
  },
  btn: { marginTop: 8 },
  link: { alignItems: 'center', marginTop: 20 },
  linkText: { fontSize: 14, color: Colors.textSecondary },
  linkBold: { color: Colors.primary, fontWeight: '700' },
});

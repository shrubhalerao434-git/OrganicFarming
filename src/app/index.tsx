
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>🌱 OrganicFarming</Text>
        <Text style={styles.subtitle}>
          Farm & Inventory Management
        </Text>
      </View>

      <Text style={styles.heading}>Dashboard</Text>
      <Text style={styles.description}>
        Welcome back! Here is your farm overview.
      </Text>

      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardIcon}>📦</Text>
          <Text style={styles.cardTitle}>Total Products</Text>
          <Text style={styles.cardValue}>120</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardIcon}>🌾</Text>
          <Text style={styles.cardTitle}>Active Crops</Text>
          <Text style={styles.cardValue}>18</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardIcon}>🛒</Text>
          <Text style={styles.cardTitle}>Orders</Text>
          <Text style={styles.cardValue}>32</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardIcon}>⚠️</Text>
          <Text style={styles.cardTitle}>Low Stock</Text>
          <Text style={styles.cardValue}>5</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Overview</Text>
        <Text style={styles.item}>🌱  Farm & Crop Management</Text>
        <Text style={styles.item}>📦  Product Inventory</Text>
        <Text style={styles.item}>🛒  Orders & Sales</Text>
        <Text style={styles.item}>📊  Reports & Analytics</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F8F1',
  },
  header: {
    backgroundColor: '#176B3A',
    padding: 28,
    paddingTop: 50,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  logo: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#D9F0DF',
    marginTop: 8,
    fontSize: 14,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#183D27',
    margin: 20,
  },
  description: {
    color: '#687568',
    marginHorizontal: 20,
    marginTop: -12,
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '46%',
    margin: '2%',
    padding: 18,
    borderRadius: 16,
    elevation: 2,
  },
  cardIcon: {
    fontSize: 26,
  },
  cardTitle: {
    color: '#687568',
    fontSize: 13,
    marginTop: 12,
  },
  cardValue: {
    color: '#176B3A',
    fontSize: 27,
    fontWeight: 'bold',
    marginTop: 6,
  },
  section: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 16,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#183D27',
    marginBottom: 16,
  },
  item: {
    fontSize: 15,
    color: '#405345',
    paddingVertical: 12,
  },
});

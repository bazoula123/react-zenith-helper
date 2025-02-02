import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PieChart, BarChart } from 'recharts';

const screenWidth = Dimensions.get('window').width;

export default function DonationStats() {
  const pieData = [
    { name: 'Domestic', value: 95, fill: '#8884d8' },
    { name: 'International', value: 95, fill: '#82ca9d' },
  ];

  const monthlyData = [
    { name: 'Jan', hours: 45 },
    { name: 'Feb', hours: 52 },
    { name: 'Mar', hours: 48 },
    { name: 'Apr', hours: 70 },
    { name: 'May', hours: 55 },
    { name: 'Jun', hours: 58 },
    { name: 'Jul', hours: 90 },
    { name: 'Aug', hours: 80 },
    { name: 'Sep', hours: 65 },
    { name: 'Oct', hours: 75 },
    { name: 'Nov', hours: 85 },
    { name: 'Dec', hours: 82 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Donation Impact</Text>
      
      <View style={styles.statsGrid}>
        <LinearGradient
          colors={['#893571', '#b8658f']}
          style={styles.statCard}
        >
          <Icon name="clock-outline" size={32} color="#fff" />
          <Text style={styles.statNumber}>80:45</Text>
          <Text style={styles.statLabel}>Hours Total</Text>
          <Text style={styles.periodLabel}>Jul 24 - Aug 24</Text>
        </LinearGradient>

        <LinearGradient
          colors={['#b8658f', '#893571']}
          style={styles.statCard}
        >
          <Icon name="airplane" size={32} color="#fff" />
          <Text style={styles.statNumber}>218</Text>
          <Text style={styles.statLabel}>Flights Total</Text>
          <Text style={styles.periodLabel}>Feb 23 - Feb 24</Text>
        </LinearGradient>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Monthly Hours Distribution</Text>
        <BarChart
          width={screenWidth - 40}
          height={200}
          data={monthlyData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="hours" fill="#893571" />
        </BarChart>
      </View>

      <View style={styles.pieContainer}>
        <Text style={styles.chartTitle}>Flight Distribution</Text>
        <PieChart width={screenWidth - 40} height={200}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            label
          />
        </PieChart>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#893571',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
  },
  periodLabel: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
    marginTop: 4,
  },
  chartContainer: {
    marginTop: 24,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  pieContainer: {
    marginTop: 24,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
});
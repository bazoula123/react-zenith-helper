import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BarChart, PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function DonationStats() {
  const pieData = [
    {
      name: 'Domestic',
      population: 95,
      color: '#8884d8',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'International',
      population: 95,
      color: '#82ca9d',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
  ];

  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [45, 52, 48, 70, 55, 58],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(137, 53, 113, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

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
          data={monthlyData}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>

      <View style={styles.pieContainer}>
        <Text style={styles.chartTitle}>Flight Distribution</Text>
        <PieChart
          data={pieData}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
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
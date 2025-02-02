import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ProgressCircle } from 'react-native-svg-charts';

export default function ImpactMetrics() {
  const metrics = [
    {
      icon: 'earth',
      value: '218',
      label: 'Communities Reached',
      progress: 0.72,
      color: '#893571'
    },
    {
      icon: 'account-group',
      value: '1,240',
      label: 'People Helped',
      progress: 0.85,
      color: '#b8658f'
    },
    {
      icon: 'clock-outline',
      value: '82:48',
      label: 'Block Hours',
      progress: 0.65,
      color: '#d4a6c7'
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Global Impact</Text>
      <View style={styles.metricsContainer}>
        {metrics.map((metric, index) => (
          <View key={index} style={styles.metricCard}>
            <View style={styles.progressContainer}>
              <ProgressCircle
                style={styles.progressCircle}
                progress={metric.progress}
                progressColor={metric.color}
                backgroundColor="#f0f0f0"
                strokeWidth={8}
              />
              <Icon 
                name={metric.icon} 
                size={20} 
                color={metric.color}
                style={styles.iconOverlay}
              />
            </View>
            <Text style={styles.metricValue}>{metric.value}</Text>
            <Text style={styles.metricLabel}>{metric.label}</Text>
          </View>
        ))}
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
  metricsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  metricCard: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 8,
  },
  progressContainer: {
    width: 70,
    height: 70,
    position: 'relative',
    marginBottom: 8,
  },
  progressCircle: {
    height: 70,
  },
  iconOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [
      { translateX: -10 },
      { translateY: -10 }
    ],
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
    textAlign: 'center',
  },
});
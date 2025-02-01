import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { Typography } from '../../../common/typography';
import { Colors, Shadows } from '../../../common/design';

const ImpactContainer = () => {
  const { t } = useTranslation();

  const impactCards = [
    {
      title: t('ImpaContainer.YourImpact'),
      stats: [
        { number: '2,450', label: t('ImpaContainer.MealsShared') },
        { number: '127', label: t('ImpaContainer.LivesTouched') },
        { number: '15', label: t('ImpaContainer.NGOsHelped') }
      ]
    },
    {
      title: t('ImpaContainer.Overall'),
      stats: [
        { number: '3,100', label: t('ImpaContainer.MealsShared') },
        { number: '215', label: t('ImpaContainer.LivesTouched') },
        { number: '20', label: t('ImpaContainer.NGOsHelped') }
      ]
    }
  ];

  const renderStatItem = (stat, index, totalStats) => (
    <React.Fragment key={index}>
      <View style={styles.statItem}>
        <Text style={[Typography.h2, styles.statNumber]}>{stat.number}</Text>
        <Text style={[Typography.bodySmall, styles.statLabel]}>{stat.label}</Text>
      </View>
      {index < totalStats - 1 && <View style={styles.statDivider} />}
    </React.Fragment>
  );

  return (
    <View style={styles.pageContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {impactCards.map((card, cardIndex) => (
          <View key={cardIndex} style={styles.impactContainer}>
            <LinearGradient
              colors={[Colors.secondary, '#b8658f']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.impactCard, Shadows.medium]}
            >
              <Text style={[Typography.h2, styles.impactTitle]}>{card.title}</Text>
              <View style={styles.impactStats}>
                {card.stats.map((stat, index) => 
                  renderStatItem(stat, index, card.stats.length)
                )}
              </View>
            </LinearGradient>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    marginTop: 24,
    marginBottom: 16,
  },
  scrollContainer: {
    paddingHorizontal: 16,
  },
  impactContainer: {
    marginRight: 16,
    width: 320,
  },
  impactCard: {
    padding: 24,
    borderRadius: 16,
    elevation: 3,
  },
  impactTitle: {
    color: '#FFF',
    marginBottom: 20,
  },
  impactStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    color: '#FFF',
    marginBottom: 4,
  },
  statLabel: {
    color: '#FFF',
    opacity: 0.9,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 8,
  },
});

export default ImpactContainer;
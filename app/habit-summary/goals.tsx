import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LineChart, BarChart } from 'react-native-svg-charts';
import { Grid } from 'react-native-svg-charts';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { Card } from '@/src/components/Card';
import { colors } from '@/src/constants/colors';
import { fonts } from '@/src/constants/fonts';

export default function GoalsScreen() {
  const progressData = [40, 45, 55, 60, 65, 70, 75];
  const consistencyData = [80, 65, 90, 85, 75, 95, 85];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Animated.View entering={FadeInDown.duration(500).delay(100)}>
        <Card style={styles.card}>
          <Text style={styles.title}>Goal Progress</Text>
          <View style={styles.chartContainer}>
            <LineChart
              style={{ height: 200 }}
              data={progressData}
              svg={{ stroke: colors.button.primary, strokeWidth: 3 }}
              contentInset={{ top: 20, bottom: 20 }}
            >
              <Grid />
            </LineChart>
          </View>
          <Text style={styles.description}>
            Your goal completion rate has improved by 35% over the past week
          </Text>
        </Card>
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(500).delay(200)}>
        <Card style={styles.card}>
          <Text style={styles.title}>Consistency Score</Text>
          <View style={styles.chartContainer}>
            <BarChart
              style={{ height: 200 }}
              data={consistencyData}
              svg={{ fill: colors.button.accent }}
              contentInset={{ top: 20, bottom: 20 }}
            >
              <Grid />
            </BarChart>
          </View>
          <Text style={styles.description}>
            You've maintained an average consistency score of 82%
          </Text>
        </Card>
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(500).delay(300)}>
        <Card style={styles.card}>
          <Text style={styles.title}>Key Insights</Text>
          <View style={styles.insightContainer}>
            <View style={styles.insight}>
              <Text style={styles.insightValue}>75%</Text>
              <Text style={styles.insightLabel}>Goal Completion</Text>
            </View>
            <View style={styles.insight}>
              <Text style={styles.insightValue}>5</Text>
              <Text style={styles.insightLabel}>Active Goals</Text>
            </View>
            <View style={styles.insight}>
              <Text style={styles.insightValue}>12</Text>
              <Text style={styles.insightLabel}>Days Streak</Text>
            </View>
          </View>
        </Card>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  card: {
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: fonts.sizes.lg,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
    marginBottom: 16,
  },
  chartContainer: {
    marginBottom: 16,
  },
  description: {
    fontSize: fonts.sizes.md,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  insightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  insight: {
    alignItems: 'center',
  },
  insightValue: {
    fontSize: fonts.sizes.xxl,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
    marginBottom: 4,
  },
  insightLabel: {
    fontSize: fonts.sizes.sm,
    color: colors.text.secondary,
  },
});
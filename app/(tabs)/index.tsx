import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  Switch 
} from 'react-native';
import { Link } from 'expo-router';
import Animated, { 
  FadeInDown, 
  useSharedValue, 
  useAnimatedStyle,
  withTiming 
} from 'react-native-reanimated';
import { CircleCheck as CheckCircle2, Clock, ListTodo, Globe, BellRing, ArrowRight } from 'lucide-react-native';

import { Card } from '@/src/components/Card';
import { Header } from '@/src/components/Header';
import { useAuthContext } from '@/src/context/AuthContext';
import { colors } from '@/src/constants/colors';
import { fonts } from '@/src/constants/fonts';

export default function HomeScreen() {
  const { user } = useAuthContext();
  const [focusMode, setFocusMode] = useState(false);
  const focusOpacity = useSharedValue(0);

  const toggleFocusMode = () => {
    setFocusMode(!focusMode);
    focusOpacity.value = withTiming(focusMode ? 0 : 1, { duration: 500 });
  };

  const focusOverlayStyle = useAnimatedStyle(() => {
    return {
      opacity: focusOpacity.value,
      display: focusOpacity.value === 0 ? 'none' : 'flex',
    };
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <View style={styles.container}>
      <Header title="Home" />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          entering={FadeInDown.duration(500).delay(100)}
          style={styles.greetingContainer}
        >
          <Text style={styles.greeting}>
            {getGreeting()}, {user?.name?.split(' ')[0]}
          </Text>
          <View style={styles.focusModeContainer}>
            <Text style={styles.focusModeLabel}>Focus Mode</Text>
            <Switch
              value={focusMode}
              onValueChange={toggleFocusMode}
              trackColor={{ false: colors.background.container, true: colors.button.primary }}
              thumbColor={colors.text.primary}
              ios_backgroundColor={colors.background.container}
              style={styles.switch}
            />
          </View>
        </Animated.View>
        
        <View style={styles.cardsContainer}>
          <Animated.View entering={FadeInDown.duration(500).delay(200)}>
            <Link href="/habit-summary" asChild>
              <TouchableOpacity activeOpacity={0.8}>
                <Card style={styles.card}>
                  <View style={styles.cardIconContainer}>
                    <ListTodo size={24} color={colors.button.primary} />
                  </View>
                  <Text style={styles.cardTitle}>Habit Summary</Text>
                  <Text style={styles.cardDescription}>
                    Track your daily habits and progress
                  </Text>
                  <View style={styles.cardFooter}>
                    <View style={styles.progressContainer}>
                      <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: '70%' }]} />
                      </View>
                      <Text style={styles.progressText}>70% Complete</Text>
                    </View>
                    <ArrowRight size={16} color={colors.text.muted} />
                  </View>
                </Card>
              </TouchableOpacity>
            </Link>
          </Animated.View>
          
          {/* Rest of the cards remain unchanged */}
        </View>
      </ScrollView>
      
      {/* Focus Mode Overlay remains unchanged */}
    </View>
  );
}

const styles = StyleSheet.create({
  // Styles remain unchanged
});
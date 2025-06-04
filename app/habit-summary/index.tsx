import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Link } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ChartBar, ArrowRight } from 'lucide-react-native';

import { Card } from '@/src/components/Card';
import { Button } from '@/src/components/Button';
import { colors } from '@/src/constants/colors';
import { fonts } from '@/src/constants/fonts';

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

export default function HabitSummaryScreen() {
  const [goalInput, setGoalInput] = useState('');
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const generateTodos = (goal: string) => {
    // Simple logic to break down goals into todos
    const words = goal.toLowerCase().split(' ');
    const newTodos: TodoItem[] = [];

    if (words.includes('exercise') || words.includes('workout')) {
      newTodos.push(
        { id: Date.now().toString(), text: 'Plan workout routine', completed: false },
        { id: (Date.now() + 1).toString(), text: 'Prepare workout clothes', completed: false },
        { id: (Date.now() + 2).toString(), text: 'Schedule workout time', completed: false }
      );
    }

    if (words.includes('study') || words.includes('learn')) {
      newTodos.push(
        { id: (Date.now() + 3).toString(), text: 'Create study schedule', completed: false },
        { id: (Date.now() + 4).toString(), text: 'Gather study materials', completed: false },
        { id: (Date.now() + 5).toString(), text: 'Find quiet study space', completed: false }
      );
    }

    // Add a general todo if no specific category is matched
    if (newTodos.length === 0) {
      newTodos.push(
        { id: (Date.now() + 6).toString(), text: `Start working on: ${goal}`, completed: false },
        { id: (Date.now() + 7).toString(), text: 'Track daily progress', completed: false }
      );
    }

    return newTodos;
  };

  const handleSaveGoal = () => {
    if (!goalInput.trim()) return;

    const newTodos = generateTodos(goalInput);
    setTodos([...todos, ...newTodos]);
    setGoalInput('');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Animated.View entering={FadeInDown.duration(500).delay(100)}>
        <Card style={styles.inputCard}>
          <Text style={styles.label}>What's your goal?</Text>
          <TextInput
            style={styles.input}
            value={goalInput}
            onChangeText={setGoalInput}
            placeholder="Enter your goal..."
            placeholderTextColor={colors.text.muted}
            multiline
          />
          <Button
            title="Save Goal"
            onPress={handleSaveGoal}
            style={styles.saveButton}
          />
        </Card>
      </Animated.View>

      {todos.length > 0 && (
        <Animated.View entering={FadeInDown.duration(500).delay(200)}>
          <Card style={styles.todosCard}>
            <Text style={styles.todosTitle}>Action Items</Text>
            {todos.map((todo, index) => (
              <TouchableOpacity
                key={todo.id}
                style={styles.todoItem}
                onPress={() => toggleTodo(todo.id)}
              >
                <View style={[styles.checkbox, todo.completed && styles.checkboxChecked]} />
                <Text style={[styles.todoText, todo.completed && styles.todoTextCompleted]}>
                  {todo.text}
                </Text>
              </TouchableOpacity>
            ))}
          </Card>
        </Animated.View>
      )}

      <Animated.View entering={FadeInDown.duration(500).delay(300)}>
        <Link href="/habit-summary/goals" asChild>
          <TouchableOpacity>
            <Card style={styles.analyticsCard}>
              <View style={styles.analyticsContent}>
                <ChartBar size={24} color={colors.button.primary} />
                <Text style={styles.analyticsText}>View Goals Analytics</Text>
              </View>
              <ArrowRight size={20} color={colors.text.muted} />
            </Card>
          </TouchableOpacity>
        </Link>
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
  inputCard: {
    padding: 16,
  },
  label: {
    fontSize: fonts.sizes.lg,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
    marginBottom: 12,
  },
  input: {
    backgroundColor: colors.background.container,
    borderRadius: 8,
    padding: 12,
    color: colors.text.primary,
    fontSize: fonts.sizes.md,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    marginTop: 16,
  },
  todosCard: {
    padding: 16,
    marginTop: 16,
  },
  todosTitle: {
    fontSize: fonts.sizes.lg,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
    marginBottom: 16,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.button.primary,
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: colors.button.primary,
  },
  todoText: {
    fontSize: fonts.sizes.md,
    color: colors.text.primary,
    flex: 1,
  },
  todoTextCompleted: {
    textDecorationLine: 'line-through',
    color: colors.text.muted,
  },
  analyticsCard: {
    padding: 16,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  analyticsContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  analyticsText: {
    fontSize: fonts.sizes.md,
    color: colors.text.primary,
    marginLeft: 12,
  },
});
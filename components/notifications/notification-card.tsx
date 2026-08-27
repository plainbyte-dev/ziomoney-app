import { Ionicons } from '@expo/vector-icons';
import { useRef } from 'react';
import { Animated, PanResponder, Pressable, StyleSheet, Text, View } from 'react-native';

import type { NotificationItem } from './notification-data';
import { categoryMeta } from './notification-data';

const DELETE_WIDTH = 80;

type NotificationCardProps = {
  notification: NotificationItem;
  onDelete: () => void;
};

export function NotificationCard({ notification, onDelete }: NotificationCardProps) {
  const meta = categoryMeta[notification.category];
  const translateX = useRef(new Animated.Value(0)).current;
  const openRef = useRef(false);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) =>
        Math.abs(gesture.dx) > 6 && Math.abs(gesture.dx) > Math.abs(gesture.dy),
      onPanResponderMove: (_, gesture) => {
        const baseOffset = openRef.current ? -DELETE_WIDTH : 0;
        const next = baseOffset + gesture.dx;
        translateX.setValue(Math.min(0, Math.max(-DELETE_WIDTH, next)));
      },
      onPanResponderRelease: (_, gesture) => {
        const baseOffset = openRef.current ? -DELETE_WIDTH : 0;
        const finalPosition = Math.min(0, Math.max(-DELETE_WIDTH, baseOffset + gesture.dx));
        const shouldOpen = finalPosition < -DELETE_WIDTH / 2;
        openRef.current = shouldOpen;
        Animated.spring(translateX, {
          toValue: shouldOpen ? -DELETE_WIDTH : 0,
          useNativeDriver: true,
          bounciness: 0,
        }).start();
      },
    }),
  ).current;

  const handleDelete = () => {
    Animated.timing(translateX, { toValue: 0, duration: 150, useNativeDriver: true }).start();
    onDelete();
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.deleteBackground}>
        <Pressable style={styles.deleteButton} onPress={handleDelete} hitSlop={8}>
          <Ionicons name="trash-outline" size={20} color="#FFFFFF" />
        </Pressable>
      </View>

      <Animated.View style={[styles.card, { transform: [{ translateX }] }]} {...panResponder.panHandlers}>
        <View style={styles.headerRow}>
          <View style={[styles.iconCircle, { backgroundColor: meta.iconBackground }]}>
            <Ionicons name={meta.icon} size={18} color={meta.iconColor} />
          </View>
          <Text style={styles.title}>{notification.title}</Text>
          <View style={[styles.badge, { backgroundColor: meta.badgeBackground }]}>
            <Text style={[styles.badgeLabel, { color: meta.badgeColor }]}>{meta.badgeLabel}</Text>
          </View>
        </View>

        <Text style={styles.message} numberOfLines={2}>
          {notification.message}
        </Text>

        <Text style={styles.time}>{notification.time}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'relative',
  },
  deleteBackground: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  deleteButton: {
    width: DELETE_WIDTH,
    height: '100%',
    backgroundColor: '#E24C4C',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    fontSize: 14.5,
    fontWeight: '700',
    color: '#1A2B3C',
  },
  badge: {
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeLabel: {
    fontSize: 11,
    fontWeight: '700',
  },
  message: {
    marginTop: 10,
    fontSize: 13,
    color: '#7A8894',
    lineHeight: 18,
  },
  time: {
    marginTop: 8,
    fontSize: 12,
    color: '#B7C2CB',
  },
});

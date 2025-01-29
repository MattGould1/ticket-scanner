import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { useAppSelector } from "../../store/hooks";
import { ArrowLeft, Bell, Menu } from "lucide-react-native";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showMenu?: boolean;
  showNotifications?: boolean;
  rightComponent?: React.ReactNode;
  onMenuPress?: () => void;
  onNotificationPress?: () => void;
}

export function Header({
  title,
  showBack = false,
  showMenu = false,
  showNotifications = false,
  rightComponent,
  onMenuPress,
  onNotificationPress,
}: HeaderProps) {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);

  return (
    <ThemedView className="border-b border-gray-200 dark:border-gray-800">
      <View
        className="flex-row items-center justify-between px-4"
        style={styles.header}
      >
        <View className="flex-row items-center gap-3">
          {showBack && (
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={24} color="white" />
            </TouchableOpacity>
          )}

          {showMenu && (
            <TouchableOpacity onPress={onMenuPress}>
              <Menu size={24} color="white" />
            </TouchableOpacity>
          )}

          <ThemedText className="text-lg font-semibold">
            {title || user?.name || "Welcome"}
          </ThemedText>
        </View>

        <View className="flex-row items-center gap-4">
          {showNotifications && (
            <TouchableOpacity onPress={onNotificationPress}>
              <View className="relative">
                <Bell size={24} color="white" />
                {/* Optional notification badge */}
                <View className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
              </View>
            </TouchableOpacity>
          )}

          {rightComponent}
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
  },
});

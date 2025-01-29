import React from "react";
import { View, TouchableOpacity } from "react-native";

import { useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../store/slices/authSlice";
import { Camera, Settings } from "lucide-react-native";
import { Text } from "../ui/text";

export function DrawerContent() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());

    router.replace("/");
  };

  const menuItems = [
    { icon: Camera, label: "Scan Tickets", route: "/(protected)/scan-tickets" },
    { icon: Settings, label: "Settings", route: "/(protected)/settings" },
  ] as const;

  return (
    <View className="flex-1">
      {/* User Profile Section */}
      <View className="p-4 border-b border-gray-200 dark:border-gray-800">
        <Text className="text-xl font-bold mb-2">
          {user?.name || "Welcome"}
        </Text>
        <Text className="text-gray-500 dark:text-gray-400">{user?.email}</Text>
      </View>

      {/* Menu Items */}
      <View className="flex-1 px-2 py-4">
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            className="flex-row items-center px-4 py-3 mb-2 rounded-lg active:bg-gray-200 dark:active:bg-gray-800"
            onPress={() => router.push(item.route)}
          >
            <item.icon size={24} className="text-base text-foreground" />
            <Text className="ml-3 text-lg">{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        className="flex-row items-center px-6 py-4 border-t border-gray-200 dark:border-gray-800"
        onPress={handleLogout}
      >
        <Text className="ml-3 text-lg">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

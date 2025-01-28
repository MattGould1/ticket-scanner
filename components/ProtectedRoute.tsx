import { useAuth } from "../contexts/AuthContext";
import { Redirect } from "expo-router";
import React from "react";
import { View, ActivityIndicator } from "react-native";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/" />;
  }

  return <>{children}</>;
}

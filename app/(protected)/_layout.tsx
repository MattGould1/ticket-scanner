import { Drawer } from "expo-router/drawer";
import { DrawerContent } from "../../components/layout/DrawerContent";
import { ProtectedRoute } from "../../components/ProtectedRoute";

export default function ProtectedLayout() {
  const isDark = true;

  return (
    <ProtectedRoute>
      <Drawer
        defaultStatus="closed"
        screenOptions={{
          headerShown: false,
          drawerType: "front",
          overlayColor: isDark ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.5)",
        }}
        drawerContent={(props) => <DrawerContent />}
      >
        <Drawer.Screen
          name="scan-tickets"
          options={{
            drawerLabel: "Scan Tickets",
            title: "Scan Tickets",
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: "Settings",
            title: "Settings",
          }}
        />
      </Drawer>
    </ProtectedRoute>
  );
}

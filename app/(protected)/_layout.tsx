import { Drawer } from "react-native-drawer-layout";
import { ProtectedRoute } from "../../components/ProtectedRoute";
import { useColorScheme } from "../../lib/useColorScheme";
import { Slot } from "expo-router";
import { Button } from "~/components/ui/button";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { Text } from "~/components/ui/text";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function ProtectedLayout() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const [open, setOpen] = useState(true);

  return (
    <GestureHandlerRootView>
      <Drawer
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        direction="ltr"
        drawerType="slide"
        drawerPosition="left"
        renderDrawerContent={() => {
          return (
            <View style={styles.container}>
              <Button onPress={() => setOpen(false)}>
                <Text>Close drawer</Text>
              </Button>
            </View>
          );
        }}
      >
        <ProtectedRoute>
          <Slot />
        </ProtectedRoute>
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  buttons: {
    gap: 8,
  },
});

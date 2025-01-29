import { router, useRouter } from "expo-router";
import { Settings } from "lucide-react-native";
import React from "react";
import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Header } from "~/components/layout/Header";
import NavigationMenuImpl from "~/components/layout/NavigationMenu";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { useColorScheme } from "~/lib/useColorScheme";

export default function SettingsScreen() {
  const router = useRouter();

  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  const [checked, setChecked] = useState(isDarkColorScheme);

  useEffect(() => {
    setColorScheme(checked ? "dark" : "light");
  }, [checked]);

  return (
    <View>
      <Header title="Scan Tickets" showBack={false} showMenu={true} />

      <View className="flex-1   p-6 gap-12">
        <View className="flex-row items-center gap-2">
          <Switch
            checked={checked}
            onCheckedChange={setChecked}
            nativeID="dark-mode"
          />
          <Label
            nativeID="dark-mode"
            onPress={() => {
              setChecked((prev) => !prev);
            }}
          >
            {checked ? "Dark Mode" : "Light Mode"}
          </Label>
        </View>
      </View>
    </View>
  );
}

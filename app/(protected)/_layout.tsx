import { ProtectedRoute } from "../../components/ProtectedRoute";
import { Slot } from "expo-router";

export default function ProtectedLayout() {
  return (
    <ProtectedRoute>
      <Slot />
    </ProtectedRoute>
  );
}

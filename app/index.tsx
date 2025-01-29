import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Container from "~/components/layout/Container";
import FormCard from "~/components/cards/FormCard";
import { Text } from "~/components/ui/text";
import { Button } from "../components/ui/button";
import { useRouter } from "expo-router";
import { Input } from "~/components/ui/input";
import { EyeClosed } from "~/lib/icons/EyeClosed";
import { Eye } from "~/lib/icons/Eye";
import { Controller, useForm } from "react-hook-form";
import { login, setCredentials } from "../store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import { PublicRoute } from "~/components/PublicRoute";

type FormData = {
  username: string;
  password: string;
};

export default function LoginScreen() {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: FormData) => {
    const result = await dispatch(
      login({ username: data.username, password: data.password })
    ).unwrap();

    dispatch(setCredentials({ token: result.token, user: "matthew gould" }));

    navigateToQRCodeScan();
  };

  const navigateToQRCodeScan = () => {
    router.push("/(protected)/scan-tickets");
  };

  const cardContent = (
    <View style={styles.container}>
      <View className="flex flex-col gap-4">
        <Controller
          control={control}
          disabled={isLoading}
          render={({ field: { onChange, value } }) => (
            <View>
              <Text className="mb-2">Username</Text>
              <Input
                placeholder="Username"
                value={value}
                onChangeText={onChange}
                aria-labelledby="Username"
                aria-errormessage="Username invalid."
                editable={!isLoading}
              />
            </View>
          )}
          name="username"
          rules={{
            required: {
              value: true,
              message: "Username is required",
            },
          }}
          defaultValue=""
        ></Controller>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View>
              <Text className="mb-2">Password</Text>
              <View className="relative">
                <Input
                  placeholder="Password"
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry={!showPassword}
                  aria-labelledby="Password"
                  aria-errormessage="Password invalid."
                  editable={!isLoading}
                />
                <TouchableOpacity
                  className="absolute right-3 top-3"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeClosed size={18} color="white" />
                  ) : (
                    <Eye size={18} color="white" />
                  )}
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text style={{ color: "red" }}>{errors.password.message}</Text>
              )}
            </View>
          )}
          name="password"
          rules={{
            required: {
              value: true,
              message: "Password is required",
            },
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          }}
          defaultValue=""
        ></Controller>

        <Button disabled={isLoading} onPress={handleSubmit(onSubmit)}>
          <Text>Login</Text>
        </Button>

        {error && <Text style={{ color: "red" }}>{error}</Text>}
      </View>
    </View>
  );

  return (
    <PublicRoute>
      <View>
        <Container fullScreen={true} center={true}>
          <Image
            source={require("@/assets/images/logo.svg")}
            style={styles.logo}
          ></Image>

          <FormCard
            title="Ticket Check-In"
            description="Scan tickets"
            children={cardContent}
          ></FormCard>
        </Container>
      </View>
    </PublicRoute>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logo: {
    width: 100,
    height: 100,
  },
  container: {
    height: 400,
  },
});

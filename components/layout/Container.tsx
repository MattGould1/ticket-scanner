import { StyleSheet, useWindowDimensions, View, ViewProps } from "react-native";

export type ContainerProps = ViewProps & {
  fullScreen?: boolean;
  center?: boolean;
  padding?: number;
};
export default function CenteredFullScreenContainer({
  fullScreen,
  center,
  padding,
  ...props
}: ContainerProps) {
  const { height } = useWindowDimensions();

  return (
    <View
      className={`w-full flex ${center ? "justify-center items-center" : ""} ${
        fullScreen ? "h-screen" : ""
      } ${padding ? `p-${padding}` : ""}`}
      {...props}
      style={[{ height: height - 60 }]}
    ></View>
  );
}

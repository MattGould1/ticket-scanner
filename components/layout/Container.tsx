import { View, ViewProps } from "react-native";

export type ContainerProps = ViewProps & {
  fullScreen?: boolean;
  center?: boolean;
};
export default function CenteredFullScreenContainer({
  fullScreen,
  center,
  ...props
}: ContainerProps) {
  return (
    <View
      className={`container p-1 flex ${
        center ? "justify-center items-center" : ""
      } ${fullScreen ? "h-screen" : ""}`}
      {...props}
    ></View>
  );
}

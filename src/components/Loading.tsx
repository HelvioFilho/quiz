import { ActivityIndicator, View } from "react-native";

type LoadingProps = {
  size?: "small" | "large";
};

export function Loading({ size = "small" }: LoadingProps) {
  return (
    <View className="flex-1 items-center justify-center bg-grey-800">
      <ActivityIndicator color="#00B37E" size={size} />
    </View>
  );
}

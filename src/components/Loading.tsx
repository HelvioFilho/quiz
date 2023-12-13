import { ActivityIndicator, View } from "react-native";
import { COLORS } from "@/constants/colors";
type LoadingProps = {
  size?: "small" | "large";
};

export function Loading({ size = "small" }: LoadingProps) {
  return (
    <View className="flex-1 items-center justify-center bg-grey-800">
      <ActivityIndicator color={COLORS.brand.light} size={size} />
    </View>
  );
}

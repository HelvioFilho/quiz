import { COLORS } from "@/constants/colors";
import { View } from "react-native";

const LEVEL_COLORS = [COLORS.brand.light, COLORS.warning, COLORS.danger];

type LevelBarsProps = {
  level: number;
};
export function LevelBars({ level }: LevelBarsProps) {
  const backgroundColor = LEVEL_COLORS[level - 1];
  return (
    <View className="flex-row items-end">
      <View
        className="w-1 h-1.5 bg-grey-500 rounded-md ml-1"
        style={{
          backgroundColor,
        }}
      />
      <View
        className="w-1 h-3 bg-grey-500 rounded-md ml-1"
        style={
          level > 1 && {
            backgroundColor,
          }
        }
      />
      <View
        className="w-1 h-5 bg-grey-500 rounded-md ml-1"
        style={
          level > 2 && {
            backgroundColor,
          }
        }
      />
    </View>
  );
}

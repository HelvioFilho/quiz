import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type ProgressBarProps = {
  total: number;
  current: number;
};

export function ProgressBar({ total, current }: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100);

  const sharedProgress = useSharedValue(0);

  const styleAnimated = useAnimatedStyle(() => {
    return {
      width: `${sharedProgress.value}%`,
    };
  });

  useEffect(() => {
    sharedProgress.value = withTiming(percentage, { duration: 700 });
  }, [current]);

  return (
    <View className="h-2 w-full rounded-lg bg-grey-500">
      <Animated.View
        className="h-2 rounded-lg bg-brand-light"
        style={styleAnimated}
      />
    </View>
  );
}

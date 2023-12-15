import { Text, Pressable, PressableProps } from "react-native";
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { COLORS } from "@/constants/colors";
import { useEffect } from "react";

const TYPE_COLORS = {
  EASY: COLORS.brand.light,
  HARD: COLORS.danger,
  MEDIUM: COLORS.warning,
};

type LevelProps = PressableProps & {
  title: string;
  isChecked?: boolean;
  type?: keyof typeof TYPE_COLORS;
};

export function Level({
  title,
  type = "EASY",
  isChecked = false,
  ...rest
}: LevelProps) {
  const scale = useSharedValue(1);
  const checked = useSharedValue(1);

  const COLOR = TYPE_COLORS[type];

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      backgroundColor: interpolateColor(
        checked.value,
        [0, 1],
        ["transparent", COLOR]
      ),
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(checked.value, [0, 1], [COLOR, COLORS.grey[100]]),
    };
  });

  function onPressIn() {
    scale.value = withTiming(1.2, { easing: Easing.bounce });
  }

  function onPressOut() {
    scale.value = 1;
  }

  useEffect(() => {
    checked.value = withTiming(isChecked ? 1 : 0, { duration: 500 });
  }, [isChecked]);

  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut} {...rest}>
      <Animated.View
        className="w-20 h-9 rounded border items-center justify-center m-1.5"
        style={[
          animatedContainerStyle,
          {
            borderColor: COLOR,
          },
        ]}
      >
        <Animated.Text
          className="uppercase text-xs font-regular"
          style={animatedTextStyle}
        >
          {title}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
}

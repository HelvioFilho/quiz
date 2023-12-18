import { useEffect } from "react";
import { useWindowDimensions } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { BlurMask, Canvas, Rect } from "@shopify/react-native-skia";

import { COLORS } from "@/constants/colors";

const STATUS = ["transparent", COLORS.brand.light, COLORS.danger];

type OverlayFeedbackProps = {
  status: number;
};

export function OverlayFeedback({ status }: OverlayFeedbackProps) {
  const opacity = useSharedValue(0);
  const color = STATUS[status];

  const { height, width } = useWindowDimensions();

  const styleAnimated = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    opacity.value = withSequence(
      withTiming(1, { duration: 400, easing: Easing.bounce }),
      withTiming(0)
    );
  }, [status]);

  return (
    <Animated.View
      style={[
        styleAnimated,
        {
          position: "absolute",
          with: width,
          height: height,
        },
      ]}
    >
      <Canvas className="flex-1">
        <Rect x={0} y={0} width={width} height={height} color={color}>
          <BlurMask blur={50} style={"inner"} />
        </Rect>
      </Canvas>
    </Animated.View>
  );
}

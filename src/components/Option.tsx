import { useEffect } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

import {
  Canvas,
  Path,
  Skia,
  useValue,
  runTiming,
  BlurMask,
  Circle,
  Easing,
} from "@shopify/react-native-skia";
import { COLORS } from "@/constants/colors";

type OptionProps = TouchableOpacityProps & {
  title: string;
  checked: boolean;
};

const CHECK_SIZE = 28;
const CHECK_STROKE = 2;

export function Option({ title, checked, ...rest }: OptionProps) {
  const percentage = useValue(0);
  const circle = useValue(0);

  const RADIUS = (CHECK_SIZE - CHECK_STROKE) / 2;
  const CENTER_CIRCLE = RADIUS / 2;

  const path = Skia.Path.Make();
  path.addCircle(CHECK_SIZE, CHECK_SIZE, RADIUS);

  useEffect(() => {
    if (checked) {
      runTiming(percentage, 1, { duration: 700 });
      runTiming(circle, CENTER_CIRCLE, { easing: Easing.bounce });
    } else {
      runTiming(circle, 0, { duration: 300 });
      runTiming(percentage, 0, { duration: 700 });
    }
  }, [checked]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={`
        w-full
        min-h-[76px]
        bg-grey-800
        rounded-md
        flex-row
        items-center
        justify-center
        p-4
        mb-3
        ${checked && "border-brand-light border"}
      `}
      {...rest}
    >
      <Text className="flex-1 font-regular text-sm text-grey-100 mr-8">
        {title}
      </Text>
      <Canvas style={{ height: CHECK_SIZE * 2, width: CHECK_SIZE * 2 }}>
        <Path
          path={path}
          color={COLORS.grey[500]}
          style="stroke"
          strokeWidth={CHECK_STROKE}
        />

        <Path
          path={path}
          color={COLORS.brand.light}
          style="stroke"
          strokeWidth={CHECK_STROKE}
          start={0}
          end={percentage}
        >
          <BlurMask blur={1} style="solid" />
        </Path>

        <Circle
          cx={CHECK_SIZE}
          cy={CHECK_SIZE}
          r={circle}
          color={COLORS.brand.light}
        >
          <BlurMask blur={4} style="solid" />
        </Circle>
      </Canvas>
    </TouchableOpacity>
  );
}

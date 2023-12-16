import {
  Dimensions,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

import { LevelBars } from "./LevelBars";

import { QUIZZES } from "@/data/quizzes";
import { COLORS } from "@/constants/colors";

const TouchableOpacityAnimated =
  Animated.createAnimatedComponent(TouchableOpacity);

type QuizCardProps = TouchableOpacityProps & {
  data: (typeof QUIZZES)[0];
  index: number;
};

export function QuizCard({ data, index, ...rest }: QuizCardProps) {
  const Icon = data.svg;

  const dimensions = Dimensions.get("window");
  const CARD_PER_ROW = 2;
  const HORIZONTAL_PADDING_SCREEN = 32 * 2;
  const MARGIN = 6 * 2;
  const CARD_WIDTH =
    (dimensions.width - HORIZONTAL_PADDING_SCREEN - MARGIN) / CARD_PER_ROW;

  return (
    <TouchableOpacityAnimated
      entering={FadeIn.delay(index * 100)}
      className="h-40 bg-grey-700 rounded-md p-4"
      style={{
        width: CARD_WIDTH,
        margin: MARGIN,
      }}
      {...rest}
    >
      <View className="flex-row justify-between items-center">
        <View className="w-10 h-10 items-center justify-center rounded-md bg-grey-600">
          {Icon && <Icon size={24} color={COLORS.grey[100]} />}
        </View>
        <LevelBars level={data.level} />
      </View>
      <Text className="flex-1 text-base font-regular text-grey-100 mt-6">
        {data.title}
      </Text>
    </TouchableOpacityAnimated>
  );
}

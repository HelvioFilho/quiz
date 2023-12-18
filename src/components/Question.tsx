import { Dimensions, Text, View } from "react-native";
import { Option } from "./Option";
import Animated, { Keyframe, runOnJS } from "react-native-reanimated";

type QuestionProps = {
  title: string;
  alternatives: string[];
};

type QuestionComponentProps = {
  question: QuestionProps;
  onUnmount: () => void;
  alternativeSelected?: number | null;
  setAlternativeSelected?: (value: number) => void;
};

export function Question({
  question,
  onUnmount,
  alternativeSelected,
  setAlternativeSelected,
}: QuestionComponentProps) {
  const { width } = Dimensions.get("window");
  const MARGIN_HORIZONTAL = 24 * 2;

  const enteringKeyframe = new Keyframe({
    0: {
      opacity: 0,
      transform: [{ translateX: width }, { rotate: "90deg" }],
    },
    70: {
      opacity: 0.3,
    },
    100: {
      opacity: 1,
      transform: [{ translateX: 0 }, { rotate: "0deg" }],
    },
  });

  const exitingKeyframe = new Keyframe({
    from: {
      opacity: 1,
      transform: [{ translateX: 0 }, { rotate: "0deg" }],
    },
    to: {
      opacity: 0,
      transform: [{ translateX: width * -1 }, { rotate: "-90deg" }],
    },
  });

  return (
    <Animated.View
      className="bg-grey-700 rounded-xl p-5"
      style={{ width: width - MARGIN_HORIZONTAL }}
      entering={enteringKeyframe}
      exiting={exitingKeyframe.withCallback((finished) => {
        "worklet";
        if (finished) {
          runOnJS(onUnmount)();
        }
      })}
    >
      <Text className="font-bold text-lg text-white text-center mb-4">
        {question.title}
      </Text>
      {question.alternatives.map((alternative, index) => (
        <Option
          key={index}
          title={alternative}
          checked={alternativeSelected === index}
          onPress={() =>
            setAlternativeSelected && setAlternativeSelected(index)
          }
        />
      ))}
    </Animated.View>
  );
}

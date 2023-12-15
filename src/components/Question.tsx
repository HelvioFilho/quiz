import { Dimensions, Text, View } from "react-native";
import { Option } from "./Option";

type QuestionProps = {
  title: string;
  alternatives: string[];
};

type QuestionComponentProps = {
  question: QuestionProps;
  alternativeSelected?: number | null;
  setAlternativeSelected?: (value: number) => void;
};

export function Question({
  question,
  alternativeSelected,
  setAlternativeSelected,
}: QuestionComponentProps) {
  const { width } = Dimensions.get("window");
  const MARGIN_HORIZONTAL = 24 * 2;
  return (
    <View
      className="bg-grey-700 rounded-xl p-5"
      style={{ width: width - MARGIN_HORIZONTAL }}
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
    </View>
  );
}

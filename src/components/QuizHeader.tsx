import { Text, View } from "react-native";
import { ProgressBar } from "./ProgressBar";

type QuizHeaderProps = {
  title: string;
  totalOfQuestions: number;
  currentQuestion: number;
};

export function QuizHeader({
  title,
  totalOfQuestions,
  currentQuestion,
}: QuizHeaderProps) {
  return (
    <View className="w-full mb-5">
      <Text className="font-bold text-base text-grey-100">{title}</Text>
      <View className="w-full flex-row justify-between items-center mb-2 mt-10">
        <Text className="text-grey-200">Questão {currentQuestion}</Text>
        <Text>
          {currentQuestion}/{totalOfQuestions}
        </Text>
      </View>
      <ProgressBar total={totalOfQuestions} current={currentQuestion} />
    </View>
  );
}

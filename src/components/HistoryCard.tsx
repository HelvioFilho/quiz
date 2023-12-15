import { Text, View } from "react-native";
import { LevelBars } from "./LevelBars";

import { HistoryProps } from "@/app/history";

type HistoryCardProps = {
  data: HistoryProps;
};

export function HistoryCard({ data }: HistoryCardProps) {
  return (
    <View className="w-full h-24 rounded-md bg-grey-700 p-4 flex-row justify-center items-center mb-3">
      <View>
        <Text className="font-regular text-base text-grey-100">
          {data.title}
        </Text>
        <Text className="font-regular text-xs text-grey-300">
          Você acertou {data.points} de {data.questions}
        </Text>
      </View>
      <LevelBars level={data.level} />
    </View>
  );
}

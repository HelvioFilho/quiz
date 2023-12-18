import { Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Button } from "@/components/Button";
import { Stars } from "@/components/Stars";

type FinishParams = {
  points: string;
  total: string;
};

export default function finish() {
  const { points, total } = useLocalSearchParams() as FinishParams;
  const navigation = useRouter();
  return (
    <View className="flex-1 justify-center bg-grey-800 p-8">
      <View className="items-center mb-20">
        <Stars />
        <Text className="font-bold text-2xl text-grey-100 mt-10">
          Parabéns!
        </Text>
        <Text className="font-regular text-base text-grey-100 mt-2">
          Você acertou {points} de {total} questões.
        </Text>
      </View>
      <Button title="Ir para o início" onPress={() => navigation.push("/")} />
    </View>
  );
}

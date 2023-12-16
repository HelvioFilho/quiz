import { useEffect, useState } from "react";
import { Alert, ScrollView, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { HouseLine } from "phosphor-react-native";
import Animated, {
  Layout,
  SlideInRight,
  SlideOutRight,
} from "react-native-reanimated";

import { Header } from "@/components/Header";
import { HistoryCard } from "@/components/HistoryCard";
import { Loading } from "@/components/Loading";

import { historyGetAll, historyRemove } from "@/storage/quizHistoryStorage";

export type HistoryProps = {
  id: string;
  title: string;
  points: number;
  questions: number;
  level: number;
};
export default function history() {
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState<HistoryProps[]>([]);

  const navigation = useRouter();

  async function fetchHistory() {
    const response = await historyGetAll();
    setHistory(response);
    setIsLoading(false);
  }

  async function remove(id: string) {
    await historyRemove(id);
    fetchHistory();
  }

  function handleRemove(id: string) {
    Alert.alert("Remover", "Deseja remover esse registro?", [
      {
        text: "Sim",
        onPress: () => remove(id),
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);
  }

  useEffect(() => {
    fetchHistory();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 bg-grey-800">
      <Header
        title="Histórico"
        subtitle={`Seu histórico de estudos${"\n"}realizados`}
        icon={HouseLine}
        onPress={() => navigation.back()}
      />
      <ScrollView
        contentContainerStyle={{ padding: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {history.map((item) => (
          <Animated.View
            key={item.id}
            entering={SlideInRight}
            exiting={SlideOutRight.delay(150)}
            layout={Layout.springify().duration(150)}
          >
            <TouchableOpacity onPress={() => handleRemove(item.id)}>
              <HistoryCard data={item} />
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
}

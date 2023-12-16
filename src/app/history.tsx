import { useEffect, useState, useRef } from "react";
import { Alert, Pressable, ScrollView, View } from "react-native";
import { useRouter } from "expo-router";
import { HouseLine, Trash } from "phosphor-react-native";
import Animated, {
  Layout,
  SlideInRight,
  SlideOutRight,
} from "react-native-reanimated";

import { Header } from "@/components/Header";
import { HistoryCard } from "@/components/HistoryCard";
import { Loading } from "@/components/Loading";

import { historyGetAll, historyRemove } from "@/storage/quizHistoryStorage";
import { Swipeable } from "react-native-gesture-handler";
import { COLORS } from "@/constants/colors";

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

  const swipeableRefs = useRef<Swipeable[]>([]);

  async function fetchHistory() {
    const response = await historyGetAll();
    setHistory(response);
    setIsLoading(false);
  }

  async function remove(id: string) {
    await historyRemove(id);
    fetchHistory();
  }

  function handleRemove(id: string, index: number) {
    swipeableRefs.current?.[index].close();

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
        contentContainerStyle={{ flexGrow: 1, padding: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {history.map((item, index) => (
          <Animated.View
            key={item.id}
            entering={SlideInRight}
            exiting={SlideOutRight.delay(150)}
            layout={Layout.springify().duration(150)}
          >
            <Swipeable
              ref={(ref) => {
                if (ref) {
                  swipeableRefs.current.push(ref);
                }
              }}
              overshootRight={false}
              rightThreshold={10}
              renderLeftActions={() => null}
              onSwipeableOpen={
                () =>
                  handleRemove(
                    item.id,
                    index
                  ) /* removes the item without pressing the button */
              }
              renderRightActions={() => (
                // <Pressable
                //   className="w-24 h-24 flex-row rounded-r-md items-center justify-center bg-danger"
                //   onPress={() => handleRemove(item.id, index)}
                // >
                //   <Trash size={32} color={COLORS.grey[100]} />
                // </Pressable>
                <View className="w-24 h-24 flex-row rounded-r-md items-center justify-center bg-danger">
                  <Trash size={32} color={COLORS.grey[100]} />
                </View>
              )}
            >
              <HistoryCard data={item} />
            </Swipeable>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
}

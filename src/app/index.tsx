import { Text, View } from "react-native";
import { Trophy } from "phosphor-react-native";
import { Header } from "@/components/Header";
import { useRouter } from "expo-router";
export default function Home() {
  const navigation = useRouter();

  return (
    //container
    <View>
      <Header
        icon={Trophy}
        title="Vamos estudar"
        subtitle="Treine seus conhecimentos!"
        onPress={() => navigation.push("/history")}
      />
    </View>
  );
}

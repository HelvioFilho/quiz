import { Text, TouchableOpacity, View } from "react-native";
import { IconProps } from "phosphor-react-native";
import { COLORS } from "@/constants/colors";

type HeaderProps = {
  title: string;
  subtitle: string;
  onPress: () => void;
  icon: React.FC<IconProps>;
};
export function Header({ title, subtitle, onPress, icon: Icon }: HeaderProps) {
  return (
    <View className="w-full bg-grey-600 flex-row items-center justify-between px-8 pt-14 pb-6">
      <View>
        <Text className="text-2xl font-bold text-grey-100">{title}</Text>
        <Text className="text-sm font-regular text-grey-100">{subtitle}</Text>
      </View>

      <TouchableOpacity
        className="w-11 h-11 rounded-md items-center justify-center bg-grey-800"
        activeOpacity={0.8}
        onPress={onPress}
      >
        <Icon size={28} color={COLORS.grey[100]} />
      </TouchableOpacity>
    </View>
  );
}

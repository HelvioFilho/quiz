import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { COLORS } from "@/constants/colors";

const TYPE_COLORS = {
  EASY: COLORS.brand.light,
  HARD: COLORS.danger,
  MEDIUM: COLORS.warning,
};

type LevelProps = TouchableOpacityProps & {
  title: string;
  isChecked?: boolean;
  type?: keyof typeof TYPE_COLORS;
};

export function Level({
  title,
  type = "EASY",
  isChecked = false,
  ...rest
}: LevelProps) {
  const COLOR = TYPE_COLORS[type];

  return (
    <TouchableOpacity {...rest}>
      <View
        className="w-20 h-9 rounded border items-center justify-center m-1.5"
        style={{
          borderColor: COLOR,
          backgroundColor: isChecked ? COLOR : "transparent",
        }}
      >
        <Text
          className="uppercase text-xs font-regular"
          style={{
            color: isChecked ? COLORS.grey[100] : COLOR,
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

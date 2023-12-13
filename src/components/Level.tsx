import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

const TYPE_COLORS = {
  EASY: "#00B37E",
  HARD: "#F75A68",
  MEDIUM: "#FBA94C",
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
            color: isChecked ? "#E1E1E6" : COLOR,
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

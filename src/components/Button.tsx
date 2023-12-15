import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type ButtonProps = TouchableOpacityProps & {
  title: string;
};

export function Button({ title, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      className="flex-1 min-h-[56px] max-h-14 rounded-md items-center justify-center bg-brand-mid mr-4"
      activeOpacity={0.8}
      {...rest}
    >
      <Text className="font-bold text-base text-white">{title}</Text>
    </TouchableOpacity>
  );
}

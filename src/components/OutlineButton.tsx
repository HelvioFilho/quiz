import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type OutlineButtonProps = TouchableOpacityProps & {
  title: string;
};

export function OutlineButton({ title, ...rest }: OutlineButtonProps) {
  return (
    <TouchableOpacity
      className="flex-1 min-h-[56px] max-h-14 rounded-md items-center justify-center bg-transparent border border-brand-mid mr-4"
      activeOpacity={0.8}
      {...rest}
    >
      <Text className="font-bold text-base text-brand-mid">{title}</Text>
    </TouchableOpacity>
  );
}

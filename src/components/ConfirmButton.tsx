import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Check } from "phosphor-react-native";

import { COLORS } from "@/constants/colors";

export function ConfirmButton({ ...rest }: TouchableOpacityProps) {
  return (
    <TouchableOpacity
      className="flex-1 min-h-[56px] max-h-14 rounded-md items-center justify-center bg-brand-mid flex-row overflow-hidden"
      activeOpacity={0.8}
      {...rest}
    >
      <Text className="font-bold text-base text-white mr-2">Confirmar</Text>
      <Check color={COLORS.white} weight="bold" size={24} />
    </TouchableOpacity>
  );
}

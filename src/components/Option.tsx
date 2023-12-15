import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

type OptionProps = TouchableOpacityProps & {
  title: string;
  checked: boolean;
};

export function Option({ title, checked, ...rest }: OptionProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={`
        w-full
        min-h-[76px]
        bg-grey-800
        rounded-md
        flex-row
        items-center
        justify-center
        p-4
        mb-3
        ${checked && "bg-brand-light border"}
      `}
      {...rest}
    >
      <Text className="flex-1 font-regular text-sm text-grey-100 mr-8">
        {title}
      </Text>
    </TouchableOpacity>
  );
}

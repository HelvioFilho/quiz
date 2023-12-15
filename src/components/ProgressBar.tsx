import { View } from "react-native";

type ProgressBarProps = {
  total: number;
  current: number;
};

export function ProgressBar({ total, current }: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100);
  return (
    <View className="h-2 w-full rounded-lg bg-grey-500">
      <View
        className="h-2 rounded-lg bg-brand-light"
        style={{ width: `${percentage}%` }}
      />
    </View>
  );
}

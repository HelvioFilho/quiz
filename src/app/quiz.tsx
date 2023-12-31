import { useEffect, useState } from "react";
import { Alert, BackHandler, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";

import { Loading } from "@/components/Loading";
import { Question } from "@/components/Question";
import { QuizHeader } from "@/components/QuizHeader";
import { ProgressBar } from "@/components/ProgressBar";
import { ConfirmButton } from "@/components/ConfirmButton";
import { OutlineButton } from "@/components/OutlineButton";
import { OverlayFeedback } from "@/components/OverlayFeedback";

import { QUIZ } from "@/data/quiz";
import { historyAdd } from "@/storage/quizHistoryStorage";
import { COLORS } from "@/constants/colors";

const correct = require("@/assets/correct.mp3");
const wrong = require("@/assets/wrong.mp3");

type QuizParams = {
  id: string;
};

type QuizProps = (typeof QUIZ)[0];

const CARD_INCLINATION = 10;
const CARD_SKIP_AREA = -200;

export default function quiz() {
  const [points, setPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quiz, setQuiz] = useState<QuizProps>({} as QuizProps);
  const [alternativeSelected, setAlternativeSelected] = useState<null | number>(
    null
  );
  const [statusReply, setStatusReply] = useState(0);

  const shake = useSharedValue(0);
  const scrollY = useSharedValue(0);
  const cardPosition = useSharedValue(0);

  const navigation = useRouter();

  const { id } = useLocalSearchParams() as QuizParams;

  const shakeStyleAnimated = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            shake.value,
            [0, 0.5, 1, 1.5, 2, 2.5, 3],
            [0, -15, 0, 15, 0, -15, 0]
          ),
        },
      ],
    };
  });

  async function playSound(isCorrect: boolean) {
    try {
      const file = isCorrect ? correct : wrong;
      const { sound } = await Audio.Sound.createAsync(file, {
        shouldPlay: true,
      });
      await sound.setPositionAsync(0);
      await sound.playAsync();
    } catch (error) {
      console.log("error");
    }
  }

  async function handleFinished() {
    await historyAdd({
      id: new Date().getTime().toString(),
      title: quiz.title,
      level: quiz.level,
      points,
      questions: quiz.questions.length,
    });
    navigation.push({
      pathname: "/finish",
      params: {
        points: String(points),
        total: String(quiz.questions.length),
      } as any,
    });
  }

  function handleNextQuestion() {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((prevState) => prevState + 1);
    } else {
      handleFinished();
    }
  }

  function handleSkipConfirm() {
    Alert.alert("Pular", "Deseja realmente pular a questão?", [
      { text: "Sim", onPress: () => handleNextQuestion() },
      { text: "Não", onPress: () => {} },
    ]);
  }

  async function handleConfirm() {
    if (alternativeSelected === null) {
      return handleSkipConfirm();
    }

    if (quiz.questions[currentQuestion].correct === alternativeSelected) {
      await playSound(true);
      setStatusReply(1);
      setPoints((prevState) => prevState + 1);
    } else {
      await playSound(false);
      setStatusReply(2);
      shakeAnimation();
    }

    setAlternativeSelected(null);
  }

  function handleStop() {
    Alert.alert("Parar", "Deseja parar agora?", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        style: "destructive",
        onPress: () => navigation.push("/"),
      },
    ]);

    return true;
  }

  async function shakeAnimation() {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    shake.value = withSequence(
      withTiming(3, { duration: 400, easing: Easing.bounce }),
      withTiming(0, undefined, (finished) => {
        "worklet";
        if (finished) {
          runOnJS(handleNextQuestion)();
        }
      })
    );
  }

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const fixedProgressBarStyles = useAnimatedStyle(() => {
    return {
      position: "absolute",
      paddingTop: 40,
      backgroundColor: COLORS.grey[500],
      width: "110%",
      left: "-5%",
      zIndex: 50,
      opacity: interpolate(scrollY.value, [85, 95], [0, 1], Extrapolate.CLAMP),
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [90, 100],
            [-40, 0],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  const onPan = Gesture.Pan()
    .activateAfterLongPress(200)
    .onUpdate((event) => {
      const moveToLeft = event.translationX < 0;
      if (moveToLeft) cardPosition.value = event.translationX;
    })
    .onEnd((event) => {
      if (event.translationX < CARD_SKIP_AREA) {
        runOnJS(handleSkipConfirm)();
      }
      cardPosition.value = withTiming(0);
    });

  const dragStyles = useAnimatedStyle(() => {
    const rotateZ = cardPosition.value / CARD_INCLINATION;
    return {
      transform: [
        { translateX: cardPosition.value },
        { rotateZ: `${rotateZ}deg` },
      ],
    };
  });

  useEffect(() => {
    const quizSelected = QUIZ.filter((item) => item.id === id)[0];
    setQuiz(quizSelected);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (points > 0) {
      handleNextQuestion();
    }
  }, [points]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleStop
    );

    return () => backHandler.remove();
  }, []);

  if (isLoading) {
    return <Loading size="large" />;
  }

  return (
    <View className="flex-1 bg-grey-800">
      <OverlayFeedback status={statusReply} />
      <Animated.View style={fixedProgressBarStyles}>
        <Text className="font-bold text-base text-grey-100 text-center mb-4">
          {quiz.title}
        </Text>
        <ProgressBar
          total={quiz.questions.length}
          current={currentQuestion + 1}
        />
      </Animated.View>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          paddingTop: 80,
          paddingBottom: 300,
          padding: 32,
        }}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <QuizHeader
          title={quiz.title}
          currentQuestion={currentQuestion + 1}
          totalOfQuestions={quiz.questions.length}
        />
        <GestureDetector gesture={onPan}>
          <Animated.View style={[shakeStyleAnimated, dragStyles]}>
            <Question
              key={quiz.questions[currentQuestion].title}
              onUnmount={() => setStatusReply(0)}
              question={quiz.questions[currentQuestion]}
              alternativeSelected={alternativeSelected}
              setAlternativeSelected={setAlternativeSelected}
            />
          </Animated.View>
        </GestureDetector>
        <View className="flex-row mt-6">
          <OutlineButton title="Parar" onPress={handleStop} />
          <ConfirmButton onPress={handleConfirm} />
        </View>
      </Animated.ScrollView>
    </View>
  );
}

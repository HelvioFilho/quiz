import { ConfirmButton } from "@/components/ConfirmButton";
import { Loading } from "@/components/Loading";
import { OutlineButton } from "@/components/OutlineButton";
import { Question } from "@/components/Question";
import { QuizHeader } from "@/components/QuizHeader";
import { QUIZ } from "@/data/quiz";
import { historyAdd } from "@/storage/quizHistoryStorage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";

type QuizParams = {
  id: string;
};

type QuizProps = (typeof QUIZ)[0];

export default function quiz() {
  const [points, setPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quiz, setQuiz] = useState<QuizProps>({} as QuizProps);
  const [alternativeSelected, setAlternativeSelected] = useState<null | number>(
    null
  );

  const navigation = useRouter();

  const { id } = useLocalSearchParams() as QuizParams;

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
      setPoints((prevState) => prevState + 1);
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

  useEffect(() => {
    const quizSelected = QUIZ.filter((item) => item.id === id)[0];
    setQuiz(quizSelected);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (quiz.questions) {
      handleNextQuestion();
    }
  }, [points]);

  if (isLoading) {
    return <Loading size="large" />;
  }

  return (
    <View className="flex-1 bg-grey-800">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          paddingTop: 80,
          paddingBottom: 300,
          padding: 32,
        }}
      >
        <QuizHeader
          title={quiz.title}
          currentQuestion={currentQuestion + 1}
          totalOfQuestions={quiz.questions.length}
        />
        <Question
          key={quiz.questions[currentQuestion].title}
          question={quiz.questions[currentQuestion]}
          alternativeSelected={alternativeSelected}
          setAlternativeSelected={setAlternativeSelected}
        />
        <View className="flex-row mt-6">
          <OutlineButton title="Parar" onPress={handleStop} />
          <ConfirmButton onPress={handleConfirm} />
        </View>
      </ScrollView>
    </View>
  );
}

import Quiz from "../models/Quiz.js";

export const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createQuiz = async (req, res) => {
  try {
    const { title, description, durationMinutes, questions } = req.body;
    const quiz = await Quiz.create({
      title,
      description,
      durationMinutes,
      questions,
      createdBy: req.user?.id
    });
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

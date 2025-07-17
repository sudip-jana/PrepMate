import { Question } from "../models/Question.js";
import { Session } from "../models/Session.js";

//desc: Add additional question to an existing session
export const addQuestionsToSession = async (req, res) => {
    try {
        const {sessionId, questions} = req.body;

        if(!sessionId || !questions || !Array.isArray(questions)) {
            return res.status(400).json({message: "Invalid input data"});
        }

        const session = await Session.findById(sessionId);

        if(!session) {
            return res.status(404).json({message: "Session not found"});
        }

        const createdQuestions = await Question.insertMany(
            questions.map((q) => ({
                session: sessionId,
                question: q.question,
                answer: q.answer,
            }))
        );

        // update session to include new question IDs
        session.questions.push(...createdQuestions.map((q) => q._id));
        await session.save();

        res.status(201).json(createdQuestions);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
};

//desc: Pin or unpin a question
export const togglePinQuestion = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if(!question) {
            return res
                .status(404)
                .json({success: false, message: "Question not found"});
        }
        question.isPinned = !question.isPinned;
        await question.save();

        return res 
            .status(200)
            .json({success: true, question});
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
}

export const updateQuestionNote = async (req, res) => {

    try{
        const {note} = req.body;
        const question = await Question.findById(req.params.id);

        if(!question) {
            return res
                .status(404)
                .json({success: false, message: "question not found"});
        }

        question.note = note || "";
        await question.save();

        res.status(200).json({success: true, question});
    }catch (error) {

    }
}

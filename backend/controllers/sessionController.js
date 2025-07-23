import {Session} from '../models/Session.js';
import {Question} from '../models/Question.js';
import apiResponse from '../utils/apiResponse.js';

// create a new session and linked questions
export const createSession = async (req, res) => {
    try {
        const {role, experience, topicsToFocus, description, questions} =
        req.body;
        const userId = req.user?.id; // Assuming you have a middleware

        const session = await Session.create({
            user: userId,
            role,
            experience,
            topicsToFocus,
            description,
        })

        const questionDocs = await Promise.all(
            questions.map(async (q) => {
                const question = await Question.create({
                    session: session._id,
                    question: q.question,
                    answer: q.answer,
                });
                return question._id;
            })
        )

        session.questions = questionDocs; // adding questions to the database
        await session.save();

        return res.status(201)
        .json(new apiResponse(true, "Session created", session));
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});
    }
}

// get all sessions for the logged-in user
export const getMySessions = async (req, res) => {
    try {
        // console.log("REQ.USER in /my-sessions:", req.user);
        const sessions = await Session.find({user: req.user?._id})
            .sort({ createdAt: -1})
            .populate("questions");
        if(!sessions){
            return res.status(404).json({message: "Session not found"});
        }
       return res.status(200).json(sessions);
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});
    }
}

// get a session by id with populated questions
export const getSessionById = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id)
        .populate({
            path: "questions",
            options: { sort: { isPinned:-1, createdAt: 1}}
        })
        .exec();

        if(!session) {
            return res
            .status(404)
            .json({success: false, message: "Session not found"});
        }

       return res.status(200).json({success: true, session});
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});
    }
}

export const deleteSession = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id);

        if(!session) {
            return res.status(404).json({message: "Session not found"});
        }
        
        // check if the logged-in user owns this session
        if(session.user.toString() !== req.user.id) {
            return res
                .status(401)
                .json({message: "Not authorized to delete this session"});
        }

        // First, delete all questions linked to this session
        await Question.deleteMany({session: session._id});

        await session.deleteOne();

        res.status(200).json({message: "Session deleted successfully"});

    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});
    }
}
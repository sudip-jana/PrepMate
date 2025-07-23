import { GoogleGenAI} from "@google/genai";
import { conceptExplainPrompt, questionAnswerPrompt } from "../utils/prompts.js";

var ai;
(async () => {
  const key = await (() => process.env.GEMINI_API_KEY)();
  ai = new GoogleGenAI({ apiKey: key });

})();

export const generateInterviewQuestions = async (req, res) => {
    try {
        const {role, experience, topicsToFocus, numberOfQuestion} =
        req.body;
        console.log(req.body);
        console.log(role, experience, topicsToFocus, numberOfQuestion)
        if(!role || !experience || !topicsToFocus || !numberOfQuestion) {
            console.log("hi");
            return res.status(400).json({message: "Missing required fields"});
        }
        
        // herer prompt will be returned that will be used
        const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestion);
        // return res.json({prompt});
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: prompt,
        });

        let rawText = response.text;

        // clean it: Remove ``` json and ``` from beginning and end
        const cleanedText = rawText
            .replace(/^```json\s*/, '') // remove starting ```json
            .replace(/```$/, '')        // remove ending ```
            .trim();   // remove extra spaces

        const data = JSON.parse(cleanedText);

        res.status(200).json(data);
    } catch (error) {
        res.status(500)
        .json({
            message: "Failed to generate questions",
            error: error.message,
        })
    }
};

// generates explains a interview-question

export const generateConceptExplanation = async (req, res) => {
    try{
        const {question} = req.body;

        if(!question){
            return res.status(400).json({message: "Missing required fields"});
        }

        const prompt = conceptExplainPrompt(question);

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        let rawText = response.text;

        const cleanedText = rawText
            .replace(/^```json\s*/, '') // remove starting ```json
            .replace(/```$/, '')        // remove ending ```
            .trim();   // remove extra spaces

            const data = JSON.parse(cleanedText);

            res.status(200).json(data);
    }catch (error) {
        res.status(500).json({
            message: "Failed to generate questions",
            error: error.message,
        })
    }
}
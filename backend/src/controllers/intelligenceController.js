import { generateWeeklyReport } from "../services/intelligence/weeklyReportService.js";
import { buildLearningCoach } from "../services/intelligence/learningCoachService.js";
import { buildLearningSnapshot } from "../services/analytics/learningSnapshotService.js";
import { askEduInsight } from "../services/intelligence/intelligenceService.js";

export const getWeeklyReport = async (
    req,
    res
) => {

    try {

        /*
         * Dummy payload
         * We'll replace this with
         * real analytics next.
         */

        const payload =
            await buildLearningSnapshot(
            req.user.id
        );

        const report =
            await generateWeeklyReport(
                payload
            );

        res.json(report);

    }

    catch(error){

        console.error(error);

        res.status(500).json({

            success:false,

            message:
            "Failed to generate report"

        });

    }

};

export const chatWithAI = async (req, res) => {

    try {

        const userId = req.user.id;

        const { question } = req.body;
        if (!question || !question.trim()) {
            return res.status(400).json({
                message: "Question is required."
            });
        }

        if (question.length > 500) {
            return res.status(400).json({
                message: "Question is too long."
            });
        }

        const snapshot = await buildLearningSnapshot(userId);

        const response = await askEduInsight(
            snapshot,
            question
        );

        res.json(response);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to generate AI response."
        });

    }

}
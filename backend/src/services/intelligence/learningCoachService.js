import { analyzePerformance } from "./performanceAnalyzer.js";
import { analyzeStudy } from "./studyAnalyzer.js";
import { analyzeConsistency } from "./consistencyAnalyzer.js";
import { generateRecommendation } from "./recommendationEngine.js";

export function buildLearningCoach(subjects){

    const performance = analyzePerformance(subjects);

    const study = analyzeStudy(subjects);

    const consistency = analyzeConsistency(subjects);

    const recommendation = generateRecommendation({

        performance,

        study,

        consistency,

    });

    return{

        strongestSubject:performance?.strongest,

        weakestSubject:performance?.weakest,

        mostStudied:study?.mostStudied,

        neglectedSubject:consistency,

        recommendation,

    };

    // return {

    // strongestSubject: {
    //     name: performance?.strongest?.name,
    //     score: Number(
    //         performance?.strongest?.average_score || 0
    //     ).toFixed(0),
    // },

    // weakestSubject: {
    //     name: performance?.weakest?.name,
    //     score: Number(
    //         performance?.weakest?.average_score || 0
    //     ).toFixed(0),
    // },

    // mostStudied: {
    //     name: study?.mostStudied?.name,
    //     hours: study?.mostStudied?.studyHours,
    // },

    // neglectedSubject: {
    //     name: consistency?.name,
    //     days:
    //         consistency?.daysWithoutStudy,
    // },

    // recommendation,
//};

}
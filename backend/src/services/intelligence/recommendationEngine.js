export function generateRecommendation({

    performance,

    study,

    consistency,

}){

    if(!performance){

        return{

            title:"Welcome!",

            message:"Create your first subject to begin learning.",

            priority:"low"

        };

    }

    if(

        Number(performance.weakest.average_score)<70

        &&

        Number(study.leastStudied.total_minutes)<180

    ){

        return{

            title:"Needs Attention",

            message:`${performance.weakest.name} has a low quiz average and very little study time. Prioritize this subject.`,

            priority:"high"

        };

    }

    if(

        consistency

        &&

        consistency.daysWithoutStudy>7

    ){

        return{

            title:"Revision Reminder",

            message:`You haven't studied ${consistency.name} for ${consistency.daysWithoutStudy} days.`,

            priority:"medium"

        };

    }

    return{

        title:"Great Progress",

        message:"You're maintaining a healthy learning pace. Keep it up!",

        priority:"low"

    };

}
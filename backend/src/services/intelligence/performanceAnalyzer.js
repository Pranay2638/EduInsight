export function analyzePerformance(subjects) {

    if (!subjects.length) {

        return null;

    }

    const sorted = [...subjects].sort(

        (a,b)=>

        Number(b.average_score)

        -

        Number(a.average_score)

    );

    return {

        strongest: sorted[0],

        weakest: sorted[sorted.length-1]

    };

}
export function analyzeStudy(subjects){

    const sorted = [...subjects].sort(

        (a,b)=>

        Number(b.total_minutes)

        -

        Number(a.total_minutes)

    );

    return{

        mostStudied:sorted[0],

        leastStudied:sorted[sorted.length-1]

    };

}
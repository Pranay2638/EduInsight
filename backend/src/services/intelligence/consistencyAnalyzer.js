export function analyzeConsistency(subjects){

    const today = new Date();

    let neglected = null;

    let maxGap = -1;

    subjects.forEach(subject=>{

        if(!subject.last_studied){

            return;

        }

        const gap = Math.floor(

            (today - new Date(subject.last_studied))

            /

            (1000*60*60*24)

        );

        if(gap>maxGap){

            maxGap = gap;

            neglected = {

                ...subject,

                daysWithoutStudy:gap

            };

        }

    });

    return neglected;

}
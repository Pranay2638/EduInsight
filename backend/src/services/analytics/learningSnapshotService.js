import pool from "../../config/DB.js";

export async function buildLearningSnapshot(userId) {

    /*
     * STEP 1
     * Subject level analytics
     */

    const subjectsResult =
        await pool.query(

`
SELECT

    s.id,

    s.name,

    COALESCE(
        SUM(ss.duration),
        0
    ) / 60.0
    AS study_hours,

    COALESCE(
        AVG(
            (
                q.score::decimal /
                q.total_marks
            ) * 100
        ),
        0
    )
    AS average_score,

    COUNT(DISTINCT q.id)
    AS quiz_count

FROM subjects s

LEFT JOIN study_sessions ss
ON s.id = ss.subjects_id

LEFT JOIN quizzes q
ON s.id = q.subjects_id

WHERE s.user_id = $1

GROUP BY s.id

ORDER BY s.name
`,
[userId]

);

    /*
     * STEP 2
     * Weekly totals
     */

    const weeklyResult =
        await pool.query(

`
SELECT

COALESCE(
SUM(duration),
0
) / 60.0

AS current_hours

FROM study_sessions ss

JOIN subjects s
ON ss.subjects_id = s.id

WHERE s.user_id = $1

AND session_date >=
CURRENT_DATE - INTERVAL '7 days'
`,
[userId]

);

    return {

        student: {

            id:userId,

        },

        subjects: subjectsResult.rows.map(subject => ({

            id: subject.id,

            name: subject.name,

            studyHours: Number(subject.study_hours),

            averageScore: Number(subject.average_score),

            quizCount: Number(subject.quiz_count),

        })),

        weeklyTotals:{

            currentHours:Number(

                weeklyResult
                .rows[0]
                .current_hours

            ),

            previousHours:0

        }

    };

}
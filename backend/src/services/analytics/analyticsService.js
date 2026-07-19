import pool from "../../config/DB.js";

export async function getLearningData(userId) {
  const result = await pool.query(
    `
    SELECT
        s.id,
        s.name,

        COALESCE(SUM(ss.duration),0) AS total_minutes,

        COALESCE(
            AVG(
                (q.score::decimal/q.total_marks)*100
            ),
            0
        ) AS average_score,

        MAX(ss.session_date) AS last_studied

    FROM subjects s

    LEFT JOIN study_sessions ss
    ON s.id = ss.subjects_id

    LEFT JOIN quizzes q
    ON s.id = q.subjects_id

    WHERE s.user_id = $1

    GROUP BY s.id,s.name
    `,
    [userId]
  );

  return result.rows;
}
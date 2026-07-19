import pool from "../config/DB.js";
import { calculateLongestStreak } from "../utils/calculateLongestStreak.js";

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    /* ============================================================
       1. USER INFORMATION
    ============================================================ */

    const userResult = await pool.query(
      `
      SELECT
        id,
        name,
        email,
        provider,
        created_at
      FROM users
      WHERE id = $1
      `,
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const user = userResult.rows[0];

    /* ============================================================
       2. SUBJECT COUNT
    ============================================================ */

    const subjectResult = await pool.query(
      `
      SELECT COUNT(*) AS total_subjects
      FROM subjects
      WHERE user_id = $1
      `,
      [userId]
    );

    const subjects = Number(subjectResult.rows[0].total_subjects);

    /* ============================================================
       3. STUDY STATS
    ============================================================ */

    const studyResult = await pool.query(
      `
      SELECT
          COUNT(*) AS total_sessions,
          COALESCE(SUM(ss.duration),0) AS total_hours
      FROM study_sessions ss
      JOIN subjects s
      ON ss.subjects_id = s.id
      WHERE s.user_id = $1
      `,
      [userId]
    );

    const studySessions = Number(
      studyResult.rows[0].total_sessions
    );

    const studyHours = Number(
      studyResult.rows[0].total_hours
    );

    /* ============================================================
       4. QUIZ COUNT
    ============================================================ */

    const quizResult = await pool.query(
      `
      SELECT
          COUNT(*) AS total_quizzes
      FROM quizzes q
      JOIN subjects s
      ON q.subjects_id = s.id
      WHERE s.user_id = $1
      `,
      [userId]
    );

    const quizzes = Number(
      quizResult.rows[0].total_quizzes
    );

    /* ============================================================
       5. STUDY DATES
    ============================================================ */

    const streakResult = await pool.query(
      `
      SELECT
          session_date
      FROM study_sessions ss
      JOIN subjects s
      ON ss.subjects_id = s.id
      WHERE s.user_id = $1
      ORDER BY session_date
      `,
      [userId]
    );

    const longestStreak = calculateLongestStreak(
      streakResult.rows.map((row) => row.session_date)
    );

    /* ============================================================
       6. LEARNING POINTS
    ============================================================ */

    const learningPoints =
      studySessions * 10 +
      quizzes * 25 +
      longestStreak * 20;

    /* ============================================================
       7. RESPONSE
    ============================================================ */

    return res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        provider: user.provider,
        created_at: user.created_at,
      },

      lifetimeStats: {
        subjects,
        studyHours,
        studySessions,
        quizzes,
        longestStreak,
        learningPoints,
      },

      achievements: [],
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch profile",
    });
  }
};
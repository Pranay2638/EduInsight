import pool from "../config/DB.js";
import { getLearningData } from "../services/analytics/analyticsService.js";
import { buildLearningCoach } from "../services/intelligence/learningCoachService.js";
export const getOverviewAnalytics = async (
  req,
  res
) => {
  try {

    const userId = req.user.id;

    // Total Study Hours
    const studyHoursResult = await pool.query(
      `
      SELECT
      COALESCE(SUM(ss.duration),0) AS total_minutes
      FROM study_sessions ss
      JOIN subjects s
      ON ss.subjects_id = s.id
      WHERE s.user_id = $1
      `,
      [userId]
    );

    // Subjects Count
    const subjectsResult = await pool.query(
      `
      SELECT COUNT(*) AS total_subjects
      FROM subjects
      WHERE user_id = $1
      `,
      [userId]
    );

    // Total Quizzes
    const quizzesResult = await pool.query(
      `
      SELECT COUNT(*) AS total_quizzes
      FROM quizzes q
      JOIN subjects s
      ON q.subjects_id = s.id
      WHERE s.user_id = $1
      `,
      [userId]
    );

    // Average Percentage
    const averageResult = await pool.query(
      `
      SELECT
      AVG(
      (score::decimal / total_marks) * 100
      ) AS average_percentage
      FROM quizzes q
      JOIN subjects s
      ON q.subjects_id = s.id
      WHERE s.user_id = $1
      `,
      [userId]
    );

    res.json({
      success: true,
      data: {
        totalStudyHours:
          (
            Number(
              studyHoursResult.rows[0]
                .total_minutes
            ) / 60
          ).toFixed(2),

        subjectsCount:
          Number(
            subjectsResult.rows[0]
              .total_subjects
          ),

        totalQuizzes:
          Number(
            quizzesResult.rows[0]
              .total_quizzes
          ),

        averageQuizPercentage:
          Number(
            averageResult.rows[0]
              .average_percentage || 0
          ).toFixed(2),
      },
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch analytics",
    });
  }
};

export const getSubjectAnalysis = async (
  req,
  res
) => {
  try {

    const userId = req.user.id;

    const result = await pool.query(
      `
      SELECT
        s.id,
        s.name,

        COALESCE(
          SUM(ss.duration),
          0
        ) AS total_minutes,

        COUNT(
          DISTINCT q.id
        ) AS total_quizzes,

        COALESCE(
          AVG(
            (q.score::decimal /
            q.total_marks) * 100
          ),
          0
        ) AS average_percentage

      FROM subjects s

      LEFT JOIN study_sessions ss
      ON s.id = ss.subjects_id

      LEFT JOIN quizzes q
      ON s.id = q.subjects_id

      WHERE s.user_id = $1

      GROUP BY s.id, s.name

      ORDER BY s.name
      `,
      [userId]
    );

    const formattedData =
      result.rows.map((subject) => ({
        id: subject.id,

        name: subject.name,

        studyHours:
          (
            Number(
              subject.total_minutes
            ) / 60
          ).toFixed(2),

        totalQuizzes:
          Number(
            subject.total_quizzes
          ),

        averageScore:
          Number(
            subject.average_percentage
          ).toFixed(2),
      }));

    res.json({
      success: true,
      data: formattedData,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch subject analysis",
    });
  }
};

export const getStudyTrend = async (
  req,
  res
) => {
  try {

    const userId = req.user.id;

    const result = await pool.query(
      `
      SELECT
        ss.session_date,

        SUM(ss.duration)
        AS total_minutes

      FROM study_sessions ss

      JOIN subjects s
      ON ss.subjects_id = s.id

      WHERE s.user_id = $1

      GROUP BY ss.session_date

      ORDER BY ss.session_date
      `,
      [userId]
    );

    const formattedData =
      result.rows.map((row) => ({
        date: row.session_date,

        hours: Number(
          (
            row.total_minutes / 60
          ).toFixed(2)
        ),
      }));

    res.json({
      success: true,
      data: formattedData,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch study trend",
    });
  }
};

export const getLearningCoach = async(req,res)=>{

    try{

        const subjects = await getLearningData(req.user.id);

        const insights = buildLearningCoach(subjects);

        res.json({

            success:true,

            data:insights,

        });

    }

    catch(error){

        console.error(error);

        res.status(500).json({

            success:false,

            message:"Failed to generate AI insights"

        });

    }

};

export const getProductivityAnalytics = async (
  req,
  res
) => {
  try {

    const userId = req.user.id;

    // Average session duration
    const averageResult = await pool.query(
      `
      SELECT
        COALESCE(
          AVG(ss.duration),
          0
        ) AS average_duration
      FROM study_sessions ss
      JOIN subjects s
      ON ss.subjects_id = s.id
      WHERE s.user_id = $1
      `,
      [userId]
    );

    // Longest session
    const longestResult = await pool.query(
      `
      SELECT
        COALESCE(
          MAX(ss.duration),
          0
        ) AS longest_session
      FROM study_sessions ss
      JOIN subjects s
      ON ss.subjects_id = s.id
      WHERE s.user_id = $1
      `,
      [userId]
    );

    // Total sessions
    const totalResult = await pool.query(
      `
      SELECT
        COUNT(*) AS total_sessions
      FROM study_sessions ss
      JOIN subjects s
      ON ss.subjects_id = s.id
      WHERE s.user_id = $1
      `,
      [userId]
    );

    // Most productive day
    const dayResult = await pool.query(
      `
      SELECT

        TO_CHAR(
          ss.session_date,
          'Day'
        ) AS day_name,

        SUM(ss.duration) AS total_minutes

      FROM study_sessions ss

      JOIN subjects s
      ON ss.subjects_id = s.id

      WHERE s.user_id = $1

      GROUP BY day_name

      ORDER BY total_minutes DESC

      LIMIT 1
      `,
      [userId]
    );

    const streakResult = await pool.query(
      `
      SELECT DISTINCT
      ss.session_date

      FROM study_sessions ss

      JOIN subjects s
      ON ss.subjects_id = s.id

      WHERE s.user_id = $1

      ORDER BY ss.session_date DESC
      `,
      [userId]
    );

    // Calculate study streak
    let streak = 0;

    const dates = streakResult.rows.map((row) => {
  const date = new Date(row.session_date);
  date.setHours(0, 0, 0, 0);
  return date;
});

const today = new Date();
today.setHours(0, 0, 0, 0);

const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

  if (dates.length === 0) {
    streak = 0;
  } else {
    let currentDate;

    if (dates[0].getTime() === today.getTime()) {
      currentDate = new Date(today);
    } else if (dates[0].getTime() === yesterday.getTime()) {
      currentDate = new Date(yesterday);
    } else {
      currentDate = null;
    }

    if (currentDate) {
      streak = 0;

      for (const date of dates) {
        if (date.getTime() === currentDate.getTime()) {
          streak++;

          currentDate.setDate(
            currentDate.getDate() - 1
          );
        } else {
          break;
        }
      }
    }
  }

    res.json({

      success:true,

      data:{

        studyStreak: streak,

        averageSessionDuration:
          Math.round(
            Number(
              averageResult.rows[0]
              .average_duration
            )
          ),

        longestSession:
          Number(
            longestResult.rows[0]
            .longest_session
          ),

        totalSessions:
          Number(
            totalResult.rows[0]
            .total_sessions
          ),

        mostProductiveDay:
          dayResult.rows.length
          ? dayResult.rows[0]
              .day_name
              .trim()
          : "-",

      }

    });

  } catch(error){

    console.error(error);

    res.status(500).json({

      success:false,

      message:"Failed to fetch productivity analytics"

    });

  }
};
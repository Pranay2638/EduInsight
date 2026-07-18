import pool from "../config/db.js";

export const createQuiz = async (req, res) => {
  try {
    const {
      subjectId,
      quizName,
      score,
      totalMarks,
      quizDate,
    } = req.body;

    if (
      !subjectId ||
      !quizName ||
      score === undefined ||
      !totalMarks ||
      !quizDate
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    const subjectCheck = await pool.query(
      `
      SELECT *
      FROM subjects
      WHERE id = $1
      AND user_id = $2
      `,
      [subjectId, req.user.id]
    );

    if (subjectCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    const result = await pool.query(
      `
      INSERT INTO quizzes
      (subjects_id, quize_name, score, total_marks, quize_date)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [
        subjectId,
        quizName,
        score,
        totalMarks,
        quizDate,
      ]
    );

    res.status(201).json({
      success: true,
      data: result.rows[0],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create quiz",
    });
  }
};

export const getQuizzes = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT
        q.*,
        s.name AS subject_name
      FROM quizzes q
      JOIN subjects s
      ON q.subjects_id = s.id
      WHERE s.user_id = $1
      ORDER BY q.quize_date DESC
      `,
      [req.user.id]
    );

    res.json({
      success: true,
      data: result.rows,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch quizzes",
    });
  }
};

export const updateQuiz = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      subjectId,
      quizName,
      score,
      totalMarks,
      quizDate,
    } = req.body;

    const result = await pool.query(
      `
      UPDATE quizzes
      SET
        subjects_id = $1,
        quize_name = $2,
        score = $3,
        total_marks = $4,
        quize_date = $5
      WHERE id = $6
      AND subjects_id IN (
        SELECT id
        FROM subjects
        WHERE user_id = $7
      )
      RETURNING *;
      `,
      [
        subjectId,
        quizName,
        score,
        totalMarks,
        quizDate,
        id,
        req.user.id,
      ]
    );

    if (!result.rows.length) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update quiz",
    });

  }
};

export const deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      DELETE FROM quizzes
      WHERE id = $1
      AND subjects_id IN (
        SELECT id
        FROM subjects
        WHERE user_id = $2
      )
      RETURNING *;
      `,
      [id,req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    res.json({
      success: true,
      message: "Quiz deleted",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete quiz",
    });
  }
};
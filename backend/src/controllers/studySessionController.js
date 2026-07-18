import pool from "../config/db.js";

export const createStudySession = async(req,res) => {
  try {
    const {
      subjectId,
      duration,
      notes,
      sessionDate,
    } = req.body;
    if (!subjectId || !duration || !sessionDate) {
      return res.status(400).json({
       success: false,
       message: "Required fields missing"
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
        message: "Subject not found"
      });
    }
    const result = await pool.query(
      `
      INSERT INTO study_sessions
      (subjects_id, duration, notes, session_date)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [
        subjectId,
        duration,
        notes,
        sessionDate,
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
      message: "Failed to create study session",
    });
  }
};

export const getStudySessions = async (
  req,
  res
) => {
  try {
    const result = await pool.query(
      `
      SELECT
        ss.*,
        s.name AS subject_name
      FROM study_sessions ss
      JOIN subjects s
      ON ss.subjects_id = s.id
      WHERE s.user_id = $1
      ORDER BY ss.session_date DESC
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
      message: "Failed to fetch sessions",
    });
  }
};

export const updateStudySession = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const {
      subjectId,
      duration,
      notes,
      sessionDate,
    } = req.body;

    const result = await pool.query(
      `
      UPDATE study_sessions
      SET
        subjects_id = $1,
        duration = $2,
        notes = $3,
        session_date = $4
      WHERE id = $5
      AND subjects_id IN (
        SELECT id
        FROM subjects
        WHERE user_id = $6
      )
      RETURNING *;
      `,
      [
        subjectId,
        duration,
        notes,
        sessionDate,
        id,
        req.user.id,
      ]
    );

    if (!result.rows.length) {
      return res.status(404).json({
        success: false,
        message: "Study session not found",
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
      message: "Failed to update study session",
    });

  }
};

export const deleteStudySession = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      DELETE FROM study_sessions ss
      USING subjects s
      WHERE
        ss.subjects_id = s.id
        AND ss.id = $1
        AND s.user_id = $2
        RETURNING ss.*;
      `,
      [id,req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    res.json({
      success: true,
      message: "Session deleted",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete session",
    });
  }
};
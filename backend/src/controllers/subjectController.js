import pool from "../config/db.js";

export const createSubject = async (req, res) => {
  try {
    const { name } = req.body;

    const result = await pool.query(
      `INSERT INTO subjects (name, user_id)
       VALUES ($1, $2)
       RETURNING *`,
      [name, req.user.id]
    );

    res.status(201).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create subject",
    });
  }
};

export const getSubjects = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT *
       FROM subjects
       WHERE user_id = $1
       ORDER BY id DESC`,
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
      message: "Failed to fetch subjects",
    });
  }
};

export const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM subjects
       WHERE id = $1
       AND user_id = $2
       RETURNING *`,
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    res.json({
      success: true,
      message: "Subject deleted",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete subject",
    });
  }
};

export const updateSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const result = await pool.query(
      `
      UPDATE subjects
      SET name = $1
      WHERE id = $2
      AND user_id = $3
      RETURNING *;
      `,
      [
        name,
        id,
        req.user.id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
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
      message: "Failed to update subject",
    });
  }
};
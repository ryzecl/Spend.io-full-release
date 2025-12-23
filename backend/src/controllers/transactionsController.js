import { sql } from "../config/db.js";

export async function getTransactionsByUserId(req, res) {
  try {
    const { userId } = req.params;

    const transactions = await sql`
        SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC;
        `;

    console.log(transactions);
    return res.status(200).json(transactions);
  } catch (error) {
    console.log("Error getting the transactions", error);
    res.status(500).json({ message: "Failed to get transactions" });
  }
}

export async function createTransaction(req, res) {
  // title,amount, category, user_id
  try {
    const { title, amount, category, user_id } = req.body;

    if (!title || amount === undefined || !category || !user_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const transaction = await sql`
      INSERT INTO transactions (user_id, title, amount, category)
      VALUES (${user_id}, ${title}, ${amount}, ${category})
      RETURNING *;
      `;

    console.log(transaction);
    return res.status(201).json(transaction[0]);
  } catch (error) {
    console.log("Error creating transaction", error);
    return res.status(500).json({ message: "Failed to create transaction" });
  }
}

export async function deleteTransaction(req, res) {
  try {
    const { id } = req.params;

    if (isNaN(parseInt(id))) {
      return res.status(400).json({ message: "Invalid transaction id" });
    }

    const result = await sql`
        DELETE FROM transactions WHERE id = ${id} RETURNING *;
        `;

    if (result.length === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    console.log(result);
    return res
      .status(200)
      .json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.log("Error deleting transaction", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getSummaryByUserId(req, res) {
  try {
    const { userId } = req.params;

    const balanceResult = await sql`
    SELECT COALESCE(SUM(amount), 0) AS balance FROM transactions WHERE user_id = ${userId};`;

    // income + expenses
    const incomeResult = await sql`
    SELECT COALESCE(SUM(amount), 0) AS income FROM transactions WHERE user_id = ${userId} AND amount > 0;`;

    const expensesResult = await sql`
    SELECT COALESCE(SUM(amount), 0) AS expenses FROM transactions WHERE user_id = ${userId} AND amount < 0;`;

    return res.status(200).json({
      balance: balanceResult[0].balance,
      income: incomeResult[0].income,
      expense: expensesResult[0].expenses,
    });
  } catch (error) {
    console.log("Error getting the summary", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

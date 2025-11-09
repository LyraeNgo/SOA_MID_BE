import {
  getTransactionsByStudentId,
  getPendingTransactionById,
  updateStatusById,
} from "./transaction.service.js";

export const getTransactionsByStudentIdController = async (req, res) => {
  try {
    const result = await getTransactionsByStudentId(req.params.studentId);
    return res.json(result);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const getPendingTransactionByIdController = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const result = await getPendingTransactionById(transactionId);
    return res.json(result);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};


export const updateStatusByIdController = async (req, res) => {
  try {
    const { status } = req.body;
    const result = await updateStatusById(req.params.transactionId, status);
    return res.json(result);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

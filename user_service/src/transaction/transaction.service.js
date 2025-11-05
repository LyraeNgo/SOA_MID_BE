import Transaction from "./transaction.model.js";

export const getTransByID = async (studentId) => {
  try {
    console.log("Searching studentId:", studentId);
    const result = await Transaction.find({ studentId: studentId.trim() });
    console.log("Found:", result);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("fail to fecth data ");
  }
};

export const getPendingId = async (studentId) => {
  try {
    const result = await Transaction.find({
      studentId: studentId.trim(),
      status: "pending",
    });
    console.log("Found:", result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

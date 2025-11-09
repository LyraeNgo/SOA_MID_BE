import { getTransByID, getPendingId } from "./transaction.service.js";

export const getTransactionsByStudentId = async (req, res) => {
  const { studentID } = req.params;

  const result = await getTransByID(studentID);
  if (result.length > 0) {
    return res.status(200).json(result);
  } else {
    return res.status(404).json({ msg: "student not found " });
  }
  
};

export const getPendingTransactionById = async (req, res) => {
  const { studentID } = req.params;
  const result = await getPendingId(studentID);
  if(result.length>0){
	return res.status(200).json(result)
  }else{
	return res.status(404).json({"msg":"not found any pending"})
  }
};

import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";

/**
 * Xử lý giao dịch đóng học phí.
 * Mức độ: theo đúng yêu cầu mô phỏng trong đề bài iBanking.
 */
export const processTuitionPayment = async (userId, studentId, amount) => {
    // Kiểm tra thông tin đầu vào
    if (!userId || !studentId || !amount) {
        throw new Error("Thiếu thông tin cần thiết để thực hiện giao dịch.");
    }

    // Tìm người nộp tiền (user)
    const user = await User.findById(userId);
    if (!user) {
        throw new Error("Không tìm thấy người dùng.");
    }

    // Kiểm tra số dư khả dụng
    if (user.balance < amount) {
        throw new Error("Số dư khả dụng không đủ để thanh toán học phí.");
    }

    //  Cập nhật số dư
    const balanceBefore = user.balance;
    const balanceAfter = balanceBefore - amount;
    user.balance = balanceAfter;
    await user.save();

    //  Tạo bản ghi giao dịch thành công
    const transaction = await Transaction.create({
        username: user.username,
        studentId,
        amount,
        balanceBefore,
        balanceAfter,
        description: `Đóng học phí cho MSSV ${studentId}`,
        status: "completed",
    });

    //  Trả kết quả về controller
    return transaction;
};

import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js"; // giả sử user có balance

/**
 * Lấy tất cả giao dịch, sắp xếp theo createdAt giảm dần
 */
export const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ createdAt: -1 });
        res.status(200).json(transactions);
    } catch (err) {
        console.error("Lỗi khi gọi getAllTransactions:", err);
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
};

/**
 * Tạo giao dịch mới (đóng học phí)
 */
export const createTransaction = async (req, res) => {
    try {
        const { studentId, amount, description } = req.body;

        // req.user được set bởi middleware auth
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "Không tìm thấy người nộp tiền." });
        }

        if (user.balance < amount) {
            return res.status(400).json({ message: "Số dư không đủ để thanh toán." });
        }

        const balanceBefore = user.balance;
        user.balance -= amount;
        await user.save();

        const newTransaction = new Transaction({
            username: user.username,
            studentId,
            amount,
            balanceBefore,
            balanceAfter: user.balance,
            description: description || `Đóng học phí cho MSSV ${studentId}`,
            status: "completed",
            createdAt: new Date(),
        });

        await newTransaction.save();

        res.status(201).json({
            message: "Thanh toán học phí thành công.",
            transaction: newTransaction,
        });
    } catch (err) {
        console.error("Lỗi khi tạo giao dịch:", err);
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
};

/**
 * Hủy hoặc cập nhật trạng thái giao dịch
 */
export const updateTransactionStatus = async (req, res) => {
    try {
        const { txnId } = req.params; // dùng _id của Transaction
        const { status } = req.body;

        if (!["completed", "failed"].includes(status)) {
            return res.status(400).json({ message: "Trạng thái không hợp lệ" });
        }

        const transaction = await Transaction.findByIdAndUpdate(
            txnId,
            { status },
            { new: true }
        );

        if (!transaction) {
            return res.status(404).json({ message: "Không tìm thấy giao dịch" });
        }

        res.status(200).json({
            message: "Cập nhật trạng thái thành công",
            transaction,
        });
    } catch (err) {
        console.error("Lỗi khi updateTransactionStatus:", err);
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
};


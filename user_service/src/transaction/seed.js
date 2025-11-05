import mongoose from "mongoose";
import Transaction from "./transaction.model.js";
import { sampleTransactions } from "./sampleTransactions.js";

const MONGO_URI = "mongodb://127.0.0.1:27017/transactions_service";

const seedTransactions = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Kết nối MongoDB thành công!");

    // Xóa dữ liệu cũ (nếu muốn reset)
    await Transaction.deleteMany({});
    console.log("🗑️ Đã xóa toàn bộ giao dịch cũ");

    // Thêm dữ liệu mới
    await Transaction.insertMany(sampleTransactions);
    console.log("✅ Đã thêm dữ liệu mẫu thành công!");

    process.exit();
  } catch (err) {
    console.error("❌ Lỗi khi seed dữ liệu:", err);
    process.exit(1);
  }
};

seedTransactions();

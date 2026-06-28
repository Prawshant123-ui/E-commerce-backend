const express = require("express");

const router = express.Router();

const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

const {
  createCategoryValidator,
  updateCategoryValidator,
} = require("../validators/categoryValidator");

const validateRequest = require("../validators/validateRequest");

router.post(
  "/",
  protect,
  adminOnly,
  createCategoryValidator,
  validateRequest,
  createCategory,
);

router.get("/", getAllCategories);

router.get("/:id", getCategoryById);

router.patch(
  "/:id",
  protect,
  adminOnly,
  updateCategoryValidator,
  validateRequest,
  updateCategory,
);

router.delete("/:id", protect, adminOnly, deleteCategory);

module.exports = router;

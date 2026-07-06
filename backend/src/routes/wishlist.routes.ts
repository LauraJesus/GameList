import { Router } from "express";
import { WishlistController } from "../controllers/wishlist.controller";
import { authMiddleware } from "../middlewares/auth.middlewares";

const router = Router();
const wishlistController = new WishlistController();

router.post("/", authMiddleware, wishlistController.adicionar);
router.get("/", authMiddleware, wishlistController.listar);
router.delete("/:id", authMiddleware, wishlistController.remover);

export { router as wishlistRoutes };
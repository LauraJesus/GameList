import { Router } from "express";
import { ReviewController } from "../controllers/review.controller";
import { authMiddleware } from "../middlewares/auth.middlewares";

const router = Router();
const reviewController = new ReviewController();

router.post("/", authMiddleware, reviewController.criar);
router.get("/", authMiddleware, reviewController.listar);


router.get("/jogo/:jogoId", reviewController.listarPorJogo);

router.put("/:id", authMiddleware, reviewController.atualizar);
router.delete("/:id", authMiddleware, reviewController.deletar);

export { router as reviewRoutes };

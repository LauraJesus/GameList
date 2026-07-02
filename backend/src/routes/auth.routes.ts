import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";


const authController = new AuthController();

const router = Router();

router.post("/register", authController.create); // Rota para registrar um novo usuário
router.post("/login", authController.login); // Rota para fazer login
router.post("/logout", authController.logout); // Rota para fazer logout

export {router as authRoutes}; // Exporta o router para ser usado em outros arquivos
import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";


const authService = new AuthService();

export class AuthController {

    async create(req: Request, res: Response){

        try{
            const { nome, email, senha } = req.body;// Recebe os dados do usuário
            
            const usuario = await authService.create(nome, email, senha); // Chama o serviço de criação de usuário

            res.json(usuario); // Retorna o usuário criado
        }catch(error){
            res.status(400).json({
                success: false,
                message:
                error instanceof Error 
                ? error.message 
                : "Erro ao criar usuário", // Retorna o erro caso ocorra algum problema
            });
        }
    }

    async login(req: Request, res: Response){ // Recebe os dados do usuário
        try{
            const { email, senha } = req.body;

            const resposta = await authService.login(email, senha);

            res.cookie("token", resposta.token,{ 
                httpOnly: true,
                secure: false,
                sameSite: 'lax'
            });

            res.json({
                success: true,
            });
        }catch(error){
            res.status(400).json({
                success: false,
                message:
                error instanceof Error 
                ? error.message 
                : "Erro ao criar usuário", // Retorna o erro caso ocorra algum problema
            });
        }
    }

    async logout(req: Request, res: Response){ // Recebe os dados do usuário
        res.clearCookie("token");
        res.json({
            success: true,
        });
    
    }

}
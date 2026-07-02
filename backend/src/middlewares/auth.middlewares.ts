import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthPayload } from "../tipos/auth.payload";

export function authMiddleware(req :Request, res: Response, next: NextFunction) {
    const token = req.cookies.token; // Obtém o token do cookie
    if(!token){
        res.status(400).json({
            message: "Token não encontrado."
        });
        return; // Encerra a execução do middleware se o token não for encontrado
    }

    try{ // Verifica se o token é válido
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as 
        AuthPayload // Verifica se o token é válido e decodifica o payload

        res.locals.token = payload; // Armazena o payload do token no objeto res.locals para ser usado em outros middlewares ou rotas
        //id do usuário, email e username do usuário logado
        next(); //segue a requisição para o próximo middleware ou rota
    
    }catch(error){
        res.status(401).json({
            message: "Token inválido."
        });
    }
}
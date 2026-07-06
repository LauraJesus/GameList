import { Request, Response } from "express";
import { WishlistService } from "../services/wishlist.service";
import { AuthPayload } from "../tipos/auth.payload";

const wishlistService = new WishlistService();

export class WishlistController {

    async adicionar(req: Request, res: Response) {
        try {
            const payload = res.locals.token as AuthPayload;
            const usuarioId = payload.id;

            const { jogoId, jogoNome, jogoImagem } = req.body;

            const item = await wishlistService.adicionar(usuarioId, jogoId, jogoNome, jogoImagem);

            res.status(201).json(item);

        } catch (error) {
            res.status(400).json({
                message:
                error instanceof Error
                ? error.message
                : "Erro ao adicionar jogo",
            });
        }
    }

    async listar(req: Request, res: Response) {
        try {
            const payload = res.locals.token as AuthPayload;
            const usuarioId = payload.id;

            const lista = await wishlistService.listar(usuarioId);

            res.json(lista);

        } catch (error) {
            res.status(500).json({
                message:
                error instanceof Error
                ? error.message
                : "Erro ao listar jogos",
            });
        }
    }

    async remover(req: Request, res: Response) {
        try {
            const payload = res.locals.token as AuthPayload;
            const usuarioId = payload.id;

            const itemId = Number(req.params.id);

            const resultado = await wishlistService.remover(usuarioId, itemId);

            res.json(resultado);

        } catch (error) {
            res.status(400).json({
                message:
                error instanceof Error
                ? error.message
                : "Erro ao remover jogo",
            });
        }
    }
}
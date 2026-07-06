import { Request, Response } from "express";
import { ReviewService } from "../services/review.service";
import { AuthPayload } from "../tipos/auth.payload";

const reviewService = new ReviewService();

export class ReviewController {

    async criar(req: Request, res: Response) {
        try {
            const payload = res.locals.token as AuthPayload;
            const usuarioId = payload.id;

            const { jogoId, jogoNome, nota, comentario } = req.body;

            const review = await reviewService.criar(usuarioId, jogoId, jogoNome, nota, comentario);

            res.status(201).json(review);

        } catch (error) {
            res.status(400).json({
                message:
                error instanceof Error
                ? error.message
                : "Erro ao criar avaliação",
            });
        }
    }

    async listar(req: Request, res: Response) {
        try {
            const payload = res.locals.token as AuthPayload;
            const usuarioId = payload.id;

            const reviews = await reviewService.listar(usuarioId);

            res.json(reviews);

        } catch (error) {
            res.status(500).json({
                message:
                error instanceof Error
                ? error.message
                : "Erro ao listar avaliações",
            });
        }
    }

    
    async listarPorJogo(req: Request, res: Response) {
        try {
            const jogoId = Number(req.params.jogoId);

            const reviews = await reviewService.listarPorJogo(jogoId);

            res.json(reviews);

        } catch (error) {
            res.status(500).json({
                message:
                error instanceof Error
                ? error.message
                : "Erro ao listar avaliações do jogo",
            });
        }
    }

    async atualizar(req: Request, res: Response) {
        try {
            const payload = res.locals.token as AuthPayload;
            const usuarioId = payload.id;

            const reviewId = Number(req.params.id);
            const { nota, comentario } = req.body;

            const review = await reviewService.atualizar(usuarioId, reviewId, nota, comentario);

            res.json(review);

        } catch (error) {
            res.status(400).json({
                message:
                error instanceof Error
                ? error.message
                : "Erro ao atualizar avaliação",
            });
        }
    }

    async deletar(req: Request, res: Response) {
        try {
            const payload = res.locals.token as AuthPayload;
            const usuarioId = payload.id;

            const reviewId = Number(req.params.id);

            const resultado = await reviewService.deletar(usuarioId, reviewId);

            res.json(resultado);

        } catch (error) {
            res.status(400).json({
                message:
                error instanceof Error
                ? error.message
                : "Erro ao deletar avaliação",
            });
        }
    }
}

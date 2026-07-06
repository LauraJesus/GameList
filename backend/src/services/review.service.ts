import { prisma } from "../prisma/client";

export class ReviewService {

    async criar(usuarioId: number, jogoId: number, jogoNome: string, nota: number, comentario: string) {

        const jaAvaliou = await prisma.review.findFirst({
            where: { usuarioId, jogoId }
        });

        if(jaAvaliou) {
            throw new Error("Você já avaliou esse jogo.");
        }

        return await prisma.review.create({
            data: { usuarioId, jogoId, jogoNome, nota, comentario }
        });
    }

    async listar(usuarioId: number) {
        return await prisma.review.findMany({
            where: { usuarioId },
            orderBy: { criadoEm: "desc" },
        });
    }

    // NOVO: lista todas as avaliações de um jogo específico, de TODOS os usuários.
    // Diferente do listar() de cima, que só traz as avaliações de quem está logado.
    async listarPorJogo(jogoId: number) {
        const reviews = await prisma.review.findMany({
            where: { jogoId },
            orderBy: { criadoEm: "desc" },
            include: {
                usuario: {
                    select: { nome: true }, // nunca inclua a senha aqui
                },
            },
        });

        // achata o formato pra ficar { ...review, usuarioNome } em vez de
        // { ...review, usuario: { nome } }, mais simples de consumir no front
        return reviews.map((review) => ({
            id: review.id,
            jogoId: review.jogoId,
            jogoNome: review.jogoNome,
            nota: review.nota,
            comentario: review.comentario,
            criadoEm: review.criadoEm,
            usuarioNome: review.usuario.nome,
        }));
    }

    async atualizar(usuarioId: number, reviewId: number, nota: number, comentario: string) {
        const review = await prisma.review.findUnique({
            where: { id: reviewId }
        });

        if(!review) {
            throw new Error("Avaliação não encontrada.");
        }

        if(review.usuarioId !== usuarioId) {
            throw new Error("Você não tem permissão para editar esta avaliação.");
        }

        return await prisma.review.update({
            where: { id: reviewId },
            data: { nota, comentario }
        });
    }

    async deletar(usuarioId: number, reviewId: number) {
        const review = await prisma.review.findUnique({
            where: { id: reviewId }
        });

        if(!review) {
            throw new Error("Avaliação não encontrada.");
        }

        if(review.usuarioId !== usuarioId) {
            throw new Error("Você não tem permissão para deletar esta avaliação.");
        }

        await prisma.review.delete({
            where: { id: reviewId }
        });

        return { mensagem: "Avaliação removida com sucesso." };
    }
}

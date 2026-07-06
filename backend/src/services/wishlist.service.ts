import { prisma } from "../prisma/client";

export class WishlistService {

    async adicionar(usuarioId: number, jogoId: number, jogoNome: string, jogoImagem: string) {
        
        const jaExiste = await prisma.wishlist.findFirst({
            where: {
                usuarioId,
                jogoId,
            }
        });

        if(jaExiste) {
            throw new Error("Esse jogo já está na sua lista de desejos.");
        }

        const item = await prisma.wishlist.create({
            data: {
                usuarioId,
                jogoId,
                jogoNome,
                jogoImagem,
            }
        });

        return item;
    }

    async listar(usuarioId: number) {
        return await prisma.wishlist.findMany({
            where: { usuarioId },
            orderBy: { criadoEm: "desc" },
        });
    }

    async remover(usuarioId: number, itemId: number) {
        const item = await prisma.wishlist.findUnique({
            where: { id: itemId }
        });

        if(!item) {
            throw new Error("Item não encontrado.");
        }

        if(item.usuarioId !== usuarioId) {
            throw new Error("Você não tem permissão para remover este item.");
        }

        await prisma.wishlist.delete({
            where: { id: itemId }
        });

        return { mensagem: "Jogo removido da lista de desejos." };
    }
}
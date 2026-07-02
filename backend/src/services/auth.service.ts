import { prisma } from "../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {

    async create(nome:string, email: string, senha: string) {
          

        const isUserCreated = await prisma.usuario.findUnique({ // Verifica se o usuário já existe no banco de dados
            where: {
                email,
            }
        });
        
        if(isUserCreated) {
            throw new Error("Usuário ou senha inválidos"); // Lança um erro caso o usuário já exista
        }

        const senhaHashed = await bcrypt.hash(senha, 10); // criptografa a senha do usuário

        const dados = { // Cria um objeto com os dados do usuário
            nome,
            email,
            senha: senhaHashed,
            
        }

        const usuario = await prisma.usuario.create({  // Cria um novo usuário no banco de dados
            data: dados,
        });

        return { //devolve um objeto com o id e email do usuário criado
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
        }
    }

    async login(email: string, senha: string) {
         const usuarioExists = await prisma.usuario.findUnique({ // Verifica se o usuário já existe no banco de dados
            where: {
                email,
            }
        });
        
        if(!usuarioExists) {
            throw new Error("Usuário ou senha inválidos"); // Lança um erro caso o usuário já exista
        }
        
        const senhaMatch = await bcrypt.compare(senha, usuarioExists.senha); // Compara as senhas
        if(!senhaMatch) {
            throw new Error("Usuário ou senha inválidos"); // erro
        }
        
        const token = jwt.sign( //cria token
            {
            id: usuarioExists.id
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: "1d" // tempo de expiração do token
            }
        );
        return { token, };
    }

}
 
// ADD o campo nome 
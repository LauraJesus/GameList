import { z } from "zod";

export const registerSchema = z
  .object({
    nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.email("Email inválido"),
    senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    confSenha: z.string(),
  })
  .refine((d) => d.senha === d.confSenha, {
    message: "As senhas não coincidem",
    path: ["confSenha"],
  });

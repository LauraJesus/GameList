"use client";

import { registerSchema } from "@/app/schemas/register.schema";
import { registrar } from "@/services/auth.services";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import "@/componentes/LoginForm/LoginForm.css";

export default function RegisterForm() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confSenha, setConfSenha] = useState("");

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    const result = registerSchema.safeParse({
      nome,
      email,
      senha,
      confSenha,
    });

    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    try {
      await registrar({ nome, email, senha });
      toast.success("Usuário criado com sucesso");
      router.push("/login");
    } catch {
      toast.error("Erro ao criar usuário");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h1 className="form-title">GameList</h1>

      <div className="div-input">
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
          aria-label="Nome"
        />
      </div>
      <div className="div-input">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          aria-label="Email"
        />
      </div>
      <div className="div-input">
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Senha"
          aria-label="Senha"
        />
      </div>
      <div className="div-input">
        <input
          type="password"
          value={confSenha}
          onChange={(e) => setConfSenha(e.target.value)}
          placeholder="Confirmar Senha"
          aria-label="Confirmar Senha"
        />
      </div>

      <button>Criar Conta</button>
    </form>
  );
}

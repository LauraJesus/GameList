// Funções de chamadas HTTP para o backend
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const apiCall = async (endpoint: string, options?: RequestInit) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro na requisição');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth
export const auth = {
  login: (email: string, senha: string) =>
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, senha }),
    }),
  register: (nome: string, email: string, senha: string) =>
    apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ nome, email, senha }),
    }),
};

// Wishlist
export const wishlist = {
  list: () => apiCall('/wishlist'),
  add: (jogoId: number, jogoNome: string, jogoImagem: string) =>
    apiCall('/wishlist', {
      method: 'POST',
      body: JSON.stringify({ jogoId, jogoNome, jogoImagem }),
    }),
  remove: (jogoId: number) =>
    apiCall(`/wishlist/${jogoId}`, { method: 'DELETE' }),
};

// Reviews
export const reviews = {
  list: (jogoId?: number) =>
    apiCall(`/reviews${jogoId ? `?jogoId=${jogoId}` : ''}`),
  create: (jogoId: number, nota: number, comentario?: string) =>
    apiCall('/reviews', {
      method: 'POST',
      body: JSON.stringify({ jogoId, nota, comentario }),
    }),
  update: (reviewId: number, nota: number, comentario?: string) =>
    apiCall(`/reviews/${reviewId}`, {
      method: 'PUT',
      body: JSON.stringify({ nota, comentario }),
    }),
  delete: (reviewId: number) =>
    apiCall(`/reviews/${reviewId}`, { method: 'DELETE' }),
};

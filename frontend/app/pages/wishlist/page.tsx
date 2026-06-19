// Página de lista de desejos

'use client';

import { useEffect, useState } from 'react';
import { wishlist } from '@/app/lib/api';
import { WishlistItem } from '@/app/lib/types';

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Você precisa fazer login');
          setLoading(false);
          return;
        }

        // TODO: Implementar carregamento da wishlist
        setLoading(false);
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar wishlist');
        setLoading(false);
      }
    };

    loadWishlist();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">🎮 Minha Wishlist</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-8">
          <p className="text-gray-600">Carregando...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <p className="text-gray-600 mb-4">Nenhum jogo na wishlist ainda</p>
          <p className="text-sm text-gray-500">Adicione jogos para gerenciar sua coleção!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={item.jogoImagem}
                alt={item.jogoNome}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800">{item.jogoNome}</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Adicionado em: {new Date(item.criadoEm).toLocaleDateString('pt-BR')}
                </p>
                <button
                  // onClick={() => handleRemove(item.id)}
                  className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700 transition"
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

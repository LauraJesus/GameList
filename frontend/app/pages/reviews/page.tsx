// Página de reviews

'use client';

import { useEffect, useState } from 'react';
import { reviews } from '@/app/lib/api';
import { Review } from '@/app/lib/types';

export default function ReviewsPage() {
  const [reviewList, setReviewList] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Você precisa fazer login');
          setLoading(false);
          return;
        }

        // TODO: Implementar carregamento de reviews
        setLoading(false);
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar reviews');
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">⭐ Reviews</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-8">
          <p className="text-gray-600">Carregando...</p>
        </div>
      ) : reviewList.length === 0 ? (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <p className="text-gray-600 mb-4">Nenhum review disponível</p>
          <p className="text-sm text-gray-500">Seja o primeiro a avaliar um jogo!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviewList.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-xl text-gray-800">{review.jogoNome}</h3>
                  <p className="text-sm text-gray-500">
                    Avaliado em: {new Date(review.criadoEm).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-yellow-500">⭐</span>
                  <span className="text-xl font-bold text-gray-800">{review.nota}/10</span>
                </div>
              </div>

              {review.comentario && (
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {review.comentario}
                </p>
              )}

              <div className="flex gap-2">
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                  Editar
                </button>
                <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
                  Deletar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

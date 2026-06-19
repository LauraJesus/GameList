// Componente de cabeçalho da aplicação

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 shadow-lg">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold">🎮 Game Wishlist</h1>
        <p className="text-sm text-blue-100">Organize seus jogos favoritos</p>
      </div>
    </header>
  );
}

// Componente de rodapé

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white p-4 mt-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <h3 className="font-bold mb-2">Game Wishlist</h3>
            <p className="text-gray-400 text-sm">
              Sua plataforma para gerenciar e compartilhar games favoritos.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Links Rápidos</h3>
            <ul className="text-gray-400 text-sm space-y-1">
              <li><a href="/" className="hover:text-blue-400">Home</a></li>
              <li><a href="/pages/wishlist" className="hover:text-blue-400">Wishlist</a></li>
              <li><a href="/pages/reviews" className="hover:text-blue-400">Reviews</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Suporte</h3>
            <ul className="text-gray-400 text-sm space-y-1">
              <li><a href="#" className="hover:text-blue-400">Contato</a></li>
              <li><a href="#" className="hover:text-blue-400">FAQ</a></li>
              <li><a href="#" className="hover:text-blue-400">Termos de Uso</a></li>
            </ul>
          </div>
        </div>
        <hr className="border-gray-700 my-4" />
        <div className="text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} Game Wishlist. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

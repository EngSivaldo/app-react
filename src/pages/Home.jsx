import { useEffect, useState } from 'react';
import { ProductCard } from '../components/ProductCard';
// Importamos o serviço que criamos, não o arquivo de API direto
import { productService } from "../services/productService";

export function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        // Chamada correta via Service
        const data = await productService.getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Skeleton Loading (O efeito de "piscar" enquanto carrega)
  if (loading) {
    return (
      <main className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map(n => (
          <div key={n} className="h-80 bg-gray-200 animate-pulse rounded-xl"></div>
        ))}
      </main>
    );
  }

  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Nossos Produtos</h2>
        <span className="text-sm text-gray-500">
          {products?.length || 0} itens encontrados
        </span>
      </div>

      {/* Se não houver produtos, exibe uma mensagem amigável */}
      {products.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed">
          <p className="text-gray-400 font-medium">Nenhum produto cadastrado no banco de dados.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
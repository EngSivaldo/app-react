import { Header } from './components/Header';
import { AppRoutes } from './routes'; // Importa as rotas centralizadas

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />
      <AppRoutes /> 
    </div>
  );
}

export default App;
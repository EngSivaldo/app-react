// Simulando uma resposta do banco de dados (Django/Node)
export const getProducts = async () => {
  // Simulando um delay de rede de 800ms
  await new Promise(resolve => setTimeout(resolve, 800));

  return [
    { id: 1, name: "Teclado Mecânico RGB", price: 450.00, image: "https://picsum.photos/400/300?random=1", category: "Periféricos" },
    { id: 2, name: "Mouse Gamer 16k DPI", price: 199.00, image: "https://picsum.photos/400/300?random=2", category: "Periféricos" },
    { id: 3, name: "Monitor 144Hz 24'", price: 1200.00, image: "https://picsum.photos/400/300?random=3", category: "Monitores" },
    { id: 4, name: "Headset 7.1 Surround", price: 350.00, image: "https://picsum.photos/400/300?random=4", category: "Áudio" },
    { id: 5, name: "Cadeira Gamer Pro", price: 1500.00, image: "https://picsum.photos/400/300?random=5", category: "Móveis" },
    { id: 6, name: "Webcam 4K Ultra", price: 580.00, image: "https://picsum.photos/400/300?random=6", category: "Periféricos" },
  ];
};
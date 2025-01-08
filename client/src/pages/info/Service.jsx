const Service = () => {
  return (
    <div className="max-w-screen-lg mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Nossos Serviços</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Venda de Livros</h2>
          <p className="text-gray-700">
            Oferecemos uma ampla variedade de livros de diferentes gêneros e
            autores. Nossa coleção inclui ficção, não-ficção, romance, mistério,
            fantasia, e muito mais.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Clube do Livro</h2>
          <p className="text-gray-700">
            Participe do nosso clube do livro e junte-se a outros entusiastas da
            leitura para discutir livros, compartilhar opiniões e participar de
            eventos exclusivos.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Eventos e Workshops</h2>
          <p className="text-gray-700">
            Organizamos eventos e workshops regulares com autores, palestrantes
            e especialistas em diversos tópicos. Fique atento à nossa agenda de
            eventos.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Serviço de Entrega</h2>
          <p className="text-gray-700">
            Oferecemos serviço de entrega rápida e segura para que você possa
            receber seus livros no conforto da sua casa. Consulte nossas opções
            de entrega ao finalizar a compra.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Service;

const About = () => {
  return (
    <div className="bg-[#f2f3f5] text-black dark:text-white py-12">
      <div className="w-[90%] md:w-[80%] mx-auto">
        <h1
          className="text-[25px] md:text-[45px] font-[500] font-Poppins text-center py-2"
          style={{ color: "#212121" }}
        >
          O que é <span className="text-gradient">EasyShop Livros?</span>
        </h1>
        <p
          className="text-[18px] font-Poppins text-center"
          style={{ color: "#616161" }}
        >
          Bem-vindo à EasyShop Livros, o seu destino único para amantes de
          livros! Seja você um leitor ávido ou alguém que está começando a
          explorar o mundo dos livros, temos algo para todos.
        </p>
        <br />

        <div className="w-full md:w-[85%] mx-auto">
          <p
            className="text-[18px] font-Poppins mb-6"
            style={{ color: "#616161" }}
          >
            Na EasyShop Livros, acreditamos que os livros são mais do que apenas
            histórias; eles são janelas para novos mundos e conhecimentos. Nossa
            missão é tornar os livros acessíveis a todos, a preços acessíveis,
            enquanto proporcionamos uma experiência de compra fluida e
            agradável.
          </p>

          <p
            className="text-[18px] font-Poppins mb-6"
            style={{ color: "#616161" }}
          >
            Nossa plataforma oferece uma seleção cuidadosamente curada de livros
            em vários gêneros, desde ficção até não-ficção, história, autoajuda
            e muito mais. Nosso objetivo é apresentar aos leitores tanto os
            livros mais populares quanto as joias escondidas no mundo literário.
          </p>

          <p
            className="text-[18px] font-Poppins mb-6"
            style={{ color: "#616161" }}
          >
            Como fundador da EasyShop Livros, eu queria construir uma comunidade
            onde as pessoas não apenas comprassem livros, mas também
            interagissem com outros leitores, compartilhassem suas opiniões e
            participassem de discussões. Acreditamos que a leitura é uma
            jornada, e estamos aqui para apoiar você em cada passo.
          </p>

          <p
            className="text-[18px] font-Poppins mb-6"
            style={{ color: "#616161" }}
          >
            Junte-se à família EasyShop Livros hoje mesmo e comece sua aventura
            no mundo da literatura! Nossos livros estão esperando para serem
            descobertos, e mal podemos esperar para ajudá-lo a encontrar sua
            próxima grande leitura.
          </p>
        </div>

        <div className="text-center mt-8">
          <span
            className="text-[22px] font-Poppins"
            style={{ color: "#212121" }}
          >
            RXGabriel
          </span>
          <h5 className="text-[18px] font-Poppins" style={{ color: "#616161" }}>
            Fundador e CEO da EasyShop Livros
          </h5>
        </div>
      </div>
    </div>
  );
};

export default About;

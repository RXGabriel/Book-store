const About = () => {
  return (
    <div className="bg-[#f2f3f5] py-12">
      <div className="container mx-auto px-4">
        {/* Título com gradiente e sombra sutil */}
        <h1 className="text-3xl md:text-5xl font-bold font-Poppins text-center py-4 text-[#000957] tracking-wide drop-shadow-sm">
          O que é{" "}
          <span className="bg-gradient-to-r from-[#344CB7] to-[#577BC1] bg-clip-text text-transparent">
            EasyBooks?
          </span>
        </h1>
        <p className="text-lg md:text-xl font-Poppins text-center text-[#577BC1] max-w-3xl mx-auto">
          Bem-vindo à EasyBooks, o seu destino único para amantes de livros!
          Seja você um leitor ávido ou alguém que está começando a explorar o
          mundo dos livros, temos algo para todos.
        </p>

        {/* Conteúdo com espaçamento generoso e alinhamento central */}
        <div className="mt-10 max-w-4xl mx-auto space-y-8">
          <p className="text-lg md:text-xl font-Poppins text-center text-[#577BC1]">
            Na EasyBooks, acreditamos que os livros são mais do que apenas
            histórias; eles são janelas para novos mundos e conhecimentos. Nossa
            missão é tornar os livros acessíveis a todos, a preços justos,
            enquanto proporcionamos uma experiência de compra fluida e
            agradável.
          </p>
          <p className="text-lg md:text-xl font-Poppins text-center text-[#577BC1]">
            Nossa plataforma oferece uma seleção cuidadosamente curada de livros
            em vários gêneros, desde ficção até não-ficção, história, autoajuda
            e muito mais. Nosso objetivo é apresentar aos leitores tanto os
            livros mais populares quanto as joias escondidas do mundo literário.
          </p>
          <p className="text-lg md:text-xl font-Poppins text-center text-[#577BC1]">
            Como fundador da EasyBooks, eu queria construir uma comunidade onde
            as pessoas não apenas comprassem livros, mas também interagissem,
            compartilhassem opiniões e participassem de discussões. Acreditamos
            que a leitura é uma jornada, e estamos aqui para apoiar você em cada
            passo.
          </p>
          <p className="text-lg md:text-xl font-Poppins text-center text-[#577BC1]">
            Junte-se à família EasyBooks hoje mesmo e comece sua aventura no
            mundo da literatura! Nossos livros estão esperando para serem
            descobertos, e mal podemos esperar para ajudá-lo a encontrar sua
            próxima grande leitura.
          </p>
        </div>

        {/* Assinatura do fundador com destaque e harmonia */}
        <div className="mt-12 text-center">
          <span className="block text-2xl md:text-3xl font-Poppins text-[#000957]">
            RXGabriel
          </span>
          <h5 className="text-lg md:text-xl font-Poppins text-[#577BC1]">
            Fundador e CEO da EasyBooks
          </h5>
        </div>
      </div>
    </div>
  );
};

export default About;

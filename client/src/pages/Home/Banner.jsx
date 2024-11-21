import bannerImg from "../../assets/banner.png";

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row-reverse py-16 justify-between items-center gap-12">
      <div className="md:w-1/2 w-full flex items-center md:justify-end">
        <img src={bannerImg} alt="banner" />
      </div>

      <div className="md:w-1/2 w-full">
        <h1 className="md:text-5xl text-2xl font-medium mb-7">
          Novos lançamentos desta semana
        </h1>
        <p className="mb-10">
          É hora de atualizar sua lista de leitura com alguns dos maiores e mais
          recentes lançamentos do mundo literário. De thrillers emocionantes a
          memórias cativantes, os novos lançamentos desta semana oferecem algo
          para todos
        </p>
        <button className="btn-primary">Inscrever-se</button>
      </div>
    </div>
  );
};

export default Banner;

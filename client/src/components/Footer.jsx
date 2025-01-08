import { Link } from "react-router-dom";
import footerLogo from "../assets/footer-logo.png";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="md:w-1/2 w-full">
          <img src={footerLogo} alt="Logo" className="mb-5 w-36" />
          <ul className="flex flex-col md:flex-row gap-4">
            <li>
              <Link to="/" className="hover:text-primary">
                Início
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-primary">
                Serviços
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-primary">
                Sobre nós
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary">
                Contato
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:w-1/2 w-full">
          <p className="mb-4">
            Assine nossa newsletter para receber as últimas atualizações,
            notícias e ofertas!
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Adicione seu e-mail"
              className="w-full px-4 py-2 rounded-l-md text-black"
            />
            <button className="bg-primary px-6 py-2 rounded-r-md hover:bg-primary-dark">
              Inscrever-se
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center mt-10 border-t border-gray-700 pt-6">
        <ul className="flex gap-6 mb-4 md:mb-0">
          <li>
            <Link to="/privacy" className="hover:text-primary">
              Política de Privacidade
            </Link>
          </li>
          <li>
            <Link to="/terms" className="hover:text-primary">
              Termos de Serviço
            </Link>
          </li>
        </ul>

        <div className="flex gap-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

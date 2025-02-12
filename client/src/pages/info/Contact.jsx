import { useState } from "react";

const Contact = () => {
  return (
    <div className="bg-[#f2f3f5] py-12">
      <div className="container mx-auto px-4">
        {/* Seção de Informações */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="text-center lg:text-left">
            <h3 className="text-xl font-Poppins text-[#000957] mb-2">
              Nosso Endereço
            </h3>
            <p className="text-[16px] font-Poppins text-[#577BC1]">
              Rua Exemplo, 123 - Cidade, Estado
            </p>
          </div>
          <div className="text-center lg:text-left">
            <h3 className="text-xl font-Poppins text-[#000957] mb-2">E-mail</h3>
            <p className="text-[16px] font-Poppins text-[#577BC1]">
              contato@EasyBooks.com
            </p>
          </div>
          <div className="text-center lg:text-left">
            <h3 className="text-xl font-Poppins text-[#000957] mb-2">
              Telefone
            </h3>
            <p className="text-[16px] font-Poppins text-[#577BC1]">
              (11) 12345-6789
            </p>
          </div>
          <div className="text-center lg:text-left">
            <h3 className="text-xl font-Poppins text-[#000957] mb-2">
              Atendimento
            </h3>
            <p className="text-[16px] font-Poppins text-[#577BC1]">
              Segunda a Sexta, 9h - 18h
            </p>
          </div>
        </div>

        {/* Formulário de Contato */}
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6 text-[#000957]">
            Fale Conosco
          </h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-[16px] font-Poppins text-[#344CB7] mb-2"
              >
                Nome
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-[#344CB7] rounded-md outline-none focus:ring-2 focus:ring-[#FFEB00] transition-colors"
                placeholder="Seu nome"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-[16px] font-Poppins text-[#344CB7] mb-2"
              >
                Mensagem
              </label>
              <textarea
                id="message"
                className="w-full px-4 py-2 border border-[#344CB7] rounded-md outline-none focus:ring-2 focus:ring-[#FFEB00] transition-colors"
                rows="4"
                placeholder="Sua mensagem"
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-[16px] font-Poppins text-[#344CB7] mb-2"
              >
                E-mail
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-[#344CB7] rounded-md outline-none focus:ring-2 focus:ring-[#FFEB00] transition-colors"
                placeholder="Seu e-mail"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#FFEB00] text-[#000957] rounded-md font-Poppins font-bold hover:bg-[#E6C200] transition-colors duration-200"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

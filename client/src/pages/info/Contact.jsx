import { useState } from "react";

const Contact = () => {
  return (
    <div className="bg-[#f2f3f5] py-12">
      <div className="w-[90%] md:w-[80%] mx-auto">
        <div className="flex justify-between mb-8">
          <div className="w-[23%]">
            <h3 className="text-[18px] font-Poppins text-[#212121]">
              Nosso Endereço
            </h3>
            <p className="text-[16px] font-Poppins text-[#616161]">
              Rua Exemplo, 123 - Cidade, Estado
            </p>
          </div>
          <div className="w-[23%]">
            <h3 className="text-[18px] font-Poppins text-[#212121]">E-mail</h3>
            <p className="text-[16px] font-Poppins text-[#616161]">
              contato@easyshop.com
            </p>
          </div>
          <div className="w-[23%]">
            <h3 className="text-[18px] font-Poppins text-[#212121]">
              Telefone
            </h3>
            <p className="text-[16px] font-Poppins text-[#616161]">
              (11) 12345-6789
            </p>
          </div>
          <div className="w-[23%]">
            <h3 className="text-[18px] font-Poppins text-[#212121]">
              Atendimento
            </h3>
            <p className="text-[16px] font-Poppins text-[#616161]">
              Segunda a Sexta, 9h - 18h
            </p>
          </div>
        </div>

        <div className="w-full md:w-[45%] bg-white p-6 rounded-lg shadow-md mx-auto">
          <h2 className="text-[22px] font-Poppins text-[#212121] text-center mb-4">
            Fale Conosco
          </h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-[16px] font-Poppins text-[#616161]"
              >
                Nome
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border rounded-md outline-none"
                placeholder="Seu nome"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-[16px] font-Poppins text-[#616161]"
              >
                Mensagem
              </label>
              <textarea
                id="message"
                className="w-full px-4 py-2 border rounded-md outline-none"
                rows="4"
                placeholder="Sua mensagem"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-[16px] font-Poppins text-[#616161]"
              >
                E-mail
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border rounded-md outline-none"
                placeholder="Seu e-mail"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#2190ff] text-white rounded-md font-Poppins"
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

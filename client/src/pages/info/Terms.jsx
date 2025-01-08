import React from "react";

const Terms = () => {
  return (
    <div className="max-w-screen-lg mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Termos de Serviço</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-700 mb-4">
          Ao acessar o site da nossa livraria, você concorda em cumprir estes
          termos de serviço, todas as leis e regulamentos aplicáveis, e concorda
          que é responsável pelo cumprimento de todas as leis locais aplicáveis.
          Se você não concordar com algum desses termos, está proibido de usar
          ou acessar este site.
        </p>
        <p className="text-gray-700 mb-4">
          Os materiais contidos neste site são protegidos pelas leis de direitos
          autorais e marcas comerciais aplicáveis.
        </p>
        <h2 className="text-2xl font-semibold mb-4">Uso de Licença</h2>
        <p className="text-gray-700 mb-4">
          É concedida permissão para baixar temporariamente uma cópia dos
          materiais (informações ou software) no site da livraria, apenas para
          visualização transitória pessoal e não comercial. Esta é a concessão
          de uma licença, não uma transferência de título, e sob esta licença
          você não pode:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Modificar ou copiar os materiais;</li>
          <li>
            Usar os materiais para qualquer finalidade comercial ou para
            exibição pública (comercial ou não comercial);
          </li>
          <li>
            Tentar descompilar ou fazer engenharia reversa de qualquer software
            contido no site da livraria;
          </li>
          <li>
            Remover quaisquer direitos autorais ou outras notações de
            propriedade dos materiais; ou
          </li>
          <li>
            Transferir os materiais para outra pessoa ou 'espelhar' os materiais
            em qualquer outro servidor.
          </li>
        </ul>
        <p className="text-gray-700 mb-4">
          Esta licença será automaticamente rescindida se você violar alguma
          dessas restrições e poderá ser rescindida pela livraria a qualquer
          momento. Ao encerrar a visualização desses materiais ou após o término
          desta licença, você deve apagar todos os materiais baixados em sua
          posse, seja em formato eletrónico ou impresso.
        </p>
        <h2 className="text-2xl font-semibold mb-4">
          Isenção de responsabilidade
        </h2>
        <p className="text-gray-700 mb-4">
          Os materiais no site da livraria são fornecidos 'como estão'. A
          livraria não oferece garantias, expressas ou implícitas, e, por este
          meio, isenta e nega todas as outras garantias, incluindo, sem
          limitação, garantias implícitas ou condições de comercialização,
          adequação a um fim específico ou não violação de propriedade
          intelectual ou outra violação de direitos.
        </p>
        <p className="text-gray-700 mb-4">
          Além disso, a livraria não garante ou faz qualquer representação
          relativa à precisão, aos resultados prováveis ou à confiabilidade do
          uso dos materiais em seu site ou de outra forma relacionado a esses
          materiais ou em sites vinculados a este site.
        </p>
      </div>
    </div>
  );
};

export default Terms;

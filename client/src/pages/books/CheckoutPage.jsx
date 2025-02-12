import { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useCreateOrderMutation } from "../../redux/api/ordersApi";
import { useCreatePaypalPaymentMutation } from "../../redux/api/booksApi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { currentUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [createPaypalPayment] = useCreatePaypalPaymentMutation();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [step, setStep] = useState(1);

  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.newPrice, 0)
    .toFixed(2);

  const onSubmit = async (data) => {
    if (cartItems.length === 0) {
      Swal.fire({
        title: "Erro",
        text: "Adicione pelo menos um produto ao carrinho!",
        icon: "error",
      });
      return;
    }

    const newOrder = {
      name: data.name,
      email: currentUser?.email,
      address: {
        city: data.city,
        country: data.country,
        state: data.state,
        zipcode: data.zipcode,
      },
      phone: data.phone,
      productIds: cartItems.map((item) => item?._id),
      totalPrice: totalPrice,
    };

    try {
      await createOrder(newOrder).unwrap();
      await handlePayPalPayment();
    } catch (error) {
      console.error("Erro no pedido", error);
      Swal.fire("Erro", "Falha ao processar pedido", "error");
    }
  };

  const validateStep = async (step) => {
    let fields = [];
    switch (step) {
      case 1:
        fields = ["name", "phone", "city", "country", "state", "zipcode"];
        break;
      case 2:
        return isChecked;
      default:
        return true;
    }

    const isValid = await trigger(fields);
    return isValid;
  };

  const handleNextStep = async () => {
    const isValid = await validateStep(step);
    if (isValid) setStep(step + 1);
  };

  const handlePreviousStep = () => setStep(step - 1);

  const handlePayPalPayment = async () => {
    try {
      const response = await createPaypalPayment(totalPrice).unwrap();
      window.location.href = response.forwardLink;
    } catch (error) {
      console.error("Erro no PayPal", error);
      Swal.fire("Erro", "Falha no pagamento", "error");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <section className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow-lg rounded-lg p-8">
          {/* Cabeçalho */}
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Pagamento na Entrega
            </h2>
            <p className="text-gray-600 mt-2">Total: R${totalPrice}</p>
            <p className="text-gray-600 mt-1">Itens: {cartItems.length}</p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-6"
          >
            {step === 1 && (
              <>
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    Dados Pessoais
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: "name", label: "Nome Completo", type: "text" },
                    {
                      id: "phone",
                      label: "Telefone",
                      type: "number",
                      placeholder: "+55 11 91234-5678",
                    },
                    { id: "city", label: "Cidade", type: "text" },
                    { id: "country", label: "País/Região", type: "text" },
                    { id: "state", label: "Estado/Província", type: "text" },
                    { id: "zipcode", label: "CEP", type: "text" },
                  ].map((field) => (
                    <div key={field.id}>
                      <label
                        htmlFor={field.id}
                        className="block text-gray-700 font-medium mb-1"
                      >
                        {field.label}
                      </label>
                      <input
                        {...register(field.id, {
                          required: `${field.label} é obrigatório`,
                        })}
                        type={field.type}
                        id={field.id}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#FFEB00]"
                        placeholder={field.placeholder}
                      />
                      {errors[field.id] && (
                        <span className="text-red-500 text-sm mt-1 block">
                          {errors[field.id].message}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="text-right mt-4">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="bg-[#FFEB00] hover:bg-[#E6D400] text-[#000957] font-bold py-2 px-6 rounded-lg"
                  >
                    Próximo
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    Termos e Condições
                  </h3>
                </div>

                <div className="space-y-2">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      onChange={(e) => setIsChecked(e.target.checked)}
                      className="mt-1 form-checkbox h-5 w-5 text-[#FFEB00]"
                    />
                    <span className="ml-2 text-gray-700">
                      Concordo com os{" "}
                      <Link
                        to="/terms"
                        className="text-[#FFEB00] hover:underline"
                      >
                        Termos de Serviço
                      </Link>{" "}
                      e{" "}
                      <Link
                        to="/privacy"
                        className="text-[#FFEB00] hover:underline"
                      >
                        Política de Privacidade
                      </Link>
                    </span>
                  </label>
                  {!isChecked && step === 2 && (
                    <p className="text-red-500 text-sm">
                      Você deve aceitar os termos
                    </p>
                  )}
                </div>

                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={handlePreviousStep}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg"
                  >
                    Voltar
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    disabled={!isChecked}
                    className={`bg-[#FFEB00] hover:bg-[#E6D400] text-[#000957] font-bold py-2 px-4 rounded-lg ${
                      !isChecked ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    Próximo
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    Método de Pagamento
                  </h3>
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={handlePreviousStep}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg"
                  >
                    Voltar
                  </button>
                  <button
                    type="submit"
                    className="bg-[#FFEB00] hover:bg-[#E6D400] text-[#000957] font-bold py-2 px-4 rounded-lg"
                  >
                    Finalizar Compra com PayPal
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;

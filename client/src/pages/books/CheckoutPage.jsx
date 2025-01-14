import { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useCreateOrderMutation } from "../../redux/api/ordersApi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { currentUser } = useAuth();
  const { register, handleSubmit } = useForm();
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.newPrice, 0)
    .toFixed(2);

  const onSubmit = async (data) => {
    if (cartItems.length === 0) {
      Swal.fire({
        title: "Erro",
        text: "Adicione pelo menos um produto ao carrinho para realizar o checkout!",
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
      Swal.fire({
        title: "Pedido Confirmado",
        text: "Seu pedido foi realizado com sucesso!",
        icon: "warning",
      });
      navigate("/orders");
    } catch (error) {
      console.error("Erro ao realizar o pedido", error);
      alert("Falha ao realizar o pedido");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <section>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <div>
              <h2 className="font-semibold text-xl text-gray-600 mb-2">
                Pagamento na entrega
              </h2>
              <p className="text-gray-500 mb-2">Total Price: R${totalPrice}</p>
              <p className="text-gray-500 mb-6">
                Itens: {cartItems.length > 0 ? cartItems.length : 0}
              </p>
            </div>

            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8"
              >
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Detalhes pessoais</p>
                  <p>Preencha todos os campos.</p>
                </div>

                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label htmlFor="full_name">Nome completo</label>
                      <input
                        {...register("name", { required: true })}
                        type="text"
                        name="name"
                        id="name"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="email">Email</label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        disabled
                        defaultValue={currentUser?.email}
                        placeholder="email@domain.com"
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="phone">Número de telefone</label>
                      <input
                        {...register("phone", { required: true })}
                        type="number"
                        name="phone"
                        id="phone"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 appearance-none"
                        placeholder="+123 456 7890"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="address">Endereço / Rua</label>
                      <input
                        {...register("address", { required: true })}
                        type="text"
                        name="address"
                        id="address"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="city">Cidade</label>
                      <input
                        {...register("city", { required: true })}
                        type="text"
                        name="city"
                        id="city"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="country">País / Região</label>
                      <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <input
                          {...register("country", { required: true })}
                          name="country"
                          id="country"
                          className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="state">Estado / província</label>
                      <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <input
                          {...register("state", { required: true })}
                          name="state"
                          type="text"
                          id="state"
                          className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-1">
                      <label htmlFor="zipcode">Zipcode</label>
                      <input
                        {...register("zipcode", { required: true })}
                        type="text"
                        name="zipcode"
                        id="zipcode"
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                    </div>

                    <div className="md:col-span-5 mt-3">
                      <div className="inline-flex items-center">
                        <input
                          onChange={(e) => setIsChecked(e.target.checked)}
                          type="checkbox"
                          name="billing_same"
                          id="billing_same"
                          className="form-checkbox"
                        />
                        <label htmlFor="billing_same" className="ml-2 ">
                          Eu concordo com{" "}
                          <Link className="underline underline-offset-2 text-blue-600">
                            Termos e Condições
                          </Link>{" "}
                          e{" "}
                          <Link className="underline underline-offset-2 text-blue-600">
                            Política de compras
                          </Link>
                        </label>
                      </div>
                    </div>

                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          Faça um pedido
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;

import { useGetOrderByEmailQuery } from "../../redux/api/ordersApi";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

const OrderPage = () => {
  const { currentUser } = useAuth();
  const {
    data: initialOrders = [],
    isLoading,
    isError,
  } = useGetOrderByEmailQuery(currentUser.email);
  const [orders, setOrders] = useState(initialOrders);

  const handleDelete = (id) => {
    const updatedOrders = orders.filter((order) => order._id !== id);
    setOrders(updatedOrders);
  };

  if (isLoading) return <div>Carregando...</div>;
  if (isError) return <div>Error ao buscar os pedidos</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {orders.map((order, index) => (
        <div
          key={order._id}
          className="border p-4 shadow-md rounded bg-white flex flex-col justify-between h-full"
        >
          <div>
            <p className="p-1 bg-secondary text-white w-10 rounded mb-2">
              # {index + 1}
            </p>
            <h2 className="font-bold">Id do pedido: {order._id}</h2>
            <p className="text-gray-600">Nome: {order.name}</p>
            <p className="text-gray-600">E-mail: {order.email}</p>
            <p className="text-gray-600">Telefone: {order.phone}</p>
            <p className="text-gray-600">Preço total: R${order.totalPrice}</p>

            <h3 className="font-semibold mt-2">Endereço:</h3>
            <p>
              {order.address.city}, {order.address.state},{" "}
              {order.address.country}, {order.address.zipcode}
            </p>

            <h3 className="font-semibold mt-2">Id do Produto:</h3>
            <ul>
              {order.productIds.map((productId) => (
                <li key={productId}>{productId}</li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => handleDelete(order._id)}
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Excluir pedido
          </button>
        </div>
      ))}
    </div>
  );
};

export default OrderPage;

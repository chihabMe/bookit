import { api } from "~/utils/api";

const OrdersPage = () => {
  const {
    isLoading,
    isError,
    error,
    data: orders,
  } = api.ordres.getAllOrders.useQuery();
  if (isLoading) return <div>loading</div>;
  if (isError || !orders) return <div>{error?.message} </div>;
  return (
    <div>
      <div>
        {orders.map((order) => (
          <div key={order.id}>
            <h2>payment method {order.paymentMethod}</h2>
            <h2> ordred at {order.createdAt.toString()}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};
export default OrdersPage;

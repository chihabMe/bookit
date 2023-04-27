import { api } from "~/utils/api";

const OrdersPage = () => {
  const {
    isLoading,
    isError,
    error,
    data: orders,
  } = api.ordres.getAllOrders.useQuery();
  if (isError) return <div>{error?.message} </div>;
  if (isLoading) return <div>loading</div>;
  return (
    <div>
      <div>
        {orders?.map((order) => (
          <div>
            <h2 key={order.id}>payment method {order.paymentMethod}</h2>
            <h2 key={order.id}> ordred at {order.createdAt}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};
export default OrdersPage;

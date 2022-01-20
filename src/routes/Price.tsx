import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinTickers } from "../api";
import { ICoinId } from "./Chart";
import { IPriceData } from "./Coin";

function Price() {
  const { coinId } = useOutletContext<ICoinId>();
  const { isLoading, data } = useQuery<IPriceData>(["tickers", coinId], () =>
    fetchCoinTickers(coinId)
  );

  return (
    <div>
      {isLoading ? (
        "Loading Price ..."
      ) : (
        <div>
          <h1>Price : {data?.quotes.USD.price}</h1>
          <h1>Before 1hours : {data?.quotes.USD.percent_change_1h}</h1>
          <h1>Before 12hours : {data?.quotes.USD.percent_change_12h}</h1>
          <h1>Before a day : {data?.quotes.USD.percent_change_24h}</h1>
          <h1>Before a Month : {data?.quotes.USD.percent_change_30d}</h1>
        </div>
      )}
    </div>
  );
}
export default Price;

import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";
import PriceCheck from "../components/PriceCheck";
import { ICoinId } from "./Chart";
import { IPriceData } from "./Coin";

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease-in-out;
  margin-bottom: 50px;
`;

function Price() {
  const { coinId } = useOutletContext<ICoinId>();
  const [priceList, setPriceList] = useState<[string, number | string][]>();
  const { isLoading, data } = useQuery<IPriceData>(["tickers", coinId], () =>
    fetchCoinTickers(coinId)
  );
  useEffect(() => {
    if (!isLoading && data) {
      setPriceList([
        ["Price", data.quotes.USD.price.toFixed(2)],
        ["Before 1hours", data.quotes.USD.percent_change_1h],
        ["Before 12hours", data.quotes.USD.percent_change_12h],
        ["Before a day", data.quotes.USD.percent_change_24h],
        ["Before a Month", data.quotes.USD.percent_change_30d],
      ]);
    }
    console.log("RENDER");
  }, [isLoading, data]);
  return isLoading ? (
    <>Loading Price ...</>
  ) : (
    <PriceWrapper>
      {priceList &&
        priceList.map((item, index) => (
          <PriceCheck
            key={item[0]}
            index={index}
            title={item[0]}
            price={item[1]}
          />
        ))}
    </PriceWrapper>
  );
}
export default Price;

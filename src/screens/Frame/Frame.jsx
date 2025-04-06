import React, { useState, useEffect } from "react";
import { Card } from "../../components/ui/card";
import axios from "axios";

export const Frame = () => {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [exchangeRate, setExchangeRate] = useState(0);
  const [currencies, setCurrencies] = useState({});

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_EXCHANGE_API_KEY}/codes`
        );
        const currencyData = {};
        response.data.supported_codes.forEach((code) => {
          currencyData[code[0]] = code[1];
        });
        setCurrencies(currencyData);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    fetchCurrencies();
  }, []);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_EXCHANGE_API_KEY}/pair/${fromCurrency}/${toCurrency}`
        );
        setExchangeRate(response.data.conversion_rate);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };

    if (fromCurrency && toCurrency) {
      fetchExchangeRate();
    }
  }, [fromCurrency, toCurrency]);

  const convertedAmount = (Number(amount) * exchangeRate).toFixed(2);

  return (
    <main className="flex items-center justify-center min-h-screen bg-[#030712]">
      <Card className="w-[997px] h-[1129px] bg-[#111827] rounded-[32px] flex flex-col items-center pt-[120px]">
        <div className="w-[858px] flex flex-col items-center">
          <h1 className="text-[64px] font-bold text-white mb-16 text-center leading-[72px]">
            SG CURRENCY CONVERTER
          </h1>
          
          <div className="w-full">
            <div className="flex gap-8">
              <div className="flex-1">
                <label className="block text-[20px] font-medium text-[#E5E7EB] mb-4">
                  Amount
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full h-[72px] bg-[#1F2937] text-white text-[20px] rounded-lg px-6 border-2 border-[#374151] focus:border-[#6366F1] focus:outline-none transition-colors"
                  min="0"
                  placeholder="Enter amount"
                />
              </div>

              <div className="flex-1">
                <label className="block text-[20px] font-medium text-[#E5E7EB] mb-4">
                  From
                </label>
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="w-full h-[72px] bg-[#1F2937] text-white text-[20px] rounded-lg px-6 border-2 border-[#374151] focus:border-[#6366F1] focus:outline-none appearance-none transition-colors cursor-pointer"
                >
                  {Object.entries(currencies).map(([code, name]) => (
                    <option key={code} value={code} className="bg-[#1F2937]">
                      {code} - {name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-[20px] font-medium text-[#E5E7EB] mb-4">
                  To
                </label>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="w-full h-[72px] bg-[#1F2937] text-white text-[20px] rounded-lg px-6 border-2 border-[#374151] focus:border-[#6366F1] focus:outline-none appearance-none transition-colors cursor-pointer"
                >
                  {Object.entries(currencies).map(([code, name]) => (
                    <option key={code} value={code} className="bg-[#1F2937]">
                      {code} - {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-12 p-8 bg-[#1F2937] rounded-lg border-2 border-[#374151]">
              <div className="text-[32px] font-medium text-center text-white">
                {amount} {fromCurrency} = {convertedAmount} {toCurrency}
              </div>
              <div className="text-[20px] text-center text-[#9CA3AF] mt-4">
                1 {fromCurrency} = {exchangeRate.toFixed(6)} {toCurrency}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </main>
  );
};
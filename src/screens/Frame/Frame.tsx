import React, { useState } from "react";
import { Card } from "../../components/ui/card";
import { ArrowUpDown } from "lucide-react";

export const Frame = (): JSX.Element => {
  const [amount, setAmount] = useState<string>("1000.00");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#030712] p-4">
      <Card className="w-full max-w-[997px] bg-[#111827] p-8 text-white">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Currency Converter</h1>
          <p className="mt-2 text-gray-400">Check live foreign currency exchange rates</p>
        </div>

        <div className="grid gap-6">
          <div className="grid gap-4">
            <label className="text-sm text-gray-400">Amount</label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-lg bg-[#1F2937] p-4 text-xl text-white outline-none"
            />
          </div>

          <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-4">
            <div className="grid gap-4">
              <label className="text-sm text-gray-400">From</label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full rounded-lg bg-[#1F2937] p-4 text-xl text-white outline-none"
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
              </select>
            </div>

            <button
              onClick={() => {
                const temp = fromCurrency;
                setFromCurrency(toCurrency);
                setToCurrency(temp);
              }}
              className="mt-6 rounded-full bg-[#1F2937] p-3 hover:bg-[#374151]"
            >
              <ArrowUpDown className="h-6 w-6" />
            </button>

            <div className="grid gap-4">
              <label className="text-sm text-gray-400">To</label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full rounded-lg bg-[#1F2937] p-4 text-xl text-white outline-none"
              >
                <option value="EUR">EUR - Euro</option>
                <option value="USD">USD - US Dollar</option>
                <option value="GBP">GBP - British Pound</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <div className="rounded-lg bg-[#1F2937] p-6">
              <div className="text-sm text-gray-400">
                {amount} {fromCurrency} equals
              </div>
              <div className="mt-2 text-4xl font-bold">
                {(parseFloat(amount) * 0.92).toFixed(2)} {toCurrency}
              </div>
              <div className="mt-4 text-sm text-gray-400">
                1 {fromCurrency} = {0.92} {toCurrency}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </main>
  );
};
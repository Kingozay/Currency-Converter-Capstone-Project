import React, { useState, useEffect } from "react";
import { Card } from "../../components/ui/card";
import axios from "axios";
import { Moon, Sun, Newspaper, History, UserCircle } from "lucide-react";
import { Menu, Transition } from '@headlessui/react';

export const Frame = () => {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [exchangeRate, setExchangeRate] = useState(0);
  const [currencies, setCurrencies] = useState({});
  const [darkMode, setDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#030712]' : 'bg-gray-100'}`}>
      {/* Navigation Bar */}
      <nav className={`fixed w-full z-50 ${darkMode ? 'bg-[#111827] text-white' : 'bg-white text-gray-800'} shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold">SG Currency</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="flex items-center space-x-2 hover:text-indigo-500">
                <Newspaper size={20} />
                <span>Forex News</span>
              </a>
              <a href="#" className="flex items-center space-x-2 hover:text-indigo-500">
                <History size={20} />
                <span>Historical Data</span>
              </a>
              <a href="#" className="flex items-center space-x-2 hover:text-indigo-500">
                <UserCircle size={20} />
                <span>Login</span>
              </a>
              <button
                onClick={toggleDarkMode}
                className="flex items-center space-x-2 hover:text-indigo-500"
              >
                {darkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
                <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`${darkMode ? 'text-white' : 'text-gray-800'} p-2`}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} pb-3`}>
            <div className="flex flex-col space-y-4">
              <a href="#" className="flex items-center space-x-2 hover:text-indigo-500">
                <Newspaper size={20} />
                <span>Forex News</span>
              </a>
              <a href="#" className="flex items-center space-x-2 hover:text-indigo-500">
                <History size={20} />
                <span>Historical Data</span>
              </a>
              <a href="#" className="flex items-center space-x-2 hover:text-indigo-500">
                <UserCircle size={20} />
                <span>Login</span>
              </a>
              <button
                onClick={toggleDarkMode}
                className="flex items-center space-x-2 hover:text-indigo-500"
              >
                {darkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
                <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-screen pt-16">
        <Card className={`w-full max-w-[997px] mx-4 ${darkMode ? 'bg-[#111827]' : 'bg-white'} rounded-[32px] flex flex-col items-center py-8 md:py-[120px] px-4 md:px-8 my-8 md:my-0`}>
          <div className="w-full max-w-[858px] flex flex-col items-center">
            <h1 className={`text-3xl md:text-[64px] font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-8 md:mb-16 text-center leading-tight md:leading-[72px]`}>
              SG CURRENCY CONVERTER
            </h1>
            
            <div className="w-full">
              <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                <div className="flex-1">
                  <label className={`block text-[16px] md:text-[20px] font-medium ${darkMode ? 'text-[#E5E7EB]' : 'text-gray-700'} mb-2 md:mb-4`}>
                    Amount
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className={`w-full h-[50px] md:h-[72px] ${darkMode ? 'bg-[#1F2937] text-white' : 'bg-gray-50 text-gray-900'} text-[16px] md:text-[20px] rounded-lg px-4 md:px-6 border-2 ${darkMode ? 'border-[#374151]' : 'border-gray-200'} focus:border-[#6366F1] focus:outline-none transition-colors`}
                    min="0"
                    placeholder="Enter amount"
                  />
                </div>

                <div className="flex-1">
                  <label className={`block text-[16px] md:text-[20px] font-medium ${darkMode ? 'text-[#E5E7EB]' : 'text-gray-700'} mb-2 md:mb-4`}>
                    From
                  </label>
                  <select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className={`w-full h-[50px] md:h-[72px] ${darkMode ? 'bg-[#1F2937] text-white' : 'bg-gray-50 text-gray-900'} text-[16px] md:text-[20px] rounded-lg px-4 md:px-6 border-2 ${darkMode ? 'border-[#374151]' : 'border-gray-200'} focus:border-[#6366F1] focus:outline-none appearance-none transition-colors cursor-pointer`}
                  >
                    {Object.entries(currencies).map(([code, name]) => (
                      <option key={code} value={code} className={darkMode ? 'bg-[#1F2937]' : 'bg-gray-50'}>
                        {code} - {name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex-1">
                  <label className={`block text-[16px] md:text-[20px] font-medium ${darkMode ? 'text-[#E5E7EB]' : 'text-gray-700'} mb-2 md:mb-4`}>
                    To
                  </label>
                  <select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    className={`w-full h-[50px] md:h-[72px] ${darkMode ? 'bg-[#1F2937] text-white' : 'bg-gray-50 text-gray-900'} text-[16px] md:text-[20px] rounded-lg px-4 md:px-6 border-2 ${darkMode ? 'border-[#374151]' : 'border-gray-200'} focus:border-[#6366F1] focus:outline-none appearance-none transition-colors cursor-pointer`}
                  >
                    {Object.entries(currencies).map(([code, name]) => (
                      <option key={code} value={code} className={darkMode ? 'bg-[#1F2937]' : 'bg-gray-50'}>
                        {code} - {name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={`mt-8 md:mt-12 p-4 md:p-8 ${darkMode ? 'bg-[#1F2937]' : 'bg-gray-50'} rounded-lg border-2 ${darkMode ? 'border-[#374151]' : 'border-gray-200'}`}>
                <div className={`text-xl md:text-[32px] font-medium text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {amount} {fromCurrency} = {convertedAmount} {toCurrency}
                </div>
                <div className={`text-[16px] md:text-[20px] text-center ${darkMode ? 'text-[#9CA3AF]' : 'text-gray-500'} mt-2 md:mt-4`}>
                  1 {fromCurrency} = {exchangeRate.toFixed(6)} {toCurrency}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};
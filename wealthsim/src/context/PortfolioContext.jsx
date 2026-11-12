import { createContext, useState, useEffect, useContext } from 'react';
import { fetchLivePrices } from '../services/marketApi';

const PortfolioContext = createContext();

const INITIAL_ASSETS = [
  { id: 1, symbol: 'USD', name: 'Amerikan Doları', amount: 1500, buyPrice: 32.0 },
  { id: 2, symbol: 'GOLD', name: 'Gram Altın', amount: 25, buyPrice: 2800 },
  { id: 3, symbol: 'BTC', name: 'Bitcoin', amount: 0.02, buyPrice: 2100000 },
];

export const PortfolioProvider = ({ children }) => {
  const [assets, setAssets] = useState(() => {
    const saved = localStorage.getItem('wealthsim_assets');
    return saved ? JSON.parse(saved) : INITIAL_ASSETS;
  });

  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPrices = async () => {
      setLoading(true);
      const liveData = await fetchLivePrices();
      setPrices(liveData);
      setLoading(false);
    };
    loadPrices();
  }, []);

  useEffect(() => {
    localStorage.setItem('wealthsim_assets', JSON.stringify(assets));
  }, [assets]);

  const addAsset = (newAsset) => {
    setAssets((prev) => [...prev, { ...newAsset, id: Date.now() }]);
  };

  const removeAsset = (id) => {
    setAssets((prev) => prev.filter((item) => item.id !== id));
  };

  const portfolioSummary = assets.reduce(
    (acc, asset) => {
      const currentPrice = prices[asset.symbol] || asset.buyPrice;
      const currentValue = asset.amount * currentPrice;
      const costValue = asset.amount * asset.buyPrice;

      acc.totalValue += currentValue;
      acc.totalCost += costValue;
      return acc;
    },
    { totalValue: 0, totalCost: 0 }
  );

  return (
    <PortfolioContext.Provider
      value={{ assets, prices, loading, addAsset, removeAsset, portfolioSummary }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);

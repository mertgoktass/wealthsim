import { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

const ASSET_OPTIONS = [
  { symbol: 'USD', name: 'Amerikan Doları' },
  { symbol: 'EUR', name: 'Euro' },
  { symbol: 'GOLD', name: 'Gram Altın' },
  { symbol: 'BTC', name: 'Bitcoin' },
  { symbol: 'ETH', name: 'Ethereum' },
];

export default function AssetForm() {
  const { addAsset, prices } = usePortfolio();
  const [symbol, setSymbol] = useState('USD');
  const [amount, setAmount] = useState('');
  const [buyPrice, setBuyPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) return;

    const selected = ASSET_OPTIONS.find((a) => a.symbol === symbol);
    addAsset({
      symbol,
      name: selected.name,
      amount: parseFloat(amount),
      buyPrice: buyPrice ? parseFloat(buyPrice) : prices[symbol] || 0,
    });

    setAmount('');
    setBuyPrice('');
  };

  return (
    <form onSubmit={handleSubmit} className="card form-grid">
      <h3>Portföye Varlık Ekle</h3>
      <select value={symbol} onChange={(e) => setSymbol(e.target.value)}>
        {ASSET_OPTIONS.map((opt) => (
          <option key={opt.symbol} value={opt.symbol}>
            {opt.name} ({opt.symbol})
          </option>
        ))}
      </select>

      <input
        type="number"
        step="any"
        placeholder="Miktar (Örn: 100 veya 0.05)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <input
        type="number"
        step="any"
        placeholder="Alış Fiyatı (TL) - Boşsa güncel kur"
        value={buyPrice}
        onChange={(e) => setBuyPrice(e.target.value)}
      />

      <button type="submit" className="btn-primary">
        Ekle
      </button>
    </form>
  );
}

import { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export default function CompoundCalculator() {
  const { portfolioSummary } = usePortfolio();
  const [monthlyAdd, setMonthlyAdd] = useState(5000);
  const [annualRate, setAnnualRate] = useState(45);
  const [inflationRate, setInflationRate] = useState(35);
  const [years, setYears] = useState(5);

  const calculateProjection = () => {
    let nominalTotal = portfolioSummary.totalValue;
    const monthlyRate = annualRate / 100 / 12;
    const months = years * 12;

    for (let i = 0; i < months; i++) {
      nominalTotal = (nominalTotal + Number(monthlyAdd)) * (1 + monthlyRate);
    }

    const realTotal = nominalTotal / Math.pow(1 + inflationRate / 100, years);

    return {
      nominal: Math.round(nominalTotal),
      real: Math.round(realTotal),
    };
  };

  const result = calculateProjection();

  return (
    <div className="card">
      <h3>Gelecek Senaryo Simülatörü</h3>
      <div className="sim-controls">
        <label>
          Aylık Ek Yatırım: <strong>{Number(monthlyAdd).toLocaleString()} ₺</strong>
          <input
            type="range"
            min="0"
            max="50000"
            step="1000"
            value={monthlyAdd}
            onChange={(e) => setMonthlyAdd(e.target.value)}
          />
        </label>

        <label>
          Beklenen Yıllık Getiri: <strong>%{annualRate}</strong>
          <input
            type="range"
            min="5"
            max="120"
            value={annualRate}
            onChange={(e) => setAnnualRate(e.target.value)}
          />
        </label>

        <label>
          Tahmini Yıllık Enflasyon: <strong>%{inflationRate}</strong>
          <input
            type="range"
            min="5"
            max="100"
            value={inflationRate}
            onChange={(e) => setInflationRate(e.target.value)}
          />
        </label>

        <label>
          Süre: <strong>{years} Yıl</strong>
          <input
            type="range"
            min="1"
            max="20"
            value={years}
            onChange={(e) => setYears(e.target.value)}
          />
        </label>
      </div>

      <div className="sim-results">
        <div>
          <span>{years} Yıl Sonraki Nominal Bakiye</span>
          <h4>{result.nominal.toLocaleString()} ₺</h4>
        </div>
        <div>
          <span>Enflasyondan Arındırılmış (Reel Değer)</span>
          <h4 className="highlight">{result.real.toLocaleString()} ₺</h4>
        </div>
      </div>
    </div>
  );
}

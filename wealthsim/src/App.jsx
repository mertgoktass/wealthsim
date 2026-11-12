import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import AssetForm from './components/AssetForm';
import PortfolioChart from './components/PortfolioChart';
import CompoundCalculator from './components/CompoundCalculator';
import './App.css';

function Dashboard() {
  const { assets, prices, loading, removeAsset, portfolioSummary } = usePortfolio();

  const profitLoss = portfolioSummary.totalValue - portfolioSummary.totalCost;
  const profitPercent =
    portfolioSummary.totalCost > 0
      ? ((profitLoss / portfolioSummary.totalCost) * 100).toFixed(2)
      : 0;

  return (
    <div className="container">
      <header className="header">
        <h1>WealthSim</h1>
        <span>{loading ? 'Canlı kurlar güncelleniyor...' : 'Canlı Piyasa Aktif'}</span>
      </header>

      <div className="summary-grid">
        <div className="card">
          <span>Toplam Portföy Değeri</span>
          <h2>{Math.round(portfolioSummary.totalValue).toLocaleString()} ₺</h2>
        </div>
        <div className="card">
          <span>Toplam Maliyet</span>
          <h2>{Math.round(portfolioSummary.totalCost).toLocaleString()} ₺</h2>
        </div>
        <div className="card">
          <span>Net Kâr / Zarar</span>
          <h2 className={profitLoss >= 0 ? 'profit' : 'loss'}>
            {profitLoss >= 0 ? '+' : ''}
            {Math.round(profitLoss).toLocaleString()} ₺ (%{profitPercent})
          </h2>
        </div>
      </div>

      <div className="main-grid">
        <div>
          <AssetForm />
          <div className="card" style={{ marginTop: '1rem' }}>
            <h3>Varlıklarım (Backtest & Durum)</h3>
            <table className="asset-table">
              <thead>
                <tr>
                  <th>Varlık</th>
                  <th>Miktar</th>
                  <th>Güncel Değer</th>
                  <th>Kâr/Zarar</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {assets.map((asset) => {
                  const currentPrice = prices[asset.symbol] || asset.buyPrice;
                  const val = asset.amount * currentPrice;
                  const diff = val - asset.amount * asset.buyPrice;
                  return (
                    <tr key={asset.id}>
                      <td>{asset.name}</td>
                      <td>{asset.amount}</td>
                      <td>{Math.round(val).toLocaleString()} ₺</td>
                      <td className={diff >= 0 ? 'profit' : 'loss'}>
                        {diff >= 0 ? '+' : ''}
                        {Math.round(diff).toLocaleString()} ₺
                      </td>
                      <td>
                        <button onClick={() => removeAsset(asset.id)} className="btn-del">
                          Sil
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <PortfolioChart />
          <div style={{ marginTop: '1rem' }}>
            <CompoundCalculator />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <Dashboard />
    </PortfolioProvider>
  );
}

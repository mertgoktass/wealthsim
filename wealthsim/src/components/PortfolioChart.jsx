import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { usePortfolio } from '../context/PortfolioContext';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PortfolioChart() {
  const { assets, prices } = usePortfolio();

  const data = {
    labels: assets.map((a) => a.name),
    datasets: [
      {
        data: assets.map((a) => a.amount * (prices[a.symbol] || a.buyPrice)),
        backgroundColor: ['#3b82f6', '#eab308', '#f97316', '#10b981', '#8b5cf6'],
        borderWidth: 2,
        borderColor: '#1e293b',
      },
    ],
  };

  return (
    <div className="card chart-container">
      <h3>Varlık Dağılımı (TL)</h3>
      {assets.length > 0 ? (
        <div style={{ maxWidth: '280px', margin: '0 auto' }}>
          <Doughnut data={data} />
        </div>
      ) : (
        <p>Grafik için varlık ekleyin.</p>
      )}
    </div>
  );
}

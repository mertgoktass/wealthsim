# WealthSim — Finansal Portföy ve Senaryo Simülatörü

Kullanıcıların döviz, altın ve kripto varlıklarla sanal portföyler oluşturup gerçek zamanlı piyasa verileriyle kâr/zarar takibi yapabildiği, enflasyon ve bileşik getiri senaryolarını test edebildiği modern bir React uygulaması.

## Özellikler
- **Canlı Piyasa Verileri:** CoinGecko ve ExchangeRate API entegrasyonu ile anlık kur ve kripto takibi (hata durumunda otomatik yedek fiyat desteği).
- **Portföy Dağılım Grafiği:** Chart.js ile interaktif varlık dağılımı görselleştirmesi.
- **Backtest & Kâr/Zarar Analizi:** Farklı alış maliyetleriyle eklenen varlıkların güncel getiri hesabı.
- **Bileşik Getiri ve Enflasyon Simülatörü:** Aylık düzenli yatırım, beklenen yıllık getiri ve tahmini enflasyon oranlarına göre nominal ve reel gelecek bakiye hesaplaması.
- **Kalıcı Veri Depolama:** `LocalStorage` ile portföy verilerinin tarayıcıda saklanması.

## Kurulum ve Çalıştırma

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

## Kullanılan Teknolojiler
- React 18 & Vite
- Context API
- Chart.js & react-chartjs-2
- CSS3 (Responsive Grid & Custom Properties)

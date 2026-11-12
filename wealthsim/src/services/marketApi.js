export const fetchLivePrices = async () => {
  try {
    const cryptoRes = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd'
    );
    const cryptoData = await cryptoRes.json();

    const forexRes = await fetch('https://open.er-api.com/v6/latest/USD');
    const forexData = await forexRes.json();

    const usdToTry = forexData.rates.TRY || 34.5;

    return {
      USD: usdToTry,
      EUR: usdToTry / forexData.rates.EUR || 37.2,
      BTC: (cryptoData.bitcoin?.usd || 68000) * usdToTry,
      ETH: (cryptoData.ethereum?.usd || 2600) * usdToTry,
      GOLD: 3050,
    };
  } catch (error) {
    console.error('API hatası, varsayılan fiyatlar kullanılıyor:', error);
    return {
      USD: 34.5,
      EUR: 37.2,
      BTC: 2350000,
      ETH: 90000,
      GOLD: 3050,
    };
  }
};

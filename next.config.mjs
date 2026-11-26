/** @type {import('next').NextConfig} */
const nextConfig = {
  // Oude adressen van de huidige site doorsturen naar de nieuwe pagina's
  async redirects() {
    const dienst = (oud, nieuw) => ({ source: `/dienst/${oud}`, destination: nieuw, permanent: true });
    return [
      dienst('verwarming', '/diensten/verwarming'),
      dienst('ontluchten-en-bijvullen', '/diensten/verwarming'),
      dienst('service-onderhoud', '/diensten/service-onderhoud'),
      dienst('elektra', '/diensten/elektra'),
      dienst('sanitair', '/diensten/sanitair'),
      dienst('loodgieterswerkzaamheden', '/diensten/loodgieterswerk'),
      dienst('zinkwerk', '/diensten/loodgieterswerk'),
      dienst('duurzaam', '/#duurzaam'),
      dienst('zonnepanelen', '/diensten/zonnepanelen'),
      dienst('warmtepomp', '/diensten/warmtepomp'),
      dienst('zonneboiler', '/diensten/zonneboiler'),
      dienst('wtw-ventilatie', '/diensten/wtw-ventilatie'),
      dienst('airco', '/diensten/airco'),
      { source: '/diensten', destination: '/#diensten', permanent: true },
      { source: '/werkenbij', destination: '/werken-bij', permanent: true },
      { source: '/historie', destination: '/over-ons', permanent: true },
      { source: '/referenties', destination: '/over-ons', permanent: true },
      { source: '/ai-als-motor-voor-verandering', destination: '/actueel/ai-als-motor-voor-verandering', permanent: true },
      { source: '/waterzijdig-inregelen-bewezen-besparing-en-comfortwinst-in-bestaande-bouw', destination: '/actueel/waterzijdig-inregelen-bewezen-besparing-en-comfortwinst-in-bestaande-bouw', permanent: true },
      { source: '/subsidies-voor-het-verduurzamen-van-de-woning-wat-is-er-veranderd', destination: '/actueel/subsidies-voor-het-verduurzamen-van-de-woning-wat-is-er-veranderd', permanent: true },
    ];
  },
};

export default nextConfig;

import React from 'react';

function EnvCard() {
  // 先写一些假数据，后面你可以用真实传感器替换
  const temperature = 26;   // °C
  const humidity = 55;      // %
  const airQuality = 'Good';

  return (
    <div className="card">
      <h2>Environment</h2>
      <p>Temperature: {temperature} °C</p>
      <p>Humidity: {humidity} %</p>
      <p>Air quality: {airQuality}</p>
    </div>
  );
}

export default EnvCard;

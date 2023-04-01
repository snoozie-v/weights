import React, { useState } from 'react';

const WEIGHTS = [45, 35, 25, 10, 5, 2.5];

function WeightLifter() {
  const [plates, setPlates] = useState([0, 0, 0, 0, 0, 0]);

  function handleWeightChange(index, value) {
    const newPlates = [...plates];
    if (newPlates[index] + value >= 0) {
      newPlates[index] += value;
      setPlates(newPlates);
    }
  }

  const totalWeight = plates.reduce((total, plate, index) => {
    return total + plate * WEIGHTS[index] * 2; // multiply by 2 for both sides of the bar
  }, 45); // add the weight of the bar itself (45 lbs)

  const addedPlates = plates
    .map((count, index) => ({ count, weight: WEIGHTS[index] }))
    .filter(({ count }) => count > 0)
    .flatMap(({ count, weight }) => Array(count).fill(weight));


  const buttonStyle = { border: '1px solid black', width: '100px', height: '50px' };

  return (
    <div style={{paddingLeft: '8px'}}>
      <h2 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black' }}>Total weight: {totalWeight} lbs</h2>
      {addedPlates.length > 0 && (
        <div>
          <p>Plates added:</p>
          <ul>
            {addedPlates.map((weight, index) => (
              <li key={index}>{weight} lbs</li>
            ))}
          </ul>
        </div>
      )}
      <div style={{padding: '12px' }}>
        {WEIGHTS.map((weight, index) => (
          <button style={buttonStyle} key={weight} onClick={() => handleWeightChange(index, 1)}>
            +{weight} lbs
          </button>
        ))}
      </div>
      <div style={{padding: '12px' }}>
        {WEIGHTS.map((weight, index) => (
          <button style={buttonStyle} key={weight} onClick={() => handleWeightChange(index, -1)} disabled={plates[index] === 0}>
            -{weight} lbs
          </button>
        ))}
      </div>
    </div>
  );
}

export default WeightLifter;

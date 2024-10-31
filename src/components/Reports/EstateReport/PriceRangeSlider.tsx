import React, { useState } from 'react';
import { Range } from 'react-range';

const MIN = 0;
const MAX = 1000000;

const PriceRangeSlider = ({ onPriceChange }: { onPriceChange: (values: number[]) => void }) => {
  const [priceRange, setPriceRange] = useState([MIN, MAX]);

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
    onPriceChange(values);
  };

  return (
    <div>
      <h4>Filtrar por Preço</h4>
      <Range
        step={10000}
        min={MIN}
        max={MAX}
        values={priceRange}
        onChange={handlePriceChange}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
                height: '4px',
                width: '100%',
                backgroundColor: '#0d6efd', 
                margin: '10px 0',
                display: 'flex',
                justifyItems: 'center',
              }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
                height: '15px',
                width: '15px',
                backgroundColor: '#0d6efd', 
                borderRadius: '50%',
                margin: '0 0 0 -7px'
              }}
          />
        )}
      />
      <div>
        <p style={{fontSize: '14px'}}>Preço Mínimo: {priceRange[0].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
        <p style={{fontSize: '14px'}}>Preço Máximo: {priceRange[1].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
      </div>
    </div>
  );
};

export default PriceRangeSlider;

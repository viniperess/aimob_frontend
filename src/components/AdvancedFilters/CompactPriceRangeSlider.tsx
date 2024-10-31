import React from 'react';
import { Range } from 'react-range';

const MIN = 0;
const MAX = 1000000;

interface PriceRangeSliderProps {
  onPriceChange: (values: number[]) => void;
  priceRange: number[];
}

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({ onPriceChange, priceRange }) => {
  return (
    <div>
      <Range
        step={10000}
        min={MIN}
        max={MAX}
        values={priceRange}
        onChange={onPriceChange}
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
              height: '10px',
              width: '10px',
              backgroundColor: '#0d6efd',
              borderRadius: '50%',
              margin: '0 0 0 -7px',
            }}
          />
        )}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px' }}>
        <p style={{ marginRight: '5px' }}>Preço Mínimo: {priceRange[0].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
        <p>Preço Máximo: {priceRange[1].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
      </div>
    </div>
  );
};

export default PriceRangeSlider;

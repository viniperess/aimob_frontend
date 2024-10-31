import React, { useState } from 'react';
import PriceRangeSlider from './CompactPriceRangeSlider';
import './AdvancedFilters.css';

interface AdvancedFiltersProps {
  onFilterChange: (newFilters: {}) => void;
  resetFilters: () => void;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({ onFilterChange, resetFilters }) => {
  const initialFilters = {
    bedrooms: '',
    bathrooms: '',
    kitchens: '',
    livingRooms: '',
    type: '',
    garage: '',
    yard: '',
    pool: '',
    priceRange: [0, 1000000],
  };
  
  const [localFilters, setLocalFilters] = useState(initialFilters);
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
    onFilterChange({ [name]: value });
  };

  const handlePriceChange = (values: number[]) => {
    setLocalFilters((prev) => ({ ...prev, priceRange: values }));
    onFilterChange({ minPrice: values[0], maxPrice: values[1] });
  };

  const handleResetFilters = () => {
    setLocalFilters(initialFilters); // Limpa todos os campos de filtro
    resetFilters(); // Notifica o reset para o componente pai
    onFilterChange(initialFilters); // Reinicia os filtros para os valores iniciais
  };


  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#f8f9fa',
        maxWidth: '100%',
        width: '100%',
        margin: '0 auto',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', fontSize: '12px', alignItems: 'start', marginLeft: '30px'}}>
        <label><strong>Quartos</strong></label>
        <div style={{ display: 'flex', gap: '10px' }}>
        {[1, 2, 3].map((num) => (
            <label key={num}>
              {num}
              <input
                type="radio"
                name="bedrooms"
                value={num}
                checked={localFilters.bedrooms === num.toString()}
                onChange={handleRadioChange}
                style={{ marginLeft: '2px' }}
              />
            </label>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', fontSize: '12px', alignItems: 'start' }}>
        <label><strong>Banheiros</strong></label>
        <div style={{ display: 'flex', gap: '10px' }}>
        {[1, 2, 3].map((num) => (
            <label key={num}>
              {num}
              <input
                type="radio"
                value={num}
                name='bathrooms'
                checked={localFilters.bathrooms === num.toString()}
                onChange={handleRadioChange}
                style={{ marginLeft: '2px' }}
              />
            </label>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', fontSize: '12px', alignItems: 'start' }}>
        <label><strong>Cozinhas</strong></label>
        <div style={{ display: 'flex', gap: '10px' }}>
        {[1, 2, 3].map((num) => (
            <label key={num}>
              {num}
              <input
                type="radio"
                name='kitchens'
                checked={localFilters.kitchens === num.toString()}
                value={num}
                onChange={handleRadioChange}
                style={{ marginLeft: '2px' }}
              />
            </label>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', fontSize: '12px', alignItems: 'start' }}>
        <label><strong>Salas</strong></label>
        <div style={{ display: 'flex', gap: '10px' }}>
        {[1, 2, 3].map((num) => (
            <label key={num}>
              {num}
              <input
                type="radio"
                name='livingRooms'
                checked={localFilters.livingRooms === num.toString()}
                value={num}
                onChange={handleRadioChange}
                style={{ marginLeft: '2px' }}
              />
            </label>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', fontSize: '12px', alignItems: 'start' }}>
        <label><strong>Tipo</strong></label>
        <div style={{ display: 'flex', gap: '10px' }}>
        <label>
            Ap
            <input
              type="radio"
              name="type"
              value="apartamento"
              checked={localFilters.type === "apartamento"}
              onChange={handleRadioChange}
              style={{ marginLeft: '5px' }}
            />
          </label>
          <label>
            Casa
            <input
              type="radio"
              name="type"
              checked={localFilters.type === "casa"}
              value="casa"
              onChange={handleRadioChange}
              style={{ marginLeft: '5px' }}
            />
          </label>
        </div>
        
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', fontSize: '12px', alignItems: 'start' }}>
        <label><strong>Garagem</strong></label>
        <div style={{ display: 'flex', gap: '10px' }}>
        <label>
      Não
      <input
        type="radio"
        name="garage"
        value="false"
        checked={localFilters.garage === "false"}
        onChange={handleRadioChange}
        style={{ marginLeft: '5px' }}
      />
    </label>
        <label>
      Sim
      <input
        type="radio"
        name="garage"
        value="true"
        checked={localFilters.garage === "true"}
        onChange={handleRadioChange}
        style={{ marginLeft: '5px' }}
      />
    </label>

        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', fontSize: '12px', alignItems: 'start' }}>
        <label><strong>Pátio</strong></label>
        <div style={{ display: 'flex', gap: '10px' }}>
        <label>
      Não
      <input
        type="radio"
        name="yard"
        checked={localFilters.yard === "false"}
        value="false"
        onChange={handleRadioChange}
        style={{ marginLeft: '5px' }}
      />
    </label>
        <label>
      Sim
      <input
        type="radio"
        name="yard"
        checked={localFilters.yard === "true"}
        value="true"
        onChange={handleRadioChange}
        style={{ marginLeft: '5px' }}
      />
    </label>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', fontSize: '12px', alignItems: 'start' }}>
        <label><strong>Piscina</strong></label>
        <div style={{ display: 'flex', gap: '10px' }}>
        <label>
      Não
      <input
        type="radio"
        name="pool"
        checked={localFilters.pool === "false"}
        value="false"
        defaultChecked
        onChange={handleRadioChange}
        style={{ marginLeft: '5px' }}
      />
    </label>
        <label>
      Sim
      <input
        type="radio"
        name="pool"
        checked={localFilters.pool === "true"}
        value="true"
        onChange={handleRadioChange}
        style={{ marginLeft: '5px' }}
      />
    </label>
        </div>
      </div>

      <div className="priceRange" style={{marginTop: '15px'}}>
      <PriceRangeSlider onPriceChange={handlePriceChange} priceRange={localFilters.priceRange}/> </div>
      <button
        style={{
          padding: '5px 10px',
          backgroundColor: ' #ffc107',
          color: 'white',
          border: 'none',
          borderRadius: '3px',
          fontSize: '12px',
          cursor: 'pointer',
          marginLeft: '20px',
        }}
        onClick={handleResetFilters}
      >
        Limpar Filtros
      </button>
    </div>
  );
};

export default AdvancedFilters;

import './Steps.css';
import { AiOutlineUser, AiOutlineStar } from 'react-icons/ai';
import { FiSend } from 'react-icons/fi';

const Steps = ({ currentStep }) => {
  return (
    <div className='steps'>
      <div className={`step ${currentStep >= 1 ? "active" : ""}`}>
        <AiOutlineUser />
        <p>Localização</p>
      </div>

      <div className={`step ${currentStep >= 2 ? "active" : ""}`}>
        <AiOutlineStar />
        <p>Informações</p>
      </div>

      <div className={`step ${currentStep >= 3 ? "active" : ""}`}>
        <FiSend />
        <p>Envio</p>
      </div>
    </div>
  );
};

export default Steps;

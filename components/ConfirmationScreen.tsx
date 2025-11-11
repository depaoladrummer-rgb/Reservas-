import React from 'react';
import type { ReservationData } from '../types';
import { SuggestionCard } from './SuggestionCard';

interface ConfirmationScreenProps {
  reservationData: ReservationData;
  suggestion: string | null;
  isLoading: boolean;
  error: string | null;
  onReset: () => void;
  onCancel: () => void;
}

export const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  reservationData,
  suggestion,
  isLoading,
  error,
  onReset,
  onCancel,
}) => {
  return (
    <div className="text-center w-full px-4">
      <div className="animate-fade-in-down">
        <h1 className="text-4xl md:text-5xl font-bold text-white">Reserva Confirmada!</h1>
        <p className="text-lg text-orange-400 mt-2">
          Obrigado, {reservationData.name}! Sua reserva para {reservationData.guests} pessoas no dia {new Date(reservationData.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })} às {reservationData.time} foi recebida.
        </p>
        <p className="text-md text-gray-300 mt-2">
          Entraremos em contato pelo telefone: <strong>{reservationData.phone}</strong>
        </p>
      </div>

      <SuggestionCard suggestion={suggestion} isLoading={isLoading} error={error} />
      
      <div className="flex justify-center items-center space-x-4">
        <button
          onClick={onCancel}
          className="mt-8 bg-red-600/80 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transform transition-colors duration-300 animate-fade-in-up"
          style={{ animationDelay: '300ms' }}
        >
          Cancelar Reserva
        </button>
        <button
          onClick={onReset}
          className="mt-8 bg-gray-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-600 transform transition-colors duration-300 animate-fade-in-up"
          style={{ animationDelay: '200ms' }}
        >
          Fazer Outra Reserva
        </button>
      </div>
    </div>
  );
};
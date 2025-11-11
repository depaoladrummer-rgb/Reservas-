import React, { useState } from 'react';
import type { ReservationData } from '../types';

interface ContractsViewProps {
  reservations: ReservationData[];
}


export const ContractsView: React.FC<ContractsViewProps> = ({ reservations }) => {
  const [selectedReservationId, setSelectedReservationId] = useState<string>('');

  const selectedReservation = reservations.find(r => r.id.toString() === selectedReservationId);

  return (
    <div className="w-full max-w-4xl mx-auto text-center animate-fade-in-up">
      <h2 className="text-3xl font-bold text-orange-400 mb-6">Contratos de Eventos</h2>
      <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6">
        {reservations.length === 0 ? (
          <div>
            <p className="text-gray-300">Nenhuma reserva encontrada para associar a um contrato.</p>
            <p className="text-gray-400 mt-2 text-sm">
              Por favor, faça uma reserva primeiro na aba "Nova Reserva".
            </p>
          </div>
        ) : (
          <>
            <label htmlFor="reservation-select" className="block text-sm font-medium text-gray-300 mb-2 text-left">
              Selecione uma Reserva para ver o Contrato
            </label>
            <select
              id="reservation-select"
              value={selectedReservationId}
              onChange={(e) => setSelectedReservationId(e.target.value)}
              className="w-full bg-gray-900/70 border border-gray-600 text-white rounded-lg pl-4 pr-10 py-2.5 focus:ring-2 focus:ring-orange-500 focus:outline-none transition appearance-none"
            >
              <option value="" disabled>Selecione...</option>
              {reservations.map(res => (
                <option key={res.id} value={res.id.toString()}>
                  {res.name} - {new Date(res.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                </option>
              ))}
            </select>
          </>
        )}
        
        <div className="mt-6 border-2 border-dashed border-gray-500 rounded-lg h-96 flex items-center justify-center bg-gray-900/50">
            <p className="text-gray-500 px-4">
              {selectedReservation 
                ? `Visualizador de PDF para o contrato de: ${selectedReservation.name}`
                : "Selecione uma reserva para visualizar o contrato associado."
              }
            </p>
        </div>
      </div>
    </div>
  );
};
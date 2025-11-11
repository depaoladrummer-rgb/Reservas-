import React from 'react';
import type { ReservationData } from '../types';
import { CalendarIcon } from './icons/CalendarIcon';
import { ClockIcon } from './icons/ClockIcon';
import { UsersIcon } from './icons/UsersIcon';
import { GiftIcon } from './icons/GiftIcon';
import { PhoneIcon } from './icons/PhoneIcon';

interface ReservationsListViewProps {
  reservations: ReservationData[];
}

export const ReservationsListView: React.FC<ReservationsListViewProps> = ({ reservations }) => {
  if (reservations.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto text-center animate-fade-in-up">
        <h2 className="text-3xl font-bold text-orange-400 mb-6">Minhas Reservas</h2>
        <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-8">
          <p className="text-gray-300 text-lg">Você ainda não fez nenhuma reserva.</p>
          <p className="text-gray-400 mt-2">Vá para a aba "Nova Reserva" para começar.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in-up">
      <h2 className="text-3xl font-bold text-orange-400 mb-6 text-center">Minhas Reservas</h2>
      <div className="space-y-4">
        {reservations.map((res) => (
          <div key={res.id} className="bg-gray-800/50 border border-gray-600 rounded-lg p-4 shadow-md transition-transform duration-300 hover:scale-[1.02] hover:border-orange-500/50">
            <h3 className="text-xl font-bold text-orange-400">{res.name}</h3>
            <div className="flex items-center space-x-2 text-gray-400 text-sm mb-3">
              <PhoneIcon className="h-4 w-4" />
              <span>{res.phone}</span>
            </div>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-gray-300">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5 text-gray-400" />
                <span>{new Date(res.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</span>
              </div>
              <div className="flex items-center space-x-2">
                <ClockIcon className="h-5 w-5 text-gray-400" />
                <span>{res.time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <UsersIcon className="h-5 w-5 text-gray-400" />
                <span>{res.guests} convidados</span>
              </div>
               <div className="flex items-center space-x-2">
                <GiftIcon className="h-5 w-5 text-gray-400" />
                <span>{res.occasion}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
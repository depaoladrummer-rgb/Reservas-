import React, { useState } from 'react';
import type { ReservationData } from '../types';
import { UsersIcon } from './icons/UsersIcon';
import { CalendarIcon } from './icons/CalendarIcon';
import { ClockIcon } from './icons/ClockIcon';
import { GiftIcon } from './icons/GiftIcon';
import { PhoneIcon } from './icons/PhoneIcon';
import { UserIcon } from './icons/UserIcon';

interface ReservationFormProps {
  onSubmit: (data: Omit<ReservationData, 'id'>) => void;
  isLoading: boolean;
}

export const ReservationForm: React.FC<ReservationFormProps> = ({ onSubmit, isLoading }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [occasion, setOccasion] = useState('aniversário');
  const [eventType, setEventType] = useState('Comum');
  
  const isFormValid = name && phone && guests > 0 && date && time && occasion;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onSubmit({ name, phone, guests, date, time, occasion, eventType });
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Nome da Reserva</label>
          <div className="relative">
             <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </span>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-600 text-white rounded-lg pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:outline-none transition"
              placeholder="Ex: Família Silva"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">Telefone para Contato</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <PhoneIcon className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-600 text-white rounded-lg pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:outline-none transition"
              placeholder="(XX) XXXXX-XXXX"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="guests" className="block text-sm font-medium text-gray-300 mb-1">Nº de Pessoas</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <UsersIcon className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="number"
                id="guests"
                min="1"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value, 10))}
                className="w-full bg-gray-800/50 border border-gray-600 text-white rounded-lg pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:outline-none transition"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="occasion" className="block text-sm font-medium text-gray-300 mb-1">Ocasião</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <GiftIcon className="h-5 w-5 text-gray-400" />
              </span>
              <select
                id="occasion"
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-600 text-white rounded-lg pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:outline-none transition appearance-none"
              >
                <option>aniversário</option>
                <option>casamento</option>
                <option>noivado</option>
                <option>dia dos namorados</option>
                <option>batismo</option>
                <option>reunião</option>
              </select>
            </div>
          </div>
        </div>
        
        <div>
          <label htmlFor="eventType" className="block text-sm font-medium text-gray-300 mb-1">Tipo de Evento</label>
          <select
            id="eventType"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="w-full bg-gray-800/50 border border-gray-600 text-white rounded-lg pl-4 pr-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:outline-none transition appearance-none"
          >
            <option>Comum</option>
            <option>Pacote</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">Data</label>
            <div className="relative">
               <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <CalendarIcon className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="date"
                id="date"
                min={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-600 text-white rounded-lg pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:outline-none transition"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-300 mb-1">Horário</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <ClockIcon className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-600 text-white rounded-lg pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:outline-none transition"
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={!isFormValid || isLoading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center"
        >
          {isLoading ? (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : null}
          {isLoading ? 'Gerando Sugestão...' : 'Ver Sugestão de Evento'}
        </button>
      </form>
    </div>
  );
};
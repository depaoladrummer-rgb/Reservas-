import React, { useState } from 'react';
import type { User } from '../types';
import { UserIcon } from './icons/UserIcon';
import { LockClosedIcon } from './icons/LockClosedIcon';
import { BuildingOfficeIcon } from './icons/BuildingOfficeIcon';

interface RegistrationScreenProps {
  onRegister: (newUser: Omit<User, 'password'>, password: string) => { success: boolean, message: string };
  onSwitchToLogin: () => void;
}

export const RegistrationScreen: React.FC<RegistrationScreenProps> = ({ onRegister, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [establishment, setEstablishment] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || !establishment || !username || !password) {
      setError('Todos os campos são obrigatórios.');
      return;
    }
    const result = onRegister({ name, establishment, username }, password);
    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <main className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10 animate-fade-in-down">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-400">Criar Conta</h1>
          <p className="text-gray-300 mt-2 text-lg">Cadastre-se para acessar o sistema</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900/50 p-8 rounded-xl shadow-2xl border border-gray-700 animate-fade-in-up">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">Nome Completo</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="text"
                id="fullName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-600 text-white rounded-lg pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:outline-none transition"
                placeholder="Seu nome completo"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="establishment" className="block text-sm font-medium text-gray-300 mb-1">Estabelecimento</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="text"
                id="establishment"
                value={establishment}
                onChange={(e) => setEstablishment(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-600 text-white rounded-lg pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:outline-none transition"
                placeholder="Nome da sua empresa"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">Usuário (Login)</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-600 text-white rounded-lg pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:outline-none transition"
                placeholder="Crie um nome de usuário"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Senha</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <LockClosedIcon className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-600 text-white rounded-lg pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:outline-none transition"
                placeholder="Crie uma senha forte"
                required
              />
            </div>
          </div>
          
          {error && (
            <p className="text-red-400 text-sm text-center animate-shake">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300"
          >
            Cadastrar
          </button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-6">
          Já tem uma conta?{' '}
          <button onClick={onSwitchToLogin} className="font-semibold text-orange-400 hover:text-orange-300">
            Faça login
          </button>
        </p>
      </div>
    </main>
  );
};

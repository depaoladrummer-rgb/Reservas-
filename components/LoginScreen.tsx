import React, { useState } from 'react';
import { UserIcon } from './icons/UserIcon';
import { LockClosedIcon } from './icons/LockClosedIcon';

interface LoginScreenProps {
  onLogin: (user: string, pass: string) => boolean;
  onSwitchToRegister: () => void;
  message?: string | null;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onSwitchToRegister, message }) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleLoginAttempt = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = onLogin(user, pass);
    if (!success) {
      setError('Usuário ou senha inválidos.');
    }
  };

  return (
    <main className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10 animate-fade-in-down">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-400">Bar Figueiras</h1>
          <p className="text-gray-300 mt-2 text-lg">Acesso ao Sistema de Reservas</p>
        </div>
        <form onSubmit={handleLoginAttempt} className="space-y-6 bg-gray-900/50 p-8 rounded-xl shadow-2xl border border-gray-700 animate-fade-in-up">
          {message && (
            <p className="text-green-400 text-sm text-center bg-green-900/50 p-3 rounded-lg">{message}</p>
          )}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">Usuário</label>
            <div className="relative">
               <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="text"
                id="username"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-600 text-white rounded-lg pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:outline-none transition"
                placeholder="Digite seu usuário"
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
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-600 text-white rounded-lg pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:outline-none transition"
                placeholder="Digite sua senha"
                required
              />
            </div>
          </div>
          
          {error && (
            <p className="text-red-400 text-sm text-center animate-shake">{error}</p>
          )}

          <button
            type="submit"
            disabled={!user || !pass}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
          >
            Entrar
          </button>
        </form>
         <p className="text-center text-sm text-gray-400 mt-6">
          Não tem uma conta?{' '}
          <button onClick={onSwitchToRegister} className="font-semibold text-orange-400 hover:text-orange-300">
            Cadastre-se
          </button>
        </p>
      </div>
    </main>
  );
};

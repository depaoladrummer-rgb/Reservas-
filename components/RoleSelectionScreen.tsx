import React from 'react';

const UserGroupIcon: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962A3.75 3.75 0 0112 15.75c-1.657 0-3.042-.962-3.72-2.311m6.032-2.311a3.75 3.75 0 01-2.286-1.061 3.75 3.75 0 01-2.286 1.061m3.536-2.58A3.75 3.75 0 0112 6c-1.657 0-3.042.962-3.72 2.311M12 15.75a3.75 3.75 0 01-3.72-2.311m0 0a3.75 3.75 0 01-2.286 1.061 3.75 3.75 0 01-2.286-1.061m0 0A3.75 3.75 0 013 9.75v.008" />
    </svg>
);

const WrenchScrewdriverIcon: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.664 1.206-.861a7.5 7.5 0 10-9.362 9.362c.2-.466.477-.89.86-1.206l3.03-2.496z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L15.17 11.42" />
    </svg>
);

interface RoleSelectionScreenProps {
  onSelectRole: (role: 'client' | 'admin') => void;
}

export const RoleSelectionScreen: React.FC<RoleSelectionScreenProps> = ({ onSelectRole }) => {
  return (
    <main className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12 animate-fade-in-down">
        <h1 className="text-4xl md:text-5xl font-bold text-orange-400">Bar Figueiras</h1>
        <p className="text-gray-300 mt-2 text-xl">Bem-vindo ao nosso sistema de reservas</p>
      </div>
      <div className="w-full max-w-2xl mx-auto animate-fade-in-up">
        <h2 className="text-2xl font-semibold text-center text-white mb-8">Como você gostaria de entrar?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Client Card */}
          <button
            onClick={() => onSelectRole('client')}
            className="group bg-gray-900/50 p-8 rounded-xl shadow-2xl border border-gray-700 hover:border-orange-500/80 hover:scale-105 transition-all duration-300 flex flex-col items-center text-center"
          >
            <div className="bg-orange-500/20 p-4 rounded-full mb-6 group-hover:bg-orange-500/40 transition-colors">
                <UserGroupIcon className="text-orange-400"/>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Sou Cliente</h3>
            <p className="text-gray-400">Quero fazer, ver ou gerenciar uma reserva.</p>
          </button>

          {/* Admin Card */}
          <button
            onClick={() => onSelectRole('admin')}
            className="group bg-gray-900/50 p-8 rounded-xl shadow-2xl border border-gray-700 hover:border-blue-500/80 hover:scale-105 transition-all duration-300 flex flex-col items-center text-center"
          >
            <div className="bg-blue-500/20 p-4 rounded-full mb-6 group-hover:bg-blue-500/40 transition-colors">
                <WrenchScrewdriverIcon className="text-blue-400"/>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Sou Administrador</h3>
            <p className="text-gray-400">Quero gerenciar o estabelecimento e as reservas.</p>
          </button>
        </div>
      </div>
    </main>
  );
};

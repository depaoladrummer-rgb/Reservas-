import React, { useState, useCallback } from 'react';
import type { ReservationData, User } from './types';
import { ReservationForm } from './components/ReservationForm';
import { ConfirmationScreen } from './components/ConfirmationScreen';
import { ContractsView } from './components/ContractsView';
import { ReservationsListView } from './components/ReservationsListView';
import { LoginScreen } from './components/LoginScreen';
import { RegistrationScreen } from './components/RegistrationScreen';
import { getHolidaySuggestion } from './services/geminiService';

// A simple icon for logout
const LogoutIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);


const App: React.FC = () => {
  const [view, setView] = useState<'login' | 'register' | 'app'>('login');
  const [loginMessage, setLoginMessage] = useState<string | null>(null);

  const [users, setUsers] = useState<User[]>([
    { username: 'admin', password: 'figueiras2024', name: 'Admin', establishment: 'Bar Figueiras' }
  ]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [reservationData, setReservationData] = useState<ReservationData | null>(null);
  const [reservationsList, setReservationsList] = useState<ReservationData[]>([]);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeView, setActiveView] = useState<'reservas' | 'contratos' | 'minhasReservas'>('reservas');

  const handleLogin = useCallback((user: string, pass: string): boolean => {
    const foundUser = users.find(u => u.username === user && u.password === pass);
    if (foundUser) {
      setCurrentUser(foundUser);
      setView('app');
      return true;
    }
    return false;
  }, [users]);

  const handleRegister = useCallback((newUser: Omit<User, 'password'>, password: string): { success: boolean, message: string } => {
    if (users.some(u => u.username === newUser.username)) {
      return { success: false, message: 'Este nome de usuário já existe.' };
    }
    const userToSave: User = { ...newUser, password };
    setUsers(prevUsers => [...prevUsers, userToSave]);
    setLoginMessage('Cadastro realizado com sucesso! Faça o login.');
    setView('login');
    return { success: true, message: 'Usuário cadastrado com sucesso!' };
  }, [users]);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
    setView('login');
    setLoginMessage(null);
    // Reset state when logging out
    handleReset();
    setReservationsList([]);
    setActiveView('reservas');
  }, []);

  const handleReservationSubmit = useCallback(async (data: Omit<ReservationData, 'id'>) => {
    setIsLoading(true);
    setError(null);

    const isEditing = !!reservationData;
    const newReservation: ReservationData = { ...data, id: isEditing ? reservationData.id : Date.now() };

    setReservationData(newReservation);

    if (isEditing) {
      setReservationsList(prevList => prevList.map(res => res.id === newReservation.id ? newReservation : res));
    } else {
      setReservationsList(prevList => [...prevList, newReservation]);
    }

    setIsSubmitted(true);

    try {
      const result = await getHolidaySuggestion(newReservation);
      setSuggestion(result);
    } catch (e) {
      setError("Falha ao obter sugestão. Por favor, tente novamente.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [reservationData]);

  const handleReset = useCallback(() => {
    setReservationData(null);
    setSuggestion(null);
    setIsLoading(false);
    setError(null);
    setIsSubmitted(false);
  }, []);

  const handleCancelReservation = useCallback(() => {
    if (reservationData) {
      setReservationsList(prevList => prevList.filter(res => res.id !== reservationData.id));
    }
    handleReset();
  }, [reservationData, handleReset]);
  
  const handleEditReservation = useCallback(() => {
    setIsSubmitted(false);
    setSuggestion(null);
  }, []);

  const navButtonClasses = (view: 'reservas' | 'contratos' | 'minhasReservas') => 
    `px-4 md:px-6 py-2 rounded-md text-base md:text-lg font-semibold transition-colors duration-300 ${
      activeView === view 
        ? 'bg-orange-500 text-white shadow-lg' 
        : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/70'
    }`;
  
  if (view === 'login') {
    return <LoginScreen onLogin={handleLogin} onSwitchToRegister={() => { setView('register'); setLoginMessage(null); }} message={loginMessage} />;
  }

  if (view === 'register') {
    return <RegistrationScreen onRegister={handleRegister} onSwitchToLogin={() => setView('login')} />;
  }

  return (
    <main className="bg-black text-white min-h-screen flex flex-col items-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/50 z-0"></div>
      
      <header className="relative z-10 w-full max-w-6xl flex justify-between items-center mb-8 animate-fade-in-down">
          <div className="text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-orange-400">Bar Figueiras</h1>
            <p className="text-gray-400 text-sm">Usuário: {currentUser?.name}</p>
          </div>
          <button onClick={handleLogout} className="flex items-center space-x-2 bg-red-600/80 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
            <LogoutIcon />
            <span>Sair</span>
          </button>
      </header>
      
      <div className="relative z-10 flex flex-col items-center justify-center w-full">
        <nav className="flex space-x-2 md:space-x-4 mb-8">
          <button onClick={() => {
            if (isSubmitted) handleReset();
            setActiveView('reservas');
           }} className={navButtonClasses('reservas')}>
            Nova Reserva
          </button>
          <button onClick={() => setActiveView('minhasReservas')} className={navButtonClasses('minhasReservas')}>
            Minhas Reservas
          </button>
          <button onClick={() => setActiveView('contratos')} className={navButtonClasses('contratos')}>
            Contratos
          </button>
        </nav>

        {activeView === 'reservas' && (
          <>
            {!isSubmitted ? (
              <ReservationForm
                onSubmit={handleReservationSubmit}
                isLoading={isLoading}
                initialData={reservationData}
              />
            ) : (
              reservationData && (
                <ConfirmationScreen
                  reservationData={reservationData}
                  suggestion={suggestion}
                  isLoading={isLoading}
                  error={error}
                  onReset={handleReset}
                  onCancel={handleCancelReservation}
                  onEdit={handleEditReservation}
                />
              )
            )}
          </>
        )}
        
        {activeView === 'minhasReservas' && <ReservationsListView reservations={reservationsList} />}
        {activeView === 'contratos' && <ContractsView reservations={reservationsList} />}
      </div>
    </main>
  );
};

export default App;

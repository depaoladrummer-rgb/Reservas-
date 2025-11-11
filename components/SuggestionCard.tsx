import React from 'react';

interface SuggestionCardProps {
  suggestion: string | null;
  isLoading: boolean;
  error: string | null;
}

const LoadingSkeleton: React.FC = () => (
  <div className="space-y-4">
    <div className="h-4 bg-gray-600 rounded w-3/4 animate-pulse"></div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-600 rounded animate-pulse"></div>
      <div className="h-4 bg-gray-600 rounded w-5/6 animate-pulse"></div>
      <div className="h-4 bg-gray-600 rounded w-4/6 animate-pulse"></div>
    </div>
    <div className="h-4 bg-gray-600 rounded w-1/2 animate-pulse pt-4"></div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-600 rounded animate-pulse"></div>
      <div className="h-4 bg-gray-600 rounded w-5/6 animate-pulse"></div>
    </div>
  </div>
);


export const SuggestionCard: React.FC<SuggestionCardProps> = ({ suggestion, isLoading, error }) => {
  return (
    <div className="mt-8 bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-xl p-6 shadow-2xl w-full max-w-2xl mx-auto animate-fade-in-up">
      <h2 className="text-2xl font-bold text-orange-400 mb-4">Uma Sugestão Especial para Você</h2>
      <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
        {isLoading && <LoadingSkeleton />}
        {error && <p className="text-red-400">{error}</p>}
        {!isLoading && !error && suggestion && <p>{suggestion}</p>}
      </div>
    </div>
  );
};
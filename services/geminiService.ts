import { GoogleGenAI } from "@google/genai";
import { ReservationData } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function getHolidaySuggestion(data: ReservationData): Promise<string> {
  const { guests, occasion, date, eventType } = data;

  const prompt = `Aja como um planejador de eventos criativo e experiente para o "Bar Figueiras", um local conhecido por seu ambiente sofisticado e aconchegante. Um cliente está organizando uma celebração e precisa de uma sugestão detalhada.
Detalhes do evento:
- Ocasião: '${occasion}'
- Data: ${date}
- Número de Convidados: ${guests}
- Estilo do Evento: '${eventType}'

Com base nesses detalhes, crie um conceito completo para o evento no Bar Figueiras. Descreva um tema criativo, sugestões de cardápio (entrada, prato principal, sobremesa e bebidas), ideias de decoração que combinem com o ambiente do bar, e uma atividade ou entretenimento especial para os convidados. A sugestão deve ser inspiradora, bem estruturada e fácil de entender. Responda em português do Brasil.`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching suggestion from Gemini API:", error);
    return "Desculpe, não foi possível gerar uma sugestão no momento. Por favor, tente novamente mais tarde.";
  }
}

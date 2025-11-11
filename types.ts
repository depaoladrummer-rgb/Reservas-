export interface ReservationData {
  id: number;
  name: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  occasion: string;
  eventType: string;
}

export interface User {
  username: string;
  password: string;
  name: string;
  establishment: string;
}
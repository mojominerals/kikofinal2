export interface Show {
  id: string;
  date: string;
  venue: string;
  city: string;
  status: 'available' | 'sold-out' | 'last-chance';
  price: string;
  ticketUrl: string;
}

export interface Video {
  id: string;
  title: string;
  views: string;
  thumbnail: string;
}

export interface MerchItem {
  id: string;
  name: string;
  price: string;
  image: string;
  tagline: string;
}

export interface HecklerInteraction {
  id: string;
  hecklerQuote: string;
  kikoComeback: string;
  damageRating: number; // 1-5 skulls
}
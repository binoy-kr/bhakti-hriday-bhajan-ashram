export interface ServiceOffering {
  id: string;
  title: string;
  sanskrit: string;
  description: string;
  image: string;
  duration: string;
  icon: 'music' | 'puja' | 'wisdom' | 'seva';
}

export interface Festival {
  id: string;
  name: string;
  date: string;
  month: string;
  place: string;
  description: string;
  image: string;
  accent: 'gold' | 'teal' | 'rose' | 'burgundy';
}

export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  category: 'Darshan' | 'Festivals' | 'Seva' | 'Sacred Art';
  alt: string;
  span: 'tall' | 'wide' | 'normal';
}

export interface Testimonial {
  quote: string;
  name: string;
  location: string;
  role: string;
}

export interface Room {
  id: string;
  name: string;
  category: string;
  price: number;
  capacity: string;
  size: string;
  image: string;
  description: string;
  features: string[];
}

export interface DonationTier {
  id: string;
  title: string;
  amount: number;
  description: string;
  impact: string;
  featured?: boolean;
}

export interface StatCard {
  label: string;
  value: string;
  detail: string;
  icon: string;
  tone: 'gold' | 'teal' | 'rose' | 'burgundy';
}

export interface DonationRecord {
  id: string;
  donor: string;
  amount: number;
  purpose: string;
  date: string;
  status: 'Completed' | 'Processing';
}

export interface BookingRecord {
  id: string;
  guest: string;
  room: string;
  checkIn: string;
  nights: number;
  status: 'Confirmed' | 'Pending';
}

export interface ActivityItem {
  id: string;
  title: string;
  detail: string;
  time: string;
  icon: string;
}

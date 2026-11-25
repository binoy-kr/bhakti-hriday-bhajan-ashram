import { Injectable } from '@angular/core';
import {
  ActivityItem,
  BookingRecord,
  DonationRecord,
  DonationTier,
  Festival,
  GalleryItem,
  Room,
  ServiceOffering,
  StatCard,
  Testimonial
} from '../model/site.models';

@Injectable({ providedIn: 'root' })
export class SiteContentService {
  readonly heroImage = 'assets/images/radha-krishna-hero.jpg';
  readonly finalImage = 'assets/images/radha-krishna-devotion.jpg';

  readonly services: ServiceOffering[] = [
    {
      id: 'kirtan',
      title: 'Sacred Kirtan',
      sanskrit: 'भजन · कीर्तन',
      description:
        'Evening bhajan circles where ancient melodies, hand percussion and collective voice open the heart to stillness.',
      image: 'assets/images/krishna-flute.jpg',
      duration: 'Daily · 18:30',
      icon: 'music'
    },
    {
      id: 'puja',
      title: 'Radha Krishna Puja',
      sanskrit: 'प्रेम पूजन',
      description:
        'Ritual offerings, flower arrangements and Vedic chants performed with intimacy, devotion and ceremonial grace.',
      image: 'assets/images/radha-krishna-reconciliation.jpg',
      duration: 'Daily · 06:00',
      icon: 'puja'
    },
    {
      id: 'wisdom',
      title: 'Bhagavata Wisdom',
      sanskrit: 'ज्ञान · वार्ता',
      description:
        'Contemplative talks on the Bhagavata Purana and Gita Govinda, translated into living, practical wisdom.',
      image: 'assets/images/gopis-fluting.jpg',
      duration: 'Weekly · 17:00',
      icon: 'wisdom'
    },
    {
      id: 'seva',
      title: 'Seva & Community',
      sanskrit: 'सेवा · करुणा',
      description:
        'Devotion in action through food distribution, temple care and outreach to families in need around Vrindavan.',
      image: 'assets/images/radha-gopis.jpg',
      duration: 'Every day',
      icon: 'seva'
    }
  ];

  readonly festivals: Festival[] = [
    {
      id: 'janmashtami',
      name: 'Janmashtami',
      date: '04 Sep 2027',
      month: 'Bhadrapada',
      place: 'Main Temple Courtyard',
      description:
        'A night of vigils, exquisite decorations and joyous kirtan celebrating the appearance of Lord Krishna.',
      image: 'assets/images/krishna-flute.jpg',
      accent: 'gold'
    },
    {
      id: 'radhashtami',
      name: 'Radhashtami',
      date: '19 Sep 2027',
      month: 'Bhadrapada',
      place: 'Radha Rani Garden',
      description:
        'An intimate celebration of Shri Radha with flower offerings, classical music and a sanctified feast.',
      image: 'assets/images/radha-krishna-hero.jpg',
      accent: 'rose'
    },
    {
      id: 'holi',
      name: 'Phagwah Holi',
      date: '03 Mar 2027',
      month: 'Phalguna',
      place: 'Sacred Grounds',
      description:
        'Colors, music and devotional dance as the community welcomes spring and the play of divine love.',
      image: 'assets/images/holi-festival.jpg',
      accent: 'burgundy'
    },
    {
      id: 'govardhan',
      name: 'Govardhan Puja',
      date: '10 Nov 2027',
      month: 'Kartika',
      place: 'Govardhan Field',
      description:
        'A gratitude ritual honoring nature, abundance and the shelter of the divine with a mountain of offerings.',
      image: 'assets/images/govardhan.jpg',
      accent: 'teal'
    },
    {
      id: 'deepavali',
      name: 'Deepavali',
      date: '08 Nov 2027',
      month: 'Kartika',
      place: 'Temple & Ashram',
      description:
        'Rows of earthen lamps, lakshmi puja and a candlelit kirtan that turns the whole ashram into a galaxy.',
      image: 'assets/images/krishna-fluting-gopis.jpg',
      accent: 'gold'
    }
  ];

  readonly gallery: GalleryItem[] = [
    { id: 'g1', src: 'assets/images/radha-krishna-hero.jpg', title: 'The Divine Pair', category: 'Darshan', alt: 'Artistic painting of Radha and Krishna together', span: 'tall' },
    { id: 'g2', src: 'assets/images/krishna-flute.jpg', title: 'Flute of Vrindavan', category: 'Sacred Art', alt: 'Painting of Krishna playing the flute', span: 'normal' },
    { id: 'g3', src: 'assets/images/holi-festival.jpg', title: 'Festival of Colors', category: 'Festivals', alt: 'Painting of Krishna, Radha and gopis celebrating Holi', span: 'wide' },
    { id: 'g4', src: 'assets/images/govardhan.jpg', title: 'Under Govardhan', category: 'Sacred Art', alt: 'Painting of Radha and Krishna beneath Mount Govardhan', span: 'normal' },
    { id: 'g5', src: 'assets/images/gopis-fluting.jpg', title: 'The Listening Gopis', category: 'Darshan', alt: 'Kangra painting of Krishna fluting for the milkmaids', span: 'tall' },
    { id: 'g6', src: 'assets/images/radha-krishna-reconciliation.jpg', title: 'Reconciliation', category: 'Sacred Art', alt: 'Kangra painting of Radha and Krishna reconciling', span: 'normal' },
    { id: 'g7', src: 'assets/images/radha-gopis.jpg', title: 'Garden of Devotion', category: 'Darshan', alt: 'Painting of Radha with the gopis', span: 'wide' },
    { id: 'g8', src: 'assets/images/krishna-radha-museum.jpg', title: 'Eternal Rasa', category: 'Sacred Art', alt: 'Museum painting of Krishna and Radha', span: 'normal' },
    { id: 'g9', src: 'assets/images/radha-krishna-devotion.jpg', title: 'Notes of Love', category: 'Darshan', alt: 'Painting of Radha and Krishna in devotion', span: 'normal' },
    { id: 'g10', src: 'assets/images/krishna-fluting-gopis.jpg', title: 'The Flute & The Forest', category: 'Festivals', alt: 'Art institute painting of Krishna fluting for the gopis', span: 'wide' },
    { id: 'g11', src: 'assets/images/radha-gopis.jpg', title: 'Serving with Love', category: 'Seva', alt: 'Painting of Radha and the gopis in devoted service', span: 'normal' }
  ];

  readonly testimonials: Testimonial[] = [
    {
      quote:
        'I arrived carrying noise and left with a silence I had never known. The evening kirtan felt like the whole room was breathing as one.',
      name: 'Ananya Sharma',
      location: 'Mumbai, India',
      role: 'Retreat guest'
    },
    {
      quote:
        'The ashram holds devotion and beauty together in a way I have not found anywhere else. Every detail feels intentional and alive.',
      name: 'Rahul Mehta',
      location: 'London, UK',
      role: 'Seva volunteer'
    },
    {
      quote:
        'Our family came for Janmashtami and stayed for the wisdom talks. The children still sing those bhajans at home.',
      name: 'Priya Nair',
      location: 'Dubai, UAE',
      role: 'Festival visitor'
    }
  ];

  readonly rooms: Room[] = [
    {
      id: 'lotus',
      name: 'Lotus Suite',
      category: 'Premium',
      price: 4200,
      capacity: '2 guests',
      size: '38 sq m',
      image: 'assets/images/radha-krishna-reconciliation.jpg',
      description: 'A serene suite with handcrafted teak furniture, a private reading corner and garden-facing windows.',
      features: ['Private balcony', 'Daily prasad', 'Kirtan access', 'Wi-Fi']
    },
    {
      id: 'flute',
      name: 'Flute Room',
      category: 'Deluxe',
      price: 2900,
      capacity: '2 guests',
      size: '26 sq m',
      image: 'assets/images/krishna-flute.jpg',
      description: 'Warm,minimally appointed rooms designed for restful sleep and quiet contemplation after evening prayers.',
      features: ['Courtyard view', 'Daily prasad', 'Yoga mat', 'Wi-Fi']
    },
    {
      id: 'gopi',
      name: 'Gopi House',
      category: 'Shared',
      price: 1500,
      capacity: '4 guests',
      size: '42 sq m',
      image: 'assets/images/radha-gopis.jpg',
      description: 'A convivial shared residence for pilgrims and volunteers, with a common verandah and tea corner.',
      features: ['Shared verandah', 'Locker', 'Community kitchen', 'Wi-Fi']
    }
  ];

  readonly donationTiers: DonationTier[] = [
    {
      id: 'seva',
      title: 'Seva Offering',
      amount: 500,
      description: 'Support a day of temple care, flowers and clean sacred spaces.',
      impact: 'Sustains one full day of seva'
    },
    {
      id: 'meal',
      title: 'Prasad Meal',
      amount: 1200,
      description: 'Provide a nourishing prasad meal for a visiting pilgrim or volunteer.',
      impact: 'Feeds approximately 8 guests'
    },
    {
      id: 'kirtan',
      title: 'Kirtan Patron',
      amount: 5000,
      description: 'Help preserve live devotional music, instruments and weekly gatherings.',
      impact: 'Supports a month of kirtan'
    },
    {
      id: 'legacy',
      title: 'Legacy Gift',
      amount: 25000,
      description: 'Contribute to the long-term restoration and sacred arts archive of the ashram.',
      impact: 'Builds the living heritage fund',
      featured: true
    }
  ];

  readonly stats: StatCard[] = [
    { label: 'Devotees served', value: '48K+', detail: 'Across 26 countries', icon: 'users', tone: 'gold' },
    { label: 'Prasad meals', value: '120K', detail: 'Shared in seva this year', icon: 'heart', tone: 'teal' },
    { label: 'Kirtan gatherings', value: '320', detail: 'Live devotional evenings', icon: 'music', tone: 'rose' },
    { label: 'Guest rooms', value: '24', detail: 'Restful stays in Vrindavan', icon: 'home', tone: 'burgundy' }
  ];

  readonly recentDonations: DonationRecord[] = [
    { id: 'DN-2048', donor: 'Meera Iyer', amount: 5000, purpose: 'Kirtan Patron', date: '24 Nov 2026', status: 'Completed' },
    { id: 'DN-2047', donor: 'Arjun Das', amount: 1200, purpose: 'Prasad Meal', date: '24 Nov 2026', status: 'Completed' },
    { id: 'DN-2046', donor: 'Sneha Kulkarni', amount: 25000, purpose: 'Legacy Gift', date: '23 Nov 2026', status: 'Processing' },
    { id: 'DN-2045', donor: 'Nikhil Rao', amount: 500, purpose: 'Seva Offering', date: '23 Nov 2026', status: 'Completed' },
    { id: 'DN-2044', donor: 'Kavya Menon', amount: 1200, purpose: 'Prasad Meal', date: '22 Nov 2026', status: 'Completed' }
  ];

  readonly recentBookings: BookingRecord[] = [
    { id: 'RB-318', guest: 'The Sharma Family', room: 'Lotus Suite', checkIn: '28 Nov 2026', nights: 3, status: 'Confirmed' },
    { id: 'RB-317', guest: 'Devika Prasad', room: 'Flute Room', checkIn: '27 Nov 2026', nights: 2, status: 'Confirmed' },
    { id: 'RB-316', guest: 'Vikramjit Singh', room: 'Gopi House', checkIn: '26 Nov 2026', nights: 4, status: 'Pending' },
    { id: 'RB-315', guest: 'Rina & Aditya', room: 'Lotus Suite', checkIn: '25 Nov 2026', nights: 2, status: 'Confirmed' }
  ];

  readonly recentActivity: ActivityItem[] = [
    { id: 'a1', title: 'New donation received', detail: 'Meera Iyer contributed to Kirtan Patron', time: '12 min ago', icon: 'gift' },
    { id: 'a2', title: 'Room booking confirmed', detail: 'The Sharma Family · Lotus Suite', time: '1 hour ago', icon: 'calendar' },
    { id: 'a3', title: 'Festival schedule updated', detail: 'Janmashtami kirtan timeline published', time: '3 hours ago', icon: 'sparkle' },
    { id: 'a4', title: 'New volunteer registered', detail: 'Aditi joined the seva team', time: 'Yesterday', icon: 'users' }
  ];

  readonly donationAnalytics = [32, 48, 41, 62, 55, 78, 69, 92, 84, 108, 96, 124];
}

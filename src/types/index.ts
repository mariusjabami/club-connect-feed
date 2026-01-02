export type UserType = 'club' | 'player';

export interface User {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  type: UserType;
  bio?: string;
  createdAt: Date;
}

export interface Club extends User {
  type: 'club';
  location?: string;
  foundedYear?: number;
  stadium?: string;
  colors?: string;
  players: string[]; // player IDs
}

export interface Player extends User {
  type: 'player';
  position?: string;
  age?: number;
  clubId?: string;
  height?: string;
  preferredFoot?: 'left' | 'right' | 'both';
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorUsername: string;
  authorAvatar?: string;
  authorType: UserType;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  createdAt: Date;
}

export interface Event {
  id: string;
  clubId: string;
  clubName: string;
  title: string;
  opponent?: string;
  date: Date;
  location: string;
  type: 'game' | 'training' | 'other';
}

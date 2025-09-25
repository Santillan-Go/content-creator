export interface User {
  id: string;
  name: string;
  username: string;
  bio: string; // Changed from description
  verify: boolean; // Changed from verify
  profilePicture: string;
  coverPhoto: string;

  stats: {
    posts: number;
    videos: number;
    views: number;
  };
  createdAt: {
    _seconds: number;
    _nanoseconds: number;
  };
  // Optional fields that might not always be present
  category?: string;
  followers?: string;
  dataAiHint?: string;
}

// If you need a type for creating users (without id and timestamps)
export interface CreateUserData {
  name: string;
  username: string;
  bio: string;
  verify?: boolean;
  profilePicture: string;
  coverPhoto: string;
  category?: string;
}

// If you need a type for updating users
export interface UpdateUserData {
  name?: string;
  username?: string;
  bio?: string;
  verify?: boolean;
  profilePicture?: string;
  coverPhoto?: string;
  category?: string;
}

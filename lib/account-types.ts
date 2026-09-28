export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  avatar?: string;
  joinedDate: string;
  memberTier: 'Atelier Patron' | 'Client Privilege' | 'Guest';
}

export interface SavedAddress {
  id: string;
  label: 'Home' | 'Work' | 'Atelier Partner' | 'Other';
  fullName: string;
  mobileNumber: string;
  fullAddress: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

export interface HomeTrialRecord {
  id: string;
  referenceNumber: string;
  date: string;
  preferredSlot: string;
  frameIds: string[];
  status: 'Requested' | 'Confirmed' | 'Scheduled' | 'Completed' | 'Cancelled';
  trackingNumber?: string;
  notes?: string;
}

export interface OrderRecord {
  id: string;
  referenceNumber: string;
  date: string;
  productName: string;
  productCode: string;
  colorName: string;
  amount: number;
  lensType: string;
  status: 'Surfacing Optics' | 'Quality Inspection' | 'In Transit' | 'Delivered' | 'Cancelled';
  deliveryAddress?: string;
}

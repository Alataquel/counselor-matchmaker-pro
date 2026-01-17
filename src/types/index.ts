export interface MeetingRequest {
  id: string;
  studentName: string;
  studentEmail: string;
  date: string;
  time: string;
  message: string;
  status: 'pending' | 'accepted' | 'declined';
  counselorId?: string;
}

export interface Counselor {
  id: string;
  name: string;
  email: string;
  specialty: string[];
  officeHours: OfficeHour[];
  activeMeetings: number;
  pendingRequests: number;
}

export interface OfficeHour {
  day: string;
  startTime: string;
  endTime: string;
}

export type LoadStatus = 'low' | 'medium' | 'high';

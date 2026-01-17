import { MeetingRequest, Counselor } from '@/types';

export const mockMeetingRequests: MeetingRequest[] = [
  {
    id: '1',
    studentName: 'Antonio Larrucea',
    studentEmail: 'alarrucea@applylab.edu',
    date: '1/20/2025',
    time: '14:30',
    message: 'I would like to discuss my career options after graduation and get advice on job applications.',
    status: 'pending',
  },
  {
    id: '2',
    studentName: 'Maria Santos',
    studentEmail: 'msantos@applylab.edu',
    date: '1/21/2025',
    time: '10:00',
    message: 'Need guidance on internship opportunities in tech industry.',
    status: 'pending',
  },
  {
    id: '3',
    studentName: 'James Chen',
    studentEmail: 'jchen@applylab.edu',
    date: '1/22/2025',
    time: '15:00',
    message: 'Looking for resume review and interview preparation tips.',
    status: 'pending',
  },
];

export const mockCounselors: Counselor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Williams',
    email: 'swilliams@applylab.edu',
    specialty: ['Career Planning', 'Tech Industry'],
    officeHours: [
      { day: 'Monday', startTime: '09:00', endTime: '12:00' },
      { day: 'Wednesday', startTime: '14:00', endTime: '17:00' },
    ],
    activeMeetings: 5,
    pendingRequests: 2,
  },
  {
    id: '2',
    name: 'Prof. Michael Johnson',
    email: 'mjohnson@applylab.edu',
    specialty: ['Graduate Studies', 'Research'],
    officeHours: [
      { day: 'Tuesday', startTime: '10:00', endTime: '13:00' },
      { day: 'Thursday', startTime: '14:00', endTime: '16:00' },
    ],
    activeMeetings: 3,
    pendingRequests: 1,
  },
];

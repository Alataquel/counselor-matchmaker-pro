import { useState } from 'react';
import { Header } from '@/components/Header';
import { MeetingRequestCard } from '@/components/MeetingRequestCard';
import { CounselorCard } from '@/components/CounselorCard';
import { AddCounselorModal } from '@/components/AddCounselorModal';
import { mockMeetingRequests, mockCounselors } from '@/data/mockData';
import { MeetingRequest, Counselor } from '@/types';
import { useToast } from '@/hooks/use-toast';

export default function Index() {
  const [requests, setRequests] = useState<MeetingRequest[]>(mockMeetingRequests);
  const [counselors, setCounselors] = useState<Counselor[]>(mockCounselors);
  const { toast } = useToast();

  const pendingRequests = requests.filter((r) => r.status === 'pending');

  const handleAccept = (id: string) => {
    setRequests(requests.map((r) =>
      r.id === id ? { ...r, status: 'accepted' as const } : r
    ));
    toast({
      title: 'Meeting Accepted',
      description: 'The student will be notified about the meeting confirmation.',
    });
  };

  const handlePropose = (id: string) => {
    toast({
      title: 'Propose Alternative',
      description: 'Opening alternative time slot selector...',
    });
  };

  const handleDecline = (id: string) => {
    setRequests(requests.map((r) =>
      r.id === id ? { ...r, status: 'declined' as const } : r
    ));
    toast({
      title: 'Meeting Declined',
      description: 'The student will be notified about the decline.',
      variant: 'destructive',
    });
  };

  const handleAddCounselor = (counselorData: Omit<Counselor, 'id' | 'activeMeetings' | 'pendingRequests'>) => {
    const newCounselor: Counselor = {
      ...counselorData,
      id: String(Date.now()),
      activeMeetings: 0,
      pendingRequests: 0,
    };
    setCounselors([...counselors, newCounselor]);
    toast({
      title: 'Counselor Added',
      description: `${counselorData.name} has been registered successfully.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-primary">
            Meeting Requests
          </h1>
          <p className="mt-2 text-muted-foreground">
            Manage student meeting requests and schedule office hours
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Pending Requests Section */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">
                Pending Requests ({pendingRequests.length})
              </h2>
              <AddCounselorModal onAdd={handleAddCounselor} />
            </div>

            <div className="space-y-4">
              {pendingRequests.length > 0 ? (
                pendingRequests.map((request) => (
                  <MeetingRequestCard
                    key={request.id}
                    request={request}
                    onAccept={handleAccept}
                    onPropose={handlePropose}
                    onDecline={handleDecline}
                  />
                ))
              ) : (
                <div className="rounded-lg border border-dashed border-border bg-card p-8 text-center">
                  <p className="text-muted-foreground">No pending meeting requests</p>
                </div>
              )}
            </div>
          </div>

          {/* Counselors Section */}
          <div>
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              Counselor Options ({counselors.length})
            </h2>
            <div className="space-y-4">
              {counselors.map((counselor) => (
                <CounselorCard key={counselor.id} counselor={counselor} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

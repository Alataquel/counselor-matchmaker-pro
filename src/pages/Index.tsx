import { useState } from 'react';
import { Header } from '@/components/Header';
import { MeetingRequestCard } from '@/components/MeetingRequestCard';
import { CounselorCard } from '@/components/CounselorCard';
import { AddCounselorModal } from '@/components/AddCounselorModal';
import { mockMeetingRequests, mockCounselors } from '@/data/mockData';
import { MeetingRequest, Counselor } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Index() {
  const [requests, setRequests] = useState<MeetingRequest[]>(mockMeetingRequests);
  const [counselors, setCounselors] = useState<Counselor[]>(mockCounselors);
  const [selectedCounselorId, setSelectedCounselorId] = useState<string | null>(null);
  const { toast } = useToast();

  const pendingRequests = requests.filter((r) => r.status === 'pending');
  const selectedCounselor = counselors.find((c) => c.id === selectedCounselorId);

  // Get counselor name by ID
  const getCounselorName = (counselorId?: string) => {
    if (!counselorId) return undefined;
    return counselors.find((c) => c.id === counselorId)?.name;
  };

  // Count requests assigned to a counselor
  const getAssignedCount = (counselorId: string) => {
    return pendingRequests.filter((r) => r.counselorId === counselorId).length;
  };

  const handleCounselorClick = (counselorId: string) => {
    if (selectedCounselorId === counselorId) {
      setSelectedCounselorId(null);
    } else {
      setSelectedCounselorId(counselorId);
    }
  };

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
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold text-foreground">
                  Pending Requests ({pendingRequests.length})
                </h2>
                {selectedCounselor && (
                  <div className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                    <span>Showing: {selectedCounselor.name}</span>
                    <button 
                      onClick={() => setSelectedCounselorId(null)}
                      className="hover:text-primary/70"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
              <AddCounselorModal onAdd={handleAddCounselor} />
            </div>

            <div className="space-y-4">
              {pendingRequests.length > 0 ? (
                pendingRequests.map((request) => {
                  const isHighlighted = selectedCounselorId ? request.counselorId === selectedCounselorId : false;
                  const isDimmed = selectedCounselorId ? request.counselorId !== selectedCounselorId : false;
                  
                  return (
                    <MeetingRequestCard
                      key={request.id}
                      request={request}
                      isHighlighted={isHighlighted}
                      isDimmed={isDimmed}
                      counselorName={getCounselorName(request.counselorId)}
                      onAccept={handleAccept}
                      onPropose={handlePropose}
                      onDecline={handleDecline}
                    />
                  );
                })
              ) : (
                <div className="rounded-lg border border-dashed border-border bg-card p-8 text-center">
                  <p className="text-muted-foreground">No pending meeting requests</p>
                </div>
              )}
            </div>
          </div>

          {/* Counselors Section */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">
                Counselor Options ({counselors.length})
              </h2>
              {selectedCounselorId && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedCounselorId(null)}
                  className="text-muted-foreground"
                >
                  Clear selection
                </Button>
              )}
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              Click a counselor to see their assigned requests
            </p>
            <div className="space-y-4">
              {counselors.map((counselor) => (
                <CounselorCard 
                  key={counselor.id} 
                  counselor={counselor}
                  isSelected={selectedCounselorId === counselor.id}
                  assignedCount={getAssignedCount(counselor.id)}
                  onClick={() => handleCounselorClick(counselor.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

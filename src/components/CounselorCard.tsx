import { User, Mail, Calendar, Users, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Counselor, LoadStatus } from '@/types';

interface CounselorCardProps {
  counselor: Counselor;
}

function getLoadStatus(counselor: Counselor): LoadStatus {
  const total = counselor.activeMeetings + counselor.pendingRequests;
  if (total <= 3) return 'low';
  if (total <= 6) return 'medium';
  return 'high';
}

function getLoadBadgeClasses(status: LoadStatus): string {
  switch (status) {
    case 'low':
      return 'border-success bg-success/10 text-success';
    case 'medium':
      return 'border-warning bg-warning/10 text-warning';
    case 'high':
      return 'border-destructive bg-destructive/10 text-destructive';
  }
}

export function CounselorCard({ counselor }: CounselorCardProps) {
  const loadStatus = getLoadStatus(counselor);

  return (
    <Card className="card-shadow animate-fade-in border-border bg-card transition-shadow hover:shadow-md">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            {/* Counselor Info */}
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{counselor.name}</h4>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Mail className="h-3 w-3" />
                  <span>{counselor.email}</span>
                </div>
              </div>
            </div>

            {/* Specialties */}
            <div className="flex flex-wrap gap-1.5">
              {counselor.specialty.map((spec) => (
                <Badge key={spec} variant="secondary" className="text-xs">
                  {spec}
                </Badge>
              ))}
            </div>

            {/* Office Hours */}
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                <Calendar className="h-3 w-3" />
                Office Hours
              </div>
              <div className="flex flex-wrap gap-2">
                {counselor.officeHours.map((oh, idx) => (
                  <span key={idx} className="text-xs text-muted-foreground">
                    {oh.day}: {oh.startTime} - {oh.endTime}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 pt-1">
              <div className="flex items-center gap-1 text-sm">
                <Users className="h-4 w-4 text-success" />
                <span className="font-medium">{counselor.activeMeetings}</span>
                <span className="text-muted-foreground">active</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Clock className="h-4 w-4 text-warning" />
                <span className="font-medium">{counselor.pendingRequests}</span>
                <span className="text-muted-foreground">pending</span>
              </div>
            </div>
          </div>

          {/* Load Status */}
          <Badge 
            variant="outline" 
            className={getLoadBadgeClasses(loadStatus)}
          >
            {loadStatus.charAt(0).toUpperCase() + loadStatus.slice(1)} Load
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

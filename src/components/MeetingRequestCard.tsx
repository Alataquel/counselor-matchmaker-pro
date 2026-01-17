import { User, Mail, Calendar, Clock, CheckCircle, RefreshCw, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MeetingRequest } from '@/types';

interface MeetingRequestCardProps {
  request: MeetingRequest;
  onAccept: (id: string) => void;
  onPropose: (id: string) => void;
  onDecline: (id: string) => void;
}

export function MeetingRequestCard({ request, onAccept, onPropose, onDecline }: MeetingRequestCardProps) {
  return (
    <Card className="card-shadow animate-fade-in border-border bg-card transition-shadow hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            {/* Student Info */}
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-muted-foreground" />
              <a 
                href={`mailto:${request.studentEmail}`}
                className="font-semibold text-primary hover:underline"
              >
                {request.studentName}
              </a>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>{request.studentEmail}</span>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{request.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{request.time}</span>
              </div>
            </div>

            {/* Message */}
            <p className="text-sm italic text-muted-foreground">
              "{request.message}"
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 pt-2">
              <Button
                size="sm"
                className="gap-2 bg-success text-success-foreground hover:bg-success/90"
                onClick={() => onAccept(request.id)}
              >
                <CheckCircle className="h-4 w-4" />
                Accept
              </Button>
              <Button
                size="sm"
                className="gap-2 bg-warning text-warning-foreground hover:bg-warning/90"
                onClick={() => onPropose(request.id)}
              >
                <RefreshCw className="h-4 w-4" />
                Propose Alternative
              </Button>
              <Button
                size="sm"
                className="gap-2 bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={() => onDecline(request.id)}
              >
                <XCircle className="h-4 w-4" />
                Decline
              </Button>
            </div>
          </div>

          {/* Status Badge */}
          <Badge 
            variant="outline" 
            className="border-pending bg-pending/10 text-pending"
          >
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

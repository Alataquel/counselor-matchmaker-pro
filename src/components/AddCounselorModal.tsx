import { useState } from 'react';
import { Plus, X, Clock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Counselor, OfficeHour } from '@/types';

const SPECIALTIES = [
  'Career Planning',
  'Tech Industry',
  'Graduate Studies',
  'Research',
  'Internships',
  'Resume Review',
  'Interview Prep',
  'Academic Advising',
];

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

interface AddCounselorModalProps {
  onAdd: (counselor: Omit<Counselor, 'id' | 'activeMeetings' | 'pendingRequests'>) => void;
}

export function AddCounselorModal({ onAdd }: AddCounselorModalProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [officeHours, setOfficeHours] = useState<OfficeHour[]>([]);
  
  // Office hour form state
  const [ohDay, setOhDay] = useState('');
  const [ohStart, setOhStart] = useState('');
  const [ohEnd, setOhEnd] = useState('');

  const handleAddSpecialty = (specialty: string) => {
    if (!selectedSpecialties.includes(specialty)) {
      setSelectedSpecialties([...selectedSpecialties, specialty]);
    }
  };

  const handleRemoveSpecialty = (specialty: string) => {
    setSelectedSpecialties(selectedSpecialties.filter((s) => s !== specialty));
  };

  const handleAddOfficeHour = () => {
    if (ohDay && ohStart && ohEnd) {
      setOfficeHours([...officeHours, { day: ohDay, startTime: ohStart, endTime: ohEnd }]);
      setOhDay('');
      setOhStart('');
      setOhEnd('');
    }
  };

  const handleRemoveOfficeHour = (index: number) => {
    setOfficeHours(officeHours.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (name && email && selectedSpecialties.length > 0) {
      onAdd({
        name,
        email,
        specialty: selectedSpecialties,
        officeHours,
      });
      // Reset form
      setName('');
      setEmail('');
      setSelectedSpecialties([]);
      setOfficeHours([]);
      setOpen(false);
    }
  };

  const isValid = name && email && selectedSpecialties.length > 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Counselor
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Register New Counselor</DialogTitle>
          <DialogDescription>
            Add a new counselor to the system. They will appear in the counselor options.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Dr. Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="jdoe@applylab.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Specialties */}
          <div className="space-y-2">
            <Label>Specialties</Label>
            <Select onValueChange={handleAddSpecialty}>
              <SelectTrigger>
                <SelectValue placeholder="Select specialties" />
              </SelectTrigger>
              <SelectContent>
                {SPECIALTIES.filter((s) => !selectedSpecialties.includes(s)).map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedSpecialties.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {selectedSpecialties.map((specialty) => (
                  <Badge key={specialty} variant="secondary" className="gap-1">
                    {specialty}
                    <button
                      onClick={() => handleRemoveSpecialty(specialty)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Office Hours */}
          <div className="space-y-3">
            <Label>Office Hours</Label>
            <div className="flex gap-2">
              <Select value={ohDay} onValueChange={setOhDay}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Day" />
                </SelectTrigger>
                <SelectContent>
                  {DAYS.map((day) => (
                    <SelectItem key={day} value={day}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="time"
                value={ohStart}
                onChange={(e) => setOhStart(e.target.value)}
                className="w-[110px]"
              />
              <span className="flex items-center text-muted-foreground">to</span>
              <Input
                type="time"
                value={ohEnd}
                onChange={(e) => setOhEnd(e.target.value)}
                className="w-[110px]"
              />
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={handleAddOfficeHour}
                disabled={!ohDay || !ohStart || !ohEnd}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {officeHours.length > 0 && (
              <div className="space-y-2 pt-2">
                {officeHours.map((oh, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-md bg-muted px-3 py-2 text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {oh.day}: {oh.startTime} - {oh.endTime}
                      </span>
                    </div>
                    <button
                      onClick={() => handleRemoveOfficeHour(idx)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!isValid}>
            Register Counselor
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

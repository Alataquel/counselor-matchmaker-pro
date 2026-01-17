import { ChevronDown, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { label: 'Dashboard', href: '#', active: false },
  { label: 'Students', href: '#', active: false },
  { label: 'Analytics', href: '#', hasDropdown: true, active: false },
  { label: 'Job Postings', href: '#', active: false },
  { label: 'Meetings', href: '#', active: true, badge: 1 },
];

export function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground">
            <span className="text-xl font-bold text-card">a</span>
          </div>
          <span className="text-lg font-semibold text-foreground">University Portal</span>
        </div>

        {/* Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                item.active
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.label}
              {item.hasDropdown && <ChevronDown className="ml-1 h-4 w-4" />}
              {item.badge && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs font-medium text-destructive-foreground">
                  {item.badge}
                </span>
              )}
            </Button>
          ))}
        </nav>

        {/* Language Selector */}
        <Button variant="outline" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          English
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}

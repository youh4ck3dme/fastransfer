import React from 'react';

interface IconProps {
  className?: string;
}

export const PlaneIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="planeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.7" />
      </linearGradient>
      <filter id="planeGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="0.5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <path 
      d="M21.5 15L14 8.5V4C14 2.9 13.1 2 12 2C10.9 2 10 2.9 10 4V8.5L2.5 15L4 16.5L10 14V19L8 20.5V22L12 21L16 22V20.5L14 19V14L20 16.5L21.5 15Z" 
      fill="url(#planeGradient)"
      filter="url(#planeGlow)"
    />
    <path 
      d="M21.5 15L14 8.5V4C14 2.9 13.1 2 12 2C10.9 2 10 2.9 10 4V8.5L2.5 15L4 16.5L10 14V19L8 20.5V22L12 21L16 22V20.5L14 19V14L20 16.5L21.5 15Z" 
      stroke="currentColor" 
      strokeWidth="0.5" 
      strokeOpacity="0.6"
      fill="none"
    />
    <path d="M10.5 9L5 13.5" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" strokeLinecap="round"/>
    <path d="M13.5 9L19 13.5" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" strokeLinecap="round"/>
    <ellipse cx="12" cy="4" rx="1.2" ry="0.8" fill="currentColor" fillOpacity="0.4"/>
    <ellipse cx="12" cy="3.8" rx="0.6" ry="0.4" fill="currentColor" fillOpacity="0.2"/>
    <path d="M11 20L12 21L13 20" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" strokeLinecap="round"/>
    <circle cx="12" cy="5.5" r="0.4" fill="currentColor" fillOpacity="0.25"/>
    <path d="M6 14.5L8 13.5" stroke="currentColor" strokeWidth="0.3" strokeOpacity="0.2" strokeLinecap="round"/>
    <path d="M18 14.5L16 13.5" stroke="currentColor" strokeWidth="0.3" strokeOpacity="0.2" strokeLinecap="round"/>
    <path d="M12 6V12" stroke="currentColor" strokeWidth="0.4" strokeOpacity="0.15" strokeLinecap="round"/>
    {/* Enhanced details +50% */}
    <circle cx="11" cy="7" r="0.3" fill="currentColor" fillOpacity="0.2"/>
    <circle cx="13" cy="7" r="0.3" fill="currentColor" fillOpacity="0.2"/>
    <circle cx="11" cy="9" r="0.25" fill="currentColor" fillOpacity="0.15"/>
    <circle cx="13" cy="9" r="0.25" fill="currentColor" fillOpacity="0.15"/>
    <path d="M9.5 12L10.5 13" stroke="currentColor" strokeWidth="0.25" strokeOpacity="0.15" strokeLinecap="round"/>
    <path d="M14.5 12L13.5 13" stroke="currentColor" strokeWidth="0.25" strokeOpacity="0.15" strokeLinecap="round"/>
    <ellipse cx="6" cy="14" rx="0.4" ry="0.2" fill="currentColor" fillOpacity="0.1"/>
    <ellipse cx="18" cy="14" rx="0.4" ry="0.2" fill="currentColor" fillOpacity="0.1"/>
    <path d="M10 18.5L12 19.5L14 18.5" stroke="currentColor" strokeWidth="0.3" strokeOpacity="0.1" strokeLinecap="round"/>
  </svg>
);

export const BuildingIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="buildingGradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.6" />
      </linearGradient>
      <filter id="buildingGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="0.4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <path d="M3 21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path 
      d="M5 21V7L12 3L19 7V21" 
      fill="url(#buildingGradient)"
      fillOpacity="0.15"
      filter="url(#buildingGlow)"
    />
    <path 
      d="M5 21V7L12 3L19 7V21" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path d="M9 21V17H15V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="8" y="9" width="2.5" height="2.5" rx="0.5" fill="url(#buildingGradient)"/>
    <rect x="13.5" y="9" width="2.5" height="2.5" rx="0.5" fill="url(#buildingGradient)"/>
    <rect x="8" y="13" width="2.5" height="2.5" rx="0.5" fill="url(#buildingGradient)"/>
    <rect x="13.5" y="13" width="2.5" height="2.5" rx="0.5" fill="url(#buildingGradient)"/>
    <circle cx="12" cy="5.5" r="1.2" fill="currentColor" fillOpacity="0.5"/>
    <circle cx="12" cy="5.3" r="0.5" fill="currentColor" fillOpacity="0.3"/>
    <path d="M7 7L12 4L17 7" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" strokeLinecap="round"/>
    <rect x="8.3" y="9.3" width="0.8" height="0.8" rx="0.2" fill="currentColor" fillOpacity="0.3"/>
    <rect x="13.8" y="9.3" width="0.8" height="0.8" rx="0.2" fill="currentColor" fillOpacity="0.3"/>
    {/* Enhanced details +50% */}
    <rect x="8.3" y="13.3" width="0.8" height="0.8" rx="0.2" fill="currentColor" fillOpacity="0.25"/>
    <rect x="13.8" y="13.3" width="0.8" height="0.8" rx="0.2" fill="currentColor" fillOpacity="0.25"/>
    <path d="M10 18H14" stroke="currentColor" strokeWidth="0.3" strokeOpacity="0.2" strokeLinecap="round"/>
    <circle cx="12" cy="18.5" r="0.4" fill="currentColor" fillOpacity="0.2"/>
    <path d="M6 10H7" stroke="currentColor" strokeWidth="0.3" strokeOpacity="0.15" strokeLinecap="round"/>
    <path d="M17 10H18" stroke="currentColor" strokeWidth="0.3" strokeOpacity="0.15" strokeLinecap="round"/>
    <path d="M6 14H7" stroke="currentColor" strokeWidth="0.3" strokeOpacity="0.15" strokeLinecap="round"/>
    <path d="M17 14H18" stroke="currentColor" strokeWidth="0.3" strokeOpacity="0.15" strokeLinecap="round"/>
    <ellipse cx="12" cy="3.5" rx="0.8" ry="0.3" fill="currentColor" fillOpacity="0.15"/>
  </svg>
);

export const GroupIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="groupGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.65" />
      </linearGradient>
      <filter id="groupGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="0.4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <circle cx="12" cy="7" r="3" fill="url(#groupGradient)" fillOpacity="0.2" filter="url(#groupGlow)"/>
    <circle cx="12" cy="7" r="3" stroke="currentColor" strokeWidth="2"/>
    <path 
      d="M5 21V19C5 16.7909 6.79086 15 9 15H15C17.2091 15 19 16.7909 19 19V21" 
      fill="url(#groupGradient)"
      fillOpacity="0.1"
    />
    <path 
      d="M5 21V19C5 16.7909 6.79086 15 9 15H15C17.2091 15 19 16.7909 19 19V21" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <circle cx="5" cy="9" r="2" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7"/>
    <circle cx="5" cy="9" r="2" fill="currentColor" fillOpacity="0.1"/>
    <path d="M3 21V20C3 18.3431 4.34315 17 6 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7"/>
    <circle cx="19" cy="9" r="2" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7"/>
    <circle cx="19" cy="9" r="2" fill="currentColor" fillOpacity="0.1"/>
    <path d="M21 21V20C21 18.3431 19.6569 17 18 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7"/>
    <circle cx="12" cy="6.5" r="0.8" fill="currentColor" fillOpacity="0.25"/>
    <path d="M10 7.5C10 7.5 11 8.5 12 8.5C13 8.5 14 7.5 14 7.5" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" strokeLinecap="round"/>
    {/* Enhanced details +50% */}
    <circle cx="10.5" cy="6" r="0.35" fill="currentColor" fillOpacity="0.2"/>
    <circle cx="13.5" cy="6" r="0.35" fill="currentColor" fillOpacity="0.2"/>
    <circle cx="5" cy="8.5" r="0.4" fill="currentColor" fillOpacity="0.2"/>
    <circle cx="19" cy="8.5" r="0.4" fill="currentColor" fillOpacity="0.2"/>
    <path d="M8 17L9.5 16" stroke="currentColor" strokeWidth="0.25" strokeOpacity="0.15" strokeLinecap="round"/>
    <path d="M16 17L14.5 16" stroke="currentColor" strokeWidth="0.25" strokeOpacity="0.15" strokeLinecap="round"/>
    <ellipse cx="12" cy="19" rx="2" ry="0.4" fill="currentColor" fillOpacity="0.08"/>
    <path d="M7 19H8" stroke="currentColor" strokeWidth="0.3" strokeOpacity="0.1" strokeLinecap="round"/>
    <path d="M16 19H17" stroke="currentColor" strokeWidth="0.3" strokeOpacity="0.1" strokeLinecap="round"/>
  </svg>
);

export const CalendarIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="calendarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.6" />
      </linearGradient>
      <filter id="calendarGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="0.4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <rect x="3" y="4" width="18" height="18" rx="2" fill="url(#calendarGradient)" fillOpacity="0.1" filter="url(#calendarGlow)"/>
    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M3 10H21" stroke="currentColor" strokeWidth="2"/>
    <rect x="3" y="4" width="18" height="6" rx="2" fill="url(#calendarGradient)" fillOpacity="0.15"/>
    <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="8" cy="14" r="1.5" fill="url(#calendarGradient)"/>
    <circle cx="12" cy="14" r="1.5" fill="url(#calendarGradient)"/>
    <circle cx="16" cy="14" r="1.5" fill="currentColor" fillOpacity="0.5"/>
    <circle cx="8" cy="18" r="1.5" fill="currentColor" fillOpacity="0.5"/>
    <circle cx="12" cy="18" r="1.5" fill="currentColor" fillOpacity="0.5"/>
    <circle cx="8" cy="14" r="0.5" fill="currentColor" fillOpacity="0.3"/>
    <circle cx="12" cy="14" r="0.5" fill="currentColor" fillOpacity="0.3"/>
    <path d="M7 7H17" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2"/>
    {/* Enhanced details +50% */}
    <circle cx="16" cy="14" r="0.4" fill="currentColor" fillOpacity="0.2"/>
    <circle cx="8" cy="18" r="0.4" fill="currentColor" fillOpacity="0.2"/>
    <circle cx="12" cy="18" r="0.4" fill="currentColor" fillOpacity="0.2"/>
    <circle cx="16" cy="18" r="1" fill="currentColor" fillOpacity="0.15"/>
    <path d="M5 12H6" stroke="currentColor" strokeWidth="0.3" strokeOpacity="0.15" strokeLinecap="round"/>
    <path d="M18 12H19" stroke="currentColor" strokeWidth="0.3" strokeOpacity="0.15" strokeLinecap="round"/>
    <path d="M5 16H6" stroke="currentColor" strokeWidth="0.3" strokeOpacity="0.12" strokeLinecap="round"/>
    <path d="M18 16H19" stroke="currentColor" strokeWidth="0.3" strokeOpacity="0.12" strokeLinecap="round"/>
    <ellipse cx="8" cy="3" rx="0.5" ry="0.8" fill="currentColor" fillOpacity="0.15"/>
    <ellipse cx="16" cy="3" rx="0.5" ry="0.8" fill="currentColor" fillOpacity="0.15"/>
  </svg>
);

export const ShieldIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.6" />
      </linearGradient>
      <filter id="shieldGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="0.5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <path 
      d="M12 2L4 6V12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12V6L12 2Z" 
      fill="url(#shieldGradient)"
      fillOpacity="0.2"
      filter="url(#shieldGlow)"
    />
    <path 
      d="M12 2L4 6V12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12V6L12 2Z" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinejoin="round"
    />
    <path 
      d="M12 2L4 6V12C4 16.4183 7.58172 20 12 20" 
      fill="url(#shieldGradient)" 
      fillOpacity="0.15"
    />
    <path d="M9 11L11 13L15 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="5.5" r="1.2" fill="currentColor" fillOpacity="0.4"/>
    <circle cx="12" cy="5.3" r="0.5" fill="currentColor" fillOpacity="0.2"/>
    <path d="M6 7.5L12 4.5L18 7.5" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.25" strokeLinecap="round"/>
    <path d="M8 10L11 13" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2" strokeLinecap="round"/>
    {/* Enhanced details +50% */}
    <path d="M13 12L15 10" stroke="currentColor" strokeWidth="0.4" strokeOpacity="0.15" strokeLinecap="round"/>
    <circle cx="11" cy="12" r="0.4" fill="currentColor" fillOpacity="0.15"/>
    <path d="M6 10V14" stroke="currentColor" strokeWidth="0.3" strokeOpacity="0.1" strokeLinecap="round"/>
    <path d="M18 10V14" stroke="currentColor" strokeWidth="0.3" strokeOpacity="0.1" strokeLinecap="round"/>
    <ellipse cx="12" cy="17" rx="2" ry="0.5" fill="currentColor" fillOpacity="0.08"/>
    <path d="M8 16C9 17 10.5 18 12 18" stroke="currentColor" strokeWidth="0.25" strokeOpacity="0.1" strokeLinecap="round"/>
    <path d="M16 16C15 17 13.5 18 12 18" stroke="currentColor" strokeWidth="0.25" strokeOpacity="0.1" strokeLinecap="round"/>
    <circle cx="12" cy="11" r="0.3" fill="currentColor" fillOpacity="0.1"/>
  </svg>
);

export const ClockIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="clockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.65" />
      </linearGradient>
      <filter id="clockGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="0.4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <circle cx="12" cy="12" r="9" fill="url(#clockGradient)" fillOpacity="0.1" filter="url(#clockGlow)"/>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="2" fill="url(#clockGradient)"/>
    <circle cx="12" cy="12" r="0.8" fill="currentColor" fillOpacity="0.4"/>
    <circle cx="12" cy="4" r="0.7" fill="currentColor" fillOpacity="0.6"/>
    <circle cx="12" cy="20" r="0.7" fill="currentColor" fillOpacity="0.6"/>
    <circle cx="4" cy="12" r="0.7" fill="currentColor" fillOpacity="0.6"/>
    <circle cx="20" cy="12" r="0.7" fill="currentColor" fillOpacity="0.6"/>
    <circle cx="7" cy="5.5" r="0.4" fill="currentColor" fillOpacity="0.3"/>
    <circle cx="17" cy="5.5" r="0.4" fill="currentColor" fillOpacity="0.3"/>
    <circle cx="7" cy="18.5" r="0.4" fill="currentColor" fillOpacity="0.3"/>
    <circle cx="17" cy="18.5" r="0.4" fill="currentColor" fillOpacity="0.3"/>
    <path d="M12 7V6" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" strokeLinecap="round"/>
    {/* Enhanced details +50% */}
    <circle cx="5.5" cy="7" r="0.35" fill="currentColor" fillOpacity="0.25"/>
    <circle cx="18.5" cy="7" r="0.35" fill="currentColor" fillOpacity="0.25"/>
    <circle cx="5.5" cy="17" r="0.35" fill="currentColor" fillOpacity="0.25"/>
    <circle cx="18.5" cy="17" r="0.35" fill="currentColor" fillOpacity="0.25"/>
    <path d="M14 13L15.5 13.8" stroke="currentColor" strokeWidth="0.3" strokeOpacity="0.15" strokeLinecap="round"/>
    <path d="M12 9V10" stroke="currentColor" strokeWidth="0.35" strokeOpacity="0.12" strokeLinecap="round"/>
    <ellipse cx="12" cy="12" rx="6" ry="0.3" fill="currentColor" fillOpacity="0.04"/>
    <path d="M6 12H7" stroke="currentColor" strokeWidth="0.3" strokeOpacity="0.1" strokeLinecap="round"/>
    <path d="M17 12H18" stroke="currentColor" strokeWidth="0.3" strokeOpacity="0.1" strokeLinecap="round"/>
  </svg>
);

export const PhoneIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="phoneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.65" />
      </linearGradient>
      <filter id="phoneGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="0.4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <path 
      d="M22 16.92V19.92C22 20.4704 21.5204 20.92 20.97 20.88C18.4489 20.6598 16.0233 19.9301 13.82 18.75C11.7727 17.6728 9.97722 15.8773 8.9 13.83C7.71994 11.6267 6.99024 9.20107 6.77 6.68C6.73 6.12956 7.17956 5.65 7.73 5.65H10.73C11.1918 5.64536 11.5844 5.98507 11.65 6.44C11.7535 7.18371 11.9377 7.91412 12.2 8.62C12.3497 9.01441 12.2491 9.45923 11.94 9.75L10.68 11.01C11.6623 12.6625 13.0375 14.0377 14.69 15.02L15.95 13.76C16.2408 13.4509 16.6856 13.3503 17.08 13.5C17.7859 13.7623 18.5163 13.9465 19.26 14.05C19.7149 14.1156 20.0546 14.5082 20.05 14.97L22 16.92Z" 
      fill="url(#phoneGradient)"
      fillOpacity="0.15"
      filter="url(#phoneGlow)"
    />
    <path 
      d="M22 16.92V19.92C22 20.4704 21.5204 20.92 20.97 20.88C18.4489 20.6598 16.0233 19.9301 13.82 18.75C11.7727 17.6728 9.97722 15.8773 8.9 13.83C7.71994 11.6267 6.99024 9.20107 6.77 6.68C6.73 6.12956 7.17956 5.65 7.73 5.65H10.73C11.1918 5.64536 11.5844 5.98507 11.65 6.44C11.7535 7.18371 11.9377 7.91412 12.2 8.62C12.3497 9.01441 12.2491 9.45923 11.94 9.75L10.68 11.01C11.6623 12.6625 13.0375 14.0377 14.69 15.02L15.95 13.76C16.2408 13.4509 16.6856 13.3503 17.08 13.5C17.7859 13.7623 18.5163 13.9465 19.26 14.05C19.7149 14.1156 20.0546 14.5082 20.05 14.97L22 16.92Z" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M15 4H19V8" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      strokeOpacity="0.6"
    />
    <path 
      d="M19 4L15 8" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round"
      strokeOpacity="0.6"
    />
    <circle cx="17" cy="6" r="0.8" fill="currentColor" fillOpacity="0.3"/>
    <circle cx="9" cy="8" r="0.5" fill="currentColor" fillOpacity="0.25"/>
    <circle cx="18" cy="17" r="0.5" fill="currentColor" fillOpacity="0.25"/>
  </svg>
);

export const MailIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="mailGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.65" />
      </linearGradient>
      <filter id="mailGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="0.4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <rect x="2" y="4" width="20" height="16" rx="2" fill="url(#mailGradient)" fillOpacity="0.1" filter="url(#mailGlow)"/>
    <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M2 7L12 13L22 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 7L12 13L22 7" fill="url(#mailGradient)" fillOpacity="0.15"/>
    <circle cx="18" cy="8" r="1.2" fill="currentColor" fillOpacity="0.4"/>
    <circle cx="6" cy="8" r="1.2" fill="currentColor" fillOpacity="0.4"/>
    <circle cx="12" cy="11" r="0.8" fill="currentColor" fillOpacity="0.3"/>
    <path d="M5 17L9 13" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2" strokeLinecap="round"/>
    <path d="M19 17L15 13" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2" strokeLinecap="round"/>
  </svg>
);

export const LocationIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="locationGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.6" />
      </linearGradient>
      <filter id="locationGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="0.5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <path 
      d="M12 2C8.13401 2 5 5.13401 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13401 15.866 2 12 2Z" 
      fill="url(#locationGradient)"
      fillOpacity="0.2"
      filter="url(#locationGlow)"
    />
    <path 
      d="M12 2C8.13401 2 5 5.13401 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13401 15.866 2 12 2Z" 
      stroke="currentColor" 
      strokeWidth="2"
    />
    <path 
      d="M12 2C8.13401 2 5 5.13401 5 9C5 14.25 12 22 12 22" 
      fill="url(#locationGradient)" 
      fillOpacity="0.15"
    />
    <circle cx="12" cy="9" r="3" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="9" r="3" fill="url(#locationGradient)" fillOpacity="0.2"/>
    <circle cx="12" cy="9" r="1.5" fill="url(#locationGradient)"/>
    <circle cx="12" cy="8.5" r="0.5" fill="currentColor" fillOpacity="0.4"/>
    <path d="M12 16L12 18" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" strokeLinecap="round"/>
    <circle cx="12" cy="19" r="0.5" fill="currentColor" fillOpacity="0.2"/>
  </svg>
);

export const MessageIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="messageGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.65" />
      </linearGradient>
      <filter id="messageGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="0.4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <path 
      d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 20.0001 12.5 20C11.1801 20.0034 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C3.99991 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.9C9.87812 3.30493 11.1801 2.99656 12.5 3H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" 
      fill="url(#messageGradient)"
      fillOpacity="0.15"
      filter="url(#messageGlow)"
    />
    <path 
      d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 20.0001 12.5 20C11.1801 20.0034 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C3.99991 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.9C9.87812 3.30493 11.1801 2.99656 12.5 3H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <circle cx="8" cy="11" r="1.2" fill="url(#messageGradient)"/>
    <circle cx="12" cy="11" r="1.2" fill="url(#messageGradient)"/>
    <circle cx="16" cy="11" r="1.2" fill="url(#messageGradient)"/>
    <circle cx="8" cy="10.7" r="0.4" fill="currentColor" fillOpacity="0.3"/>
    <circle cx="12" cy="10.7" r="0.4" fill="currentColor" fillOpacity="0.3"/>
    <circle cx="16" cy="10.7" r="0.4" fill="currentColor" fillOpacity="0.3"/>
    <path d="M4 19L6 15" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.25" strokeLinecap="round"/>
  </svg>
);

export const UsersIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="usersGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.65" />
      </linearGradient>
      <filter id="usersGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="0.4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <circle cx="9" cy="7" r="3" fill="url(#usersGradient)" fillOpacity="0.2" filter="url(#usersGlow)"/>
    <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="2"/>
    <path 
      d="M2 21V19C2 16.7909 3.79086 15 6 15H12C14.2091 15 16 16.7909 16 19V21" 
      fill="url(#usersGradient)"
      fillOpacity="0.1"
    />
    <path 
      d="M2 21V19C2 16.7909 3.79086 15 6 15H12C14.2091 15 16 16.7909 16 19V21" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <circle cx="17" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7"/>
    <circle cx="17" cy="7" r="2.5" fill="currentColor" fillOpacity="0.1"/>
    <path 
      d="M17 15C19.2091 15 21 16.7909 21 19V21" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round"
      strokeOpacity="0.7"
    />
    <circle cx="9" cy="6.5" r="0.8" fill="currentColor" fillOpacity="0.3"/>
    <circle cx="17" cy="6.5" r="0.5" fill="currentColor" fillOpacity="0.25"/>
  </svg>
);

export const BriefcaseIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="briefcaseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.65" />
      </linearGradient>
      <filter id="briefcaseGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="0.4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <rect x="2" y="7" width="20" height="14" rx="2" fill="url(#briefcaseGradient)" fillOpacity="0.1" filter="url(#briefcaseGlow)"/>
    <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7" stroke="currentColor" strokeWidth="2"/>
    <path d="M2 12H22" stroke="currentColor" strokeWidth="2"/>
    <rect x="2" y="7" width="20" height="5" rx="1" fill="url(#briefcaseGradient)" fillOpacity="0.15"/>
    <rect x="10" y="10" width="4" height="4" rx="1" fill="url(#briefcaseGradient)"/>
    <circle cx="12" cy="12" r="0.8" fill="currentColor" fillOpacity="0.4"/>
    <path d="M10 5H14" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" strokeLinecap="round"/>
  </svg>
);

export const WifiIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="wifiGradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.5" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
      </linearGradient>
      <filter id="wifiGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="0.5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <path d="M5 12.55C7.04 10.51 9.33 9.5 12 9.5C14.67 9.5 16.96 10.51 19 12.55" stroke="url(#wifiGradient)" strokeWidth="2" strokeLinecap="round" filter="url(#wifiGlow)"/>
    <path d="M1.42 9C4.34 6.08 7.94 4.5 12 4.5C16.06 4.5 19.66 6.08 22.58 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5"/>
    <path d="M8.53 16.11C9.46 15.18 10.64 14.71 12 14.71C13.36 14.71 14.54 15.18 15.47 16.11" stroke="url(#wifiGradient)" strokeWidth="2" strokeLinecap="round" filter="url(#wifiGlow)"/>
    <circle cx="12" cy="19.5" r="1.8" fill="url(#wifiGradient)" filter="url(#wifiGlow)"/>
    <circle cx="12" cy="19.3" r="0.6" fill="currentColor" fillOpacity="0.4"/>
  </svg>
);

export const WineIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="wineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.65" />
      </linearGradient>
      <filter id="wineGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="0.4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <path d="M8 2L8 5C8 8.31371 10.6863 11 14 11H16C19.3137 11 22 8.31371 22 5V2" fill="url(#wineGradient)" fillOpacity="0.15" filter="url(#wineGlow)"/>
    <path d="M8 2L8 5C8 8.31371 10.6863 11 14 11H16C19.3137 11 22 8.31371 22 5V2" stroke="currentColor" strokeWidth="2"/>
    <path d="M8 2H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M15 11V18" stroke="currentColor" strokeWidth="2"/>
    <path d="M10 22H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M15 18V22" stroke="currentColor" strokeWidth="2"/>
    <path d="M11 5C11 7 13 9 15 9C17 9 19 7 19 5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5"/>
    <circle cx="15" cy="6" r="1" fill="currentColor" fillOpacity="0.4"/>
    <circle cx="5" cy="17" r="3" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5"/>
    <circle cx="5" cy="17" r="3" fill="currentColor" fillOpacity="0.1"/>
    <path d="M5 20V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5"/>
    <circle cx="5" cy="17" r="0.8" fill="currentColor" fillOpacity="0.3"/>
  </svg>
);

export const CarIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="carGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.65" />
      </linearGradient>
      <filter id="carGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="0.4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <path 
      d="M5 17H4C3.44772 17 3 16.5523 3 16V12C3 11.4477 3.44772 11 4 11L5.68377 11C5.88904 11 6.08523 10.919 6.22855 10.7757L8.05573 8.94853C8.62135 8.38291 9.38922 8.06615 10.1895 8.06615H14.3137C15.2388 8.06615 16.1173 8.47627 16.7175 9.19058L18.6946 11.5441C18.8903 11.777 19.1855 11.9096 19.4966 11.9096H20C20.5523 11.9096 21 12.3573 21 12.9096V16C21 16.5523 20.5523 17 20 17H19" 
      fill="url(#carGradient)"
      fillOpacity="0.15"
      filter="url(#carGlow)"
    />
    <path 
      d="M5 17H4C3.44772 17 3 16.5523 3 16V12C3 11.4477 3.44772 11 4 11L5.68377 11C5.88904 11 6.08523 10.919 6.22855 10.7757L8.05573 8.94853C8.62135 8.38291 9.38922 8.06615 10.1895 8.06615H14.3137C15.2388 8.06615 16.1173 8.47627 16.7175 9.19058L18.6946 11.5441C18.8903 11.777 19.1855 11.9096 19.4966 11.9096H20C20.5523 11.9096 21 12.3573 21 12.9096V16C21 16.5523 20.5523 17 20 17H19" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <circle cx="7" cy="17" r="2" stroke="currentColor" strokeWidth="2"/>
    <circle cx="7" cy="17" r="2" fill="url(#carGradient)" fillOpacity="0.2"/>
    <circle cx="17" cy="17" r="2" stroke="currentColor" strokeWidth="2"/>
    <circle cx="17" cy="17" r="2" fill="url(#carGradient)" fillOpacity="0.2"/>
    <path d="M9 17H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M10 11V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5"/>
    <path d="M13 11V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5"/>
    <circle cx="7" cy="17" r="0.6" fill="currentColor" fillOpacity="0.4"/>
    <circle cx="17" cy="17" r="0.6" fill="currentColor" fillOpacity="0.4"/>
    <circle cx="5" cy="13" r="0.5" fill="currentColor" fillOpacity="0.4"/>
    <circle cx="19" cy="13" r="0.5" fill="currentColor" fillOpacity="0.4"/>
  </svg>
);

export const StarIcon: React.FC<IconProps & { filled?: boolean }> = ({ className, filled = false }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" />
        <stop offset="50%" stopColor="currentColor" stopOpacity="0.85" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.7" />
      </linearGradient>
      <filter id="starGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="0.8" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <path 
      d="M12 2L14.09 8.26L20.18 9.27L15.54 13.14L16.81 19.02L12 16.27L7.19 19.02L8.46 13.14L3.82 9.27L9.91 8.26L12 2Z" 
      fill={filled ? "url(#starGradient)" : "currentColor"}
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      filter={filled ? "url(#starGlow)" : undefined}
    />
    {filled && (
      <>
        <path 
          d="M12 4L13.5 8.5L18 9.2L14.5 12L15.5 16.5L12 14.5L8.5 16.5L9.5 12L6 9.2L10.5 8.5L12 4Z" 
          fill="currentColor"
          opacity="0.3"
        />
        <circle cx="12" cy="9" r="1.2" fill="white" opacity="0.5" />
        <circle cx="10" cy="10" r="0.4" fill="white" opacity="0.3" />
      </>
    )}
  </svg>
);

export const QuoteIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="quoteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
        <stop offset="50%" stopColor="currentColor" stopOpacity="0.6" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
      </linearGradient>
      <filter id="quoteGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="1" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <path 
      d="M8 32C8 22 14 14 26 14V20C20 20 16 24 16 30H24V46H8V32Z" 
      fill="url(#quoteGradient)"
      filter="url(#quoteGlow)"
    />
    <path 
      d="M8 32C8 22 14 14 26 14V20C20 20 16 24 16 30H24V46H8V32Z" 
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <path 
      d="M34 32C34 22 40 14 52 14V20C46 20 42 24 42 30H50V46H34V32Z" 
      fill="url(#quoteGradient)"
      filter="url(#quoteGlow)"
    />
    <path 
      d="M34 32C34 22 40 14 52 14V20C46 20 42 24 42 30H50V46H34V32Z" 
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <circle cx="12" cy="38" r="2" fill="currentColor" opacity="0.5" />
    <circle cx="38" cy="38" r="2" fill="currentColor" opacity="0.5" />
    <circle cx="12" cy="37.5" r="0.6" fill="currentColor" opacity="0.3" />
    <circle cx="38" cy="37.5" r="0.6" fill="currentColor" opacity="0.3" />
    <path d="M4 50H28" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <path d="M36 50H60" stroke="currentColor" strokeWidth="1" opacity="0.3" />
  </svg>
);

export const ArrowRightIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.6" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
      </linearGradient>
      <filter id="arrowGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="0.3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <path d="M5 12H19" stroke="url(#arrowGradient)" strokeWidth="2" strokeLinecap="round" filter="url(#arrowGlow)"/>
    <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="19" cy="12" r="2.5" fill="currentColor" fillOpacity="0.4"/>
    <circle cx="19" cy="11.5" r="0.8" fill="currentColor" fillOpacity="0.25"/>
  </svg>
);

export const CheckIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="checkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.7" />
      </linearGradient>
      <filter id="checkGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="0.5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <circle cx="12" cy="12" r="10" fill="url(#checkGradient)" fillOpacity="0.15" filter="url(#checkGlow)"/>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="8" r="0.8" fill="currentColor" fillOpacity="0.25"/>
    <circle cx="8" cy="12" r="0.5" fill="currentColor" fillOpacity="0.2"/>
  </svg>
);

// One consistent icon set: 24px grid, 1.75 stroke, rounded caps. Decorative by default.
type P = { size?: number; className?: string };
const base = (size = 24) => ({
  width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
  strokeWidth: 1.75, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true, focusable: false,
});

export const IconCalendar = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><rect x="3.5" y="5" width="17" height="15.5" rx="1.5" /><path d="M3.5 10h17M8 3v4M16 3v4" /></svg>
);
export const IconHybrid = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><rect x="2.5" y="4" width="12" height="9" rx="1.2" /><path d="M6 17h5M8.5 13v4" /><path d="M18 9.5a3 3 0 1 1 0 6c-1.7 0-3-1.8-3-3.2" /><circle cx="18" cy="12.5" r=".8" fill="currentColor" /></svg>
);
export const IconPin = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" /><circle cx="12" cy="10" r="2.4" /></svg>
);
export const IconGlobe = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.6 2.6 3.9 5.6 3.9 9s-1.3 6.4-3.9 9c-2.6-2.6-3.9-5.6-3.9-9S9.4 5.6 12 3Z" /></svg>
);
export const IconGear = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><circle cx="12" cy="12" r="3" /><path d="M12 2.8v2.6M12 18.6v2.6M4.5 7.4l2.2 1.3M17.3 15.3l2.2 1.3M4.5 16.6l2.2-1.3M17.3 8.7l2.2-1.3" /><circle cx="12" cy="12" r="6.6" /></svg>
);
export const IconFactory = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><path d="M3 20.5V10l6 3.5V10l6 3.5V5h3.5v15.5H3Z" /><path d="M7 17h2M12 17h2M17 17h.5" /></svg>
);
export const IconArrow = ({ size = 16, className }: P) => (
  <svg {...base(size)} strokeWidth={2} className={className}><path d="M4 12h15M13 6l6 6-6 6" /></svg>
);
export const IconMenu = ({ size, className }: P) => (
  <svg {...base(size)} strokeWidth={2} className={className}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);
export const IconClose = ({ size, className }: P) => (
  <svg {...base(size)} strokeWidth={2} className={className}><path d="M6 6l12 12M18 6L6 18" /></svg>
);
export const IconCheck = ({ size, className }: P) => (
  <svg {...base(size)} strokeWidth={2.4} className={className}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
);
export const IconAlert = ({ size = 20, className }: P) => (
  <svg {...base(size)} className={className}><circle cx="12" cy="12" r="9" /><path d="M12 7.5v5.5M12 16.4v.1" /></svg>
);

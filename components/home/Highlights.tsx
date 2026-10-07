import { IconCalendar, IconFactory, IconGear, IconGlobe, IconHybrid, IconPin } from "@/components/site/Icons";

const items = [
  { icon: IconCalendar, k: "Date", v: "2–5 November 2026" },
  { icon: IconHybrid, k: "Format", v: "Hybrid Conference" },
  { icon: IconPin, k: "Location", v: "OGITECH, Igbesa" },
  { icon: IconGlobe, k: "Reach", v: "International Conference" },
  { icon: IconGear, k: "Focus", v: "Engineering TVET" },
  { icon: IconFactory, k: "Purpose", v: "Industrial Development" },
];

export function Highlights() {
  return (
    <section className="s-highlights" aria-label="Conference highlights">
      <div className="s-container">
        <ul>
          {items.map(({ icon: Icon, k, v }) => (
            <li key={k}>
              <Icon />
              <span className="k">{k}</span>
              <span className="v">{v}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

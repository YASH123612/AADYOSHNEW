import { MENTOR_BG_NAMES, PARTNER_NAMES, TECH_BUSINESS, TECH_ENGINEERING, type MentorBg } from "@/lib/content";
import { TechMarqueeShell } from "./TechMarqueeShell";

const MentorTile = ({ m }: { m: MentorBg }) =>
  typeof m === "string" ? (
    <div className="logo-tile">{m}</div>
  ) : (
    <div className="logo-tile logo-tile-img" title={m.name}>
      <img
        src={m.logo}
        alt={m.name}
        height={m.height || 26}
        style={{ height: m.height || 26, width: "auto", maxHeight: 32, objectFit: "contain" }}
        loading="lazy"
        decoding="async"
      />
    </div>
  );

/** Scrolling strip of mentor-background marks (duplicated 4x so the loop has no seam). */
export function MentorLogoTrack() {
  const track = [...MENTOR_BG_NAMES, ...MENTOR_BG_NAMES, ...MENTOR_BG_NAMES, ...MENTOR_BG_NAMES];
  return (
    <div className="logo-marquee-track" id="mentorLogoTrack" aria-label="Mentor background companies">
      {track.map((m, i) => (
        <MentorTile key={typeof m === "string" ? m + i : m.name + i} m={m} />
      ))}
    </div>
  );
}

export function LogoGrid() {
  return <div className="logo-grid" id="logoGrid">{PARTNER_NAMES.map((n) => <div key={n} className="logo-tile">{n}</div>)}</div>;
}

type Tool = { name: string; file: string };
const Tile = ({ t, dup }: { t: Tool; dup?: boolean }) => (
  <div className={"tech-tile" + (dup ? " tech-dup" : "")} aria-hidden={dup ? true : undefined}>
    <span className="tech-ic"><img src={`/assets/img/tech/${t.file}.svg`} alt="" width={32} height={32} decoding="async" /></span>
    <span className="tech-name">{t.name}</span>
  </div>
);
/* each list is rendered twice so translating the track by exactly -50% loops without a jump */
const Row = ({ list }: { list: Tool[] }) => <>{list.map((t) => <Tile key={t.file} t={t} />)}{list.map((t) => <Tile key={"d" + t.file} t={t} dup />)}</>;

export function TechMarquee() {
  return (
    <TechMarqueeShell>
      <div className="tech-lane">
        <p className="tech-label">Engineering &amp; data</p>
        <div className="tech-row"><div className="tech-track tech-left" id="techTrackA"><Row list={TECH_ENGINEERING} /></div></div>
      </div>
      <div className="tech-lane">
        <p className="tech-label">Business &amp; management</p>
        <div className="tech-row"><div className="tech-track tech-right" id="techTrackB"><Row list={TECH_BUSINESS} /></div></div>
      </div>
    </TechMarqueeShell>
  );
}

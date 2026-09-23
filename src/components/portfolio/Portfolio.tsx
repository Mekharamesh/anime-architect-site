import anime from "animejs";
import {
  ArrowDown,
  ArrowUpRight,
  Braces,
  Check,
  Code2,
  Database,
  Github,
  Instagram,
  Linkedin,
  LoaderCircle,
  Mail,
  MapPin,
  Menu,
  Server,
  Sparkles,
  X,
} from "lucide-react";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { animateHover, prefersReducedMotion, useScrollAnimation } from "@/hooks/use-anime";
import portrait from "@/assets/mekha-portrait.jpg";
import projectGrid from "@/assets/project-grid.jpg";

const navItems = ["Home", "About", "Skills", "Projects", "Experience", "Contact"];
const EASE = { entrance: "easeOutExpo", loop: "easeInOutQuad", quick: "easeOutQuad" } as const;

function SectionTitle({ kicker, title, intro }: { kicker: string; title: string; intro?: string }) {
  return (
    <div className="section-heading">
      <span className="section-kicker">{kicker}</span>
      <h2>{title}</h2>
      {intro ? <p>{intro}</p> : null}
    </div>
  );
}

function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const [active, setActive] = useState("Home");
  const [open, setOpen] = useState(false);

  const moveUnderline = useCallback((label: string) => {
    const nav = navRef.current;
    const underline = underlineRef.current;
    const target = nav?.querySelector(`[data-nav="${label}"]`) as HTMLElement | null;
    const track = nav?.querySelector("[data-nav-track]") as HTMLElement | null;
    if (!target || !track || !underline) return;
    const left = target.offsetLeft;
    anime.remove(underline);
    anime({ targets: underline, width: target.offsetWidth, translateX: left, duration: 500, easing: EASE.entrance });
  }, []);

  useEffect(() => {
    moveUnderline(active);
    const onResize = () => moveUnderline(active);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active, moveUnderline]);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking || !navRef.current) return;
      ticking = true;
      requestAnimationFrame(() => {
        anime.remove(navRef.current);
        anime({
          targets: navRef.current,
          backgroundColor: window.scrollY > 48 ? "rgba(10,10,15,.88)" : "rgba(10,10,15,0)",
          boxShadow: window.scrollY > 48 ? "0 12px 42px rgba(0,0,0,.28)" : "0 0 0 rgba(0,0,0,0)",
          duration: prefersReducedMotion() ? 0 : 300,
          easing: EASE.quick,
        });
        const current = [...navItems].reverse().find((item) => {
          const section = document.getElementById(item.toLowerCase());
          return section ? section.getBoundingClientRect().top <= 180 : false;
        });
        if (current) setActive(current);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (navRef.current) anime.remove(navRef.current);
    };
  }, []);

  useEffect(() => {
    const lines = lineRefs.current.filter(Boolean);
    anime.remove(lines);
    anime({
      targets: lines[0],
      translateY: open ? 6 : 0,
      rotate: open ? 45 : 0,
      duration: 300,
      easing: EASE.quick,
    });
    anime({ targets: lines[1], opacity: open ? 0 : 1, duration: 180, easing: EASE.quick });
    anime({
      targets: lines[2],
      translateY: open ? -6 : 0,
      rotate: open ? -45 : 0,
      duration: 300,
      easing: EASE.quick,
    });
    if (panelRef.current) {
      anime.remove(panelRef.current);
      anime({ targets: panelRef.current, translateX: open ? ["100%", "0%"] : ["0%", "100%"], duration: 500, easing: EASE.entrance });
      if (open) anime({ targets: panelRef.current.querySelectorAll("a"), opacity: [0, 1], translateX: [28, 0], delay: anime.stagger(80), duration: 420, easing: EASE.entrance });
    }
    return () => anime.remove([...lines, panelRef.current].filter(Boolean) as Element[]);
  }, [open]);

  const navigate = (item: string) => {
    setActive(item);
    setOpen(false);
    document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };

  return (
    <nav ref={navRef} className="nav-shell" aria-label="Main navigation">
      <a href="#home" className="brand-mark" aria-label="Mekha home">MD<span>.</span></a>
      <div className="nav-links" data-nav-track>
        {navItems.map((item) => <button key={item} data-nav={item} onClick={() => navigate(item)} className={active === item ? "nav-active" : ""}>{item}</button>)}
        <span ref={underlineRef} className="nav-underline" />
      </div>
      <button className="menu-button" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
        <Menu className="sr-only" />
        {[0, 1, 2].map((line) => <span key={line} ref={(node) => { lineRefs.current[line] = node; }} />)}
      </button>
      <div ref={panelRef} className="mobile-panel">
        {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={(event) => { event.preventDefault(); navigate(item); }}>{item}</a>)}
      </div>
    </nav>
  );
}

function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const typeRef = useRef<HTMLSpanElement>(null);
  const roles = ["Web Designer", "Frontend Developer", "Full Stack Developer", "React & Node.js Engineer"];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = prefersReducedMotion();
    const eyebrow = root.querySelector(".hero-eyebrow");
    const letters = root.querySelectorAll(".name-letter");
    const tagline = root.querySelector(".hero-tagline");
    const buttons = root.querySelectorAll(".hero-action");
    const blobs = root.querySelectorAll(".ambient-shape");
    const arrow = root.querySelector(".scroll-arrow");
    if (reduced) {
      anime.set([eyebrow, letters, tagline, buttons], { opacity: 1, translateY: 0 });
      if (typeRef.current) typeRef.current.textContent = roles[0];
      return;
    }
    anime.timeline().add({ targets: eyebrow, opacity: [0, 1], translateY: [20, 0], duration: 600, easing: EASE.quick })
      .add({ targets: letters, opacity: [0, 1], translateY: [42, 0], rotateX: [-70, 0], delay: anime.stagger(30), duration: 800, easing: EASE.entrance }, "-=220")
      .add({ targets: tagline, opacity: [0, 1], translateY: [24, 0], duration: 620, easing: EASE.entrance }, "-=250")
      .add({ targets: buttons, opacity: [0, 1], translateY: [20, 0], delay: anime.stagger(150), duration: 600, easing: EASE.entrance }, "-=340");
    anime({ targets: blobs[0], translateX: [0, 60], translateY: [0, -34], scale: [1, 1.12], direction: "alternate", loop: true, duration: 5200, easing: "easeInOutSine" });
    anime({ targets: blobs[1], translateX: [0, -44], translateY: [0, 48], scale: [1.08, .94], direction: "alternate", loop: true, duration: 6200, easing: "easeInOutSine" });
    anime({ targets: arrow, translateY: [0, 10], direction: "alternate", loop: true, duration: 1000, easing: EASE.loop });

    let stopped = false;
    const type = async () => {
      let roleIndex = 0;
      while (!stopped && typeRef.current) {
        const role = roles[roleIndex % roles.length] ?? "Web Designer";
        typeRef.current.textContent = role;
        await anime({ targets: typeRef.current, width: ["0ch", `${role.length}ch`], opacity: [0, 1], duration: role.length * 65, easing: "steps(" + role.length + ")" }).finished;
        await new Promise((resolve) => window.setTimeout(resolve, 1100));
        await anime({ targets: typeRef.current, width: [`${role.length}ch`, "0ch"], opacity: [1, .4], duration: 460, easing: EASE.quick }).finished;
        roleIndex += 1;
      }
    };
    void type();
    return () => { stopped = true; anime.remove(root.querySelectorAll("*")); };
  }, []);

  const buttonHover = (event: React.MouseEvent<HTMLElement>, enter: boolean) => anime({ targets: event.currentTarget, scale: enter ? 1.05 : 1, boxShadow: enter ? "0 0 34px rgba(0,210,255,.28)" : "0 0 0 rgba(0,210,255,0)", duration: 200, easing: EASE.quick });
  const name = "MEKHA DHARSHINI R";
  return (
    <section id="home" ref={rootRef} className="hero-section">
      <div className="ambient-shape ambient-one" /><div className="ambient-shape ambient-two" />
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="hero-eyebrow"><Sparkles /> Hi, I’m</p>
          <h1 aria-label={name}>{name.split("").map((letter, index) => <span className="name-letter" key={`${letter}-${index}`}>{letter === " " ? "\u00a0" : letter}</span>)}</h1>
          <div className="role-line"><span ref={typeRef} className="typewriter" /></div>
          <p className="hero-tagline">I design expressive digital experiences and build them into fast, thoughtful products.</p>
          <div className="hero-actions">
            <a className="hero-action action-primary" href="#projects" onMouseEnter={(e) => buttonHover(e, true)} onMouseLeave={(e) => buttonHover(e, false)}>View my work <ArrowDown /></a>
            <a className="hero-action action-secondary" href="#contact" onMouseEnter={(e) => buttonHover(e, true)} onMouseLeave={(e) => buttonHover(e, false)}>Let’s talk <ArrowUpRight /></a>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="code-window"><span className="window-dots">•••</span><code><i>const</i> designer = {'{'}<br />&nbsp;&nbsp;craft: <b>“meaningful”</b>,<br />&nbsp;&nbsp;build: <b>“scalable”</b>,<br />&nbsp;&nbsp;detail: <b>true</b><br />{'}'};</code></div>
          <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="core-sphere"><Braces /></div>
        </div>
      </div>
      <a className="scroll-cue" href="#about"><span>Scroll to discover</span><ArrowDown className="scroll-arrow" /></a>
    </section>
  );
}

function About() {
  const ref = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const animateSection = useCallback((element: HTMLElement) => ({ targets: [element.querySelector(".portrait-wrap"), element.querySelector(".about-copy")], opacity: [0, 1], translateY: [30, 0], scale: [.94, 1], delay: anime.stagger(200), duration: 800, easing: EASE.entrance, begin: () => { element.querySelectorAll<HTMLElement>("[data-count]").forEach((count) => anime({ targets: count, innerHTML: [0, Number(count.dataset["count"])], round: 1, duration: 2000, easing: EASE.entrance })); } }), []);
  useScrollAnimation(ref, animateSection, .3);
  const tilt = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    anime({ targets: event.currentTarget, rotateY: ((event.clientX - rect.left) / rect.width - .5) * 16, rotateX: -((event.clientY - rect.top) / rect.height - .5) * 16, duration: 250, easing: EASE.quick });
  };
  return (
    <section id="about" ref={ref} className="section-shell about-section">
      <div ref={imageRef} className="portrait-wrap" onMouseMove={tilt} onMouseLeave={(e) => anime({ targets: e.currentTarget, rotateX: 0, rotateY: 0, duration: 500, easing: EASE.quick })}>
        <img src={portrait} alt="Mekha Dharshini R, web designer and developer" loading="lazy" width={1024} height={1280} />
        <span className="portrait-caption">Available for select projects</span>
      </div>
      <div className="about-copy">
        <SectionTitle kicker="About me" title="Design intuition, engineering discipline." />
        <p>I bridge visual design and full-stack development to create experiences that feel as good as they perform. Every interaction is considered, every detail has a reason.</p>
        <p>From first sketch to production launch, I bring clarity, curiosity, and craft to ambitious digital products.</p>
        <div className="stats-row"><div><strong data-count="50">0</strong><span>Projects shipped</span></div><div><strong data-count="3">0</strong><span>Years of experience</span></div><div><strong data-count="12">0</strong><span>Happy partners</span></div></div>
      </div>
    </section>
  );
}

const skillGroups = [
  { title: "Frontend", icon: Code2, skills: [["HTML5", 95], ["CSS3", 92], ["Bootstrap", 88], ["Tailwind CSS", 94], ["React.js", 90]] },
  { title: "Backend", icon: Server, skills: [["Node.js", 87], ["Express.js", 85], ["PHP", 78]] },
  { title: "Database", icon: Database, skills: [["MongoDB", 84], ["SQL", 86]] },
];

function Skills() {
  const ref = useRef<HTMLElement>(null);
  const animateSection = useCallback((element: HTMLElement) => ({ targets: element.querySelectorAll(".skill-card"), opacity: [0, 1], translateY: [40, 0], scale: [.9, 1], delay: anime.stagger(80, { start: 100 }), duration: 600, easing: EASE.entrance, complete: () => anime({ targets: element.querySelectorAll(".skill-fill"), width: (_target: Element) => `${(_target as HTMLElement).dataset["level"]}%`, duration: 1200, delay: anime.stagger(70), easing: EASE.loop }) }), []);
  useScrollAnimation(ref, animateSection);
  return (
    <section id="skills" ref={ref} className="section-shell section-stack">
      <SectionTitle kicker="Capabilities" title="Tools I use to turn ideas into products." intro="A practical stack for designing, building, and scaling modern web experiences." />
      <div className="skills-grid">{skillGroups.map(({ title, icon: Icon, skills }) => <article className="skill-card glass-card" key={title} onMouseEnter={(e) => animateHover(e.currentTarget, true, e.currentTarget.querySelector(".skill-icon"))} onMouseLeave={(e) => animateHover(e.currentTarget, false, e.currentTarget.querySelector(".skill-icon"))}><div className="skill-card-head"><span className="skill-icon"><Icon /></span><h3>{title}</h3><span>0{skillGroups.findIndex((item) => item.title === title) + 1}</span></div><div className="skill-list">{skills.map(([skill, level]) => <div className="skill-item" key={skill}><div><span>{skill}</span><small>{level}%</small></div><div className="skill-track"><span className="skill-fill" data-level={level} /></div></div>)}</div></article>)}</div>
    </section>
  );
}

const projects = [
  ["Finora Analytics", "Full Stack", "Real-time financial intelligence with clear, actionable dashboards.", ["React", "Node.js", "MongoDB"]],
  ["Wander Editorial", "Frontend", "An immersive travel journal built around rich stories and place.", ["React", "Tailwind", "API"]],
  ["Aster Living", "Frontend", "A refined commerce experience for considered interior objects.", ["React", "CSS3", "Stripe"]],
  ["Launchpad", "Full Stack", "A collaborative workspace that keeps product teams in flow.", ["React", "Express", "SQL"]],
  ["Savour Table", "PHP/SQL", "Restaurant discovery and reservation with live availability.", ["PHP", "SQL", "Bootstrap"]],
  ["Clarity Health", "PHP/SQL", "A calm operational workspace for modern care teams.", ["PHP", "SQL", "Charts"]],
] as const;

function Projects() {
  const ref = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState("All");
  const [visible, setVisible] = useState(projects.map((_, index) => index));
  const animateSection = useCallback((element: HTMLElement) => ({ targets: element.querySelectorAll(".project-card"), opacity: [0, 1], translateY: [34, 0], scale: [.92, 1], delay: anime.stagger(80), duration: 650, easing: EASE.entrance }), []);
  useScrollAnimation(ref, animateSection);
  const applyFilter = (next: string) => {
    if (next === filter || !gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".project-card");
    anime({ targets: cards, opacity: 0, scale: .8, duration: 300, easing: "easeInQuad", complete: () => { const indexes = projects.map((project, index) => next === "All" || project[1] === next ? index : -1).filter((index) => index >= 0); setVisible(indexes); setFilter(next); requestAnimationFrame(() => anime({ targets: gridRef.current?.querySelectorAll(".project-card"), opacity: [0, 1], scale: [.8, 1], delay: anime.stagger(60), duration: 520, easing: EASE.entrance })); } });
  };
  const hoverProject = (card: HTMLElement, enter: boolean) => {
    anime({ targets: card.querySelector("img"), scale: enter ? 1.05 : 1, duration: 350, easing: EASE.entrance });
    anime({ targets: card.querySelector(".project-overlay"), translateY: enter ? "0%" : "100%", duration: 350, easing: EASE.entrance });
    if (enter) anime({ targets: card.querySelectorAll(".tech-pill"), opacity: [0, 1], translateY: [8, 0], delay: anime.stagger(50, { start: 150 }), duration: 260, easing: EASE.quick });
  };
  return (
    <section id="projects" ref={ref} className="section-shell section-stack">
      <SectionTitle kicker="Selected work" title="Products with a point of view." intro="A selection of concept projects spanning product design and full-stack development." />
      <div className="filter-row" role="group" aria-label="Filter projects">{["All", "Frontend", "Full Stack", "PHP/SQL"].map((item) => <Button key={item} variant={filter === item ? "default" : "ghost"} onClick={() => applyFilter(item)}>{item}</Button>)}</div>
      <div ref={gridRef} className="projects-grid">{visible.map((index) => { const project = projects[index]; if (!project) return null; return <article className="project-card" key={project[0]} onMouseEnter={(e) => hoverProject(e.currentTarget, true)} onMouseLeave={(e) => hoverProject(e.currentTarget, false)}><div className={`project-image project-shot-${index + 1}`}><img src={projectGrid} alt={`${project[0]} interface preview`} loading="lazy" width={1536} height={1024} /><div className="project-overlay"><span>Explore case study</span><ArrowUpRight /><div>{project[3].map((tech) => <small className="tech-pill" key={tech}>{tech}</small>)}</div></div></div><div className="project-meta"><div><span>{project[1]}</span><h3>{project[0]}</h3></div><p>{project[2]}</p></div></article>; })}</div>
    </section>
  );
}

const experiences = [
  ["2025 — Present", "Independent Designer & Developer", "Freelance", "Partnering with founders and teams to shape, design, and ship focused digital products."],
  ["2024 — 2025", "Full Stack Developer", "Product Studio", "Built reliable web applications and reusable systems across React, Node.js, and SQL."],
  ["2023 — 2024", "Frontend Developer", "Creative Agency", "Translated brand systems into responsive, expressive interfaces for global clients."],
  ["2022 — 2023", "Web Design Intern", "Digital Lab", "Developed a foundation in interaction design, accessibility, and visual storytelling."],
];

function Experience() {
  const ref = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const observers = [...root.querySelectorAll<HTMLElement>(".timeline-entry")].map((entry, index) => {
      const observer = new IntersectionObserver(([item]) => { if (!item?.isIntersecting) return; anime({ targets: entry, opacity: [0, 1], translateX: [index % 2 === 0 ? -60 : 60, 0], duration: 700, easing: EASE.entrance }); anime({ targets: entry.querySelector(".timeline-dot"), scale: [1, 1.3, 1], boxShadow: ["0 0 0 rgba(0,210,255,0)", "0 0 24px rgba(0,210,255,.8)", "0 0 8px rgba(0,210,255,.35)"], duration: 600, easing: EASE.loop }); observer.disconnect(); }, { threshold: .35 }); observer.observe(entry); return observer;
    });
    const onScroll = () => { if (!lineRef.current) return; const rect = root.getBoundingClientRect(); const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (rect.height + window.innerHeight * .25))); anime.set(lineRef.current, { scaleY: progress }); };
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
    return () => { observers.forEach((observer) => observer.disconnect()); window.removeEventListener("scroll", onScroll); anime.remove(root.querySelectorAll("*")); };
  }, []);
  return <section id="experience" ref={ref} className="section-shell section-stack"><SectionTitle kicker="Experience" title="A path shaped by making." /><div className="timeline"><div ref={lineRef} className="timeline-line" />{experiences.map(([date, role, company, copy], index) => <article className={`timeline-entry ${index % 2 ? "timeline-right" : "timeline-left"}`} key={role}><span className="timeline-dot" /><span className="timeline-date">{date}</span><div className="glass-card timeline-card"><small>{company}</small><h3>{role}</h3><p>{copy}</p></div></article>)}</div></section>;
}

function FloatingField({ label, textarea = false }: { label: string; textarea?: boolean }) {
  const labelRef = useRef<HTMLLabelElement>(null); const lineRef = useRef<HTMLSpanElement>(null); const [filled, setFilled] = useState(false);
  const focus = (active: boolean) => { const raised = active || filled; anime({ targets: labelRef.current, translateY: raised ? -20 : 0, scale: raised ? .78 : 1, duration: 300, easing: EASE.quick }); anime({ targets: lineRef.current, scaleX: active ? 1 : 0, duration: 300, easing: EASE.quick }); };
  const shared = { required: true, onFocus: () => focus(true), onBlur: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => { setFilled(Boolean(event.target.value)); focus(false); }, "aria-label": label };
  return <div className={`floating-field ${textarea ? "field-message" : ""}`}><label ref={labelRef}>{label}</label>{textarea ? <textarea {...shared} rows={4} /> : <input {...shared} type={label === "Email" ? "email" : "text"} />}<span ref={lineRef} /></div>;
}

function Contact() {
  const ref = useRef<HTMLElement>(null); const buttonRef = useRef<HTMLButtonElement>(null); const checkRef = useRef<SVGPathElement>(null); const toastRef = useRef<HTMLDivElement>(null); const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");
  const animateSection = useCallback((element: HTMLElement) => ({ targets: [element.querySelector(".contact-copy"), element.querySelector(".contact-form")], opacity: [0, 1], translateY: [40, 0], delay: anime.stagger(160), duration: 700, easing: EASE.entrance }), []); useScrollAnimation(ref, animateSection);
  const submit = (event: FormEvent) => { event.preventDefault(); if (status !== "idle") return; setStatus("loading"); requestAnimationFrame(() => { const spinner = buttonRef.current?.querySelector(".spinner"); anime({ targets: buttonRef.current, scaleX: [.98, 1], duration: 260, easing: EASE.quick }); if (spinner) anime({ targets: spinner, rotate: 360, loop: true, duration: 800, easing: "linear" }); }); window.setTimeout(() => { setStatus("sent"); requestAnimationFrame(() => { const spinner = buttonRef.current?.querySelector(".spinner"); if (spinner) anime.remove(spinner); anime({ targets: checkRef.current, strokeDashoffset: [anime.setDashoffset, 0], duration: 600, easing: EASE.entrance }); anime({ targets: toastRef.current, opacity: [0, 1], translateY: [-20, 0], duration: 400, easing: EASE.entrance, complete: () => window.setTimeout(() => anime({ targets: toastRef.current, opacity: 0, translateY: -20, duration: 300, easing: EASE.quick }), 3000) }); }); }, 1300); };
  const socialHover = (event: React.MouseEvent<HTMLAnchorElement>) => anime({ targets: event.currentTarget, scale: [1, 1.2, 1], rotate: [0, -7, 7, 0], duration: 400, easing: EASE.loop });
  return <section id="contact" ref={ref} className="contact-section"><div className="section-shell contact-grid"><div className="contact-copy"><SectionTitle kicker="Get in touch" title="Have an idea? Let’s make it real." /><p>I’m always open to thoughtful projects, collaborations, and conversations about design and technology.</p><div className="contact-details"><a href="mailto:hello@example.com"><Mail /> hello@example.com</a><span><MapPin /> Calcutta, India</span></div><div className="social-row"><a href="https://github.com" aria-label="GitHub" onMouseEnter={socialHover}><Github /></a><a href="https://linkedin.com" aria-label="LinkedIn" onMouseEnter={socialHover}><Linkedin /></a><a href="https://instagram.com" aria-label="Instagram" onMouseEnter={socialHover}><Instagram /></a></div></div><form className="contact-form glass-card" onSubmit={submit}><div className="field-row"><FloatingField label="Name" /><FloatingField label="Email" /></div><FloatingField label="Project type" /><FloatingField label="Tell me about your project" textarea /><Button ref={buttonRef} type="submit" disabled={status !== "idle"} className="submit-button">{status === "idle" ? <>Send message <ArrowUpRight /></> : status === "loading" ? <><LoaderCircle className="spinner" /> Sending</> : <><svg viewBox="0 0 24 24" aria-hidden="true"><path ref={checkRef} d="m5 12 4 4L19 6" fill="none" stroke="currentColor" strokeWidth="2" /></svg> Sent</>}</Button></form></div><div ref={toastRef} className="success-toast"><Check /> Message received — I’ll be in touch.</div><footer><span>© 2026 Mekha Dharshini R</span><a href="#home">Back to top <ArrowDown /></a></footer></section>;
}

export default function Portfolio() {
  return <main><Navbar /><Hero /><About /><Skills /><Projects /><Experience /><Contact /></main>;
}
# Animated Portfolio

Build a fully animated personal portfolio website for a Web Designer & Full Stack Developer named [YOUR NAME].

Use anime.js (v3) as the animation library for ALL animations in this project. Install and import it properly (npm install animejs), and trigger animations using React useEffect hooks with useRef for DOM targeting, combined with Intersection Observer for scroll-triggered animations. Do not use Framer Motion or CSS-only transitions for major animations — anime.js should drive them.

===================

BRAND & VISUAL IDENTITY

===================

- Dark theme base (#0A0A0F background), light mode toggle optional

- Accent gradient: #6C5CE7 to #00D2FF

- Fonts: "Space Grotesk" or "Sora" for headings, "Inter" for body text

- Glassmorphism cards, soft glow shadows, 12-16px rounded corners

===================

NAVBAR

===================

- Sticky navbar, transparent on load, transitions to solid/blurred background on scroll

- Use anime.js to animate the navbar background-color and box-shadow smoothly when scroll passes a threshold (not CSS transition — animate via JS on scroll event, throttled)

- Active nav link underline: animate its width and translateX using anime.js so it slides smoothly between links instead of snapping

- Mobile menu: hamburger icon morphs into X using anime.js rotate + opacity animation on the two/three line elements individually

- Mobile menu panel slides in using anime({ translateX: ['100%', '0%'], easing: 'easeOutExpo', duration: 500 })

- Menu links stagger in with anime.js targets as an array and delay: anime.stagger(80)

===================

1. HERO SECTION

===================

On page load, run an anime.js timeline (anime.timeline()) that sequences:

1. Eyebrow text ("Hi, I'm") — opacity 0 to 1, translateY 20 to 0, duration 600, easing 'easeOutQuad'

2. Name heading — split text into individual letters or words (use anime.js text-splitting technique with spans), animate each with opacity + translateY + stagger(30), easing 'easeOutExpo', duration 800

3. Typewriter effect below name cycling through: "Web Designer", "Frontend Developer", "Full Stack Developer", "React & Node.js Engineer" — build this manually with anime.js animating a text node's width/opacity per character, or animate opacity of individual character spans in sequence to simulate typing, then reverse to simulate deleting, looping infinitely (use anime.js loop: true or a recursive function chaining timelines)

4. Subtext tagline fades in — opacity + translateY, delay after typewriter starts

5. CTA buttons fade in with slight upward motion, staggered by 150ms between the two buttons

Background: optional animated gradient blobs — animate their translateX/translateY/scale in an infinite loop using anime.js with direction: 'alternate' and easing: 'easeInOutSine', duration 4000-6000, creating slow organic movement

Button hover: on mouseenter, trigger anime({ scale: 1.05, duration: 200, easing: 'easeOutQuad' }) and animate a glow/box-shadow property; on mouseleave, reverse it

Scroll indicator: small down arrow, animate translateY in a bouncing loop using anime.js with direction: 'alternate', loop: true, easing: 'easeInOutQuad', duration 1000

===================

2. ABOUT SECTION

===================

- Set up an Intersection Observer that triggers an anime.js animation when the section enters viewport (threshold ~0.3), running once

- Profile image: opacity 0 to 1 + scale 0.9 to 1, duration 800, easing 'easeOutExpo'

- Bio text: opacity + translateY(30 to 0), delay 200ms after image starts

- Stats row (e.g., "50+ Projects", "3+ Years Experience"): animate numbers counting up using anime.js's built-in number tweening — anime({ innerHTML: [0, targetNumber], round: 1, duration: 2000, easing: 'easeOutExpo' }) triggered on scroll into view

- Profile image hover: subtle 3D tilt effect — track mouse position and animate rotateX/rotateY with anime.js using a small multiplier (max ~8 degrees), smoothly reset on mouseleave with easing 'easeOutQuad'

===================

3. SKILLS SECTION

===================

Categories: Frontend (HTML5, CSS3, Bootstrap, Tailwind CSS, React.js), Backend (Node.js, Express.js, PHP), Database (MongoDB, SQL)

- Skill cards animate in on scroll using anime.js with targets as a NodeList/array and anime.stagger(80, {start: 100}) — each card: opacity 0 to 1, translateY 40 to 0, scale 0.9 to 1, easing 'easeOutExpo', duration 600

- If using proficiency bars: animate the bar's width from 0% to target% using anime.js, duration 1200, easing 'easeInOutQuad', triggered on scroll

- Hover interaction: card lifts with anime({ translateY: -8, boxShadow: [glow values], duration 250, easing: 'easeOutQuad' }), icon inside does a small rotate or scale bounce using a separate anime call

===================

4. PROJECTS SECTION

===================

- Filter buttons (All, Frontend, Full Stack, PHP/SQL): on filter click, animate out non-matching cards first (opacity 1 to 0, scale 1 to 0.8, duration 300, easing 'easeInQuad'), then after that completes (use anime.js callback: complete function or async/await with anime timeline), animate in matching cards (opacity 0 to 1, scale 0.8 to 1, stagger(60), easing 'easeOutExpo')

- Project cards animate in on scroll same as skill cards pattern (staggered fade+scale)

- On hover: image scale animates from 1 to 1.05 via anime.js, overlay panel slides up using translateY(100% to 0%), duration 350, easing 'easeOutExpo'

- Tech tag pills inside overlay stagger in slightly after overlay appears (delay 150ms, stagger 50ms each)

Include at least 6 placeholder project cards.

===================

5. EXPERIENCE / TIMELINE SECTION

===================

- Vertical timeline, alternating left/right entries on desktop

- Each entry animates in via Intersection Observer: left entries use translateX(-60 to 0), right entries use translateX(60 to 0), combined with opacity 0 to 1, duration 700, easing 'easeOutExpo'

- Timeline dots: when an entry's animation triggers, run a separate small anime.js pulse animation on its dot — scale [1, 1.3, 1] with boxShadow glow, duration 600, easing 'easeInOutQuad'

- The connecting vertical line itself can animate its height/scaleY from 0 to 1 as user scrolls down the section (scroll-linked, recalculated on scroll event)

Include 3-5 entries.

===================

6. CONTACT SECTION

===================

- Section fades/slides in on scroll, same Intersection Observer pattern

- Form inputs: floating label animation — on focus, animate label's translateY and font-size down/up using anime.js, and animate a bottom-border scaleX from 0 to 1, duration 300, easing 'easeOutQuad'

- Submit button on click: 

  1. Animate button width/content to show a loading spinner (rotate infinite loop, easing 'linear', duration 800)

  2. On success, morph into a checkmark animation (can animate an SVG path's strokeDashoffset using anime.js to "draw" the checkmark)

  3. Trigger a toast notification that slides in from top-right: translateY(-20 to 0) + opacity, duration 400, easing 'easeOutExpo', auto-dismiss after 3s by reversing the animation

- Social icons: on hover, animate scale + a small rotate "bounce" using anime.js keyframes: scale: [1, 1.2, 1], duration 400, easing 'easeInOutQuad'

===================

GLOBAL ANIMATION RULES

===================

- Centralize easing choices: use 'easeOutExpo' for entrances, 'easeInOutQuad' for hover/loop states, 'easeOutQuad' for quick UI feedback

- All scroll-triggered animations should run once (disconnect the Intersection Observer after triggering) unless explicitly meant to loop (like background blobs or the scroll indicator)

- Stagger any group of similar elements (cards, list items, nav links) rather than animating them simultaneously

- Wrap all anime.js calls in useEffect with proper cleanup (anime.remove(target) on unmount) to prevent memory leaks in React

- Respect prefers-reduced-motion media query — check it in JS and skip/shorten non-essential animations if true

===================

TECHNICAL REQUIREMENTS

===================

- React with componentized structure, one component per section

- Tailwind CSS for layout/styling, anime.js exclusively for animations

- Fully responsive: mobile-first, breakpoints at 375px, 768px, 1024px, 1440px

- Clean semantic HTML, SEO meta tags

- Organize anime.js logic into reusable custom hooks where possible (e.g., useScrollAnimation(ref, animationConfig)) to keep components clean

Showcase these technologies clearly in the Skills section: HTML5, CSS3, Bootstrap, Tailwind CSS, React.js, Node.js, Express.js, MongoDB, PHP, SQL

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/fdcc7a9b-a725-4f25-96f4-62163fe1b7db).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

import { createFileRoute } from "@tanstack/react-router";
import Portfolio from "@/components/portfolio/Portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mekha Dharshini R — Web Designer & Full Stack Developer" },
      { name: "description", content: "Portfolio of Mekha Dharshini R, a web designer and full stack developer creating expressive, high-performing digital products." },
      { property: "og:title", content: "Mekha Dharshini R — Designer & Developer" },
      { property: "og:description", content: "Selected work, capabilities, and experience across web design and full-stack development." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <Portfolio />;
}

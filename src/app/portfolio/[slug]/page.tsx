import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { allProjects, getProjectBySlug } from "@/data/projectsData";
import { notFound } from "next/navigation";
import { ExternalLink, CheckCircle2, ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  return allProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.name} | GS-Softwares Portfolio`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      <Navbar />

      <main className="pt-28 pb-20 md:pb-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-xs font-semibold text-brand-accent hover:underline mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All Projects</span>
          </Link>

          <div className="rounded-3xl bg-bg-base shadow-neu-flat p-8 md:p-12 mb-12">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs font-semibold text-text-muted">
                {project.industry}
              </span>
              <span className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-accent/10 text-brand-accent border border-brand-accent/20">
                {project.status.replace("-", " ")}
              </span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4">
              {project.name}
            </h1>

            <p className="font-body text-base sm:text-lg text-brand-accent font-semibold mb-6">
              {project.description}
            </p>

            <div className="prose text-text-secondary leading-relaxed mb-8">
              <p>{project.longDescription}</p>
            </div>

            <div className="mb-8">
              <h2 className="font-heading text-xl font-bold text-text-primary mb-4">
                Architecture &amp; Key Features
              </h2>
              <ul className="space-y-2.5">
                {project.keyFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start text-sm text-text-secondary font-body">
                    <CheckCircle2 className="h-4 w-4 text-brand-success mr-2.5 mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="font-heading text-xl font-bold text-text-primary mb-4">
                Technologies Used
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs px-3 py-1.5 rounded-lg bg-bg-base shadow-neu-pressed-sm text-brand-accent font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 pt-6 border-t border-black/5">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl shadow-neu-flat hover:shadow-neu-pressed text-xs font-semibold text-text-primary transition-all bg-bg-base"
              >
                Inspect GitHub Repository
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-accent hover:bg-brand-accentHover text-white text-xs font-semibold transition-all shadow-neu-accent"
                >
                  <span>Launch Live System</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}


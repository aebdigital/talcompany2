import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ProjectGallery } from "@/components/ProjectGallery";
import { FadeInUp } from "@/components/FadeInUp";
import { PROJECTS, getProject } from "@/lib/projects";

type PageProps = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProject(id);
  if (!project) return {};
  return {
    title: `${project.title} – ${project.year} | TAL COMPANY`,
    description: `${project.title} (${project.year}) – realizácia spoločnosti TAL COMPANY, Žilina.`,
    alternates: { canonical: `/projekty/${project.id}` },
    openGraph: {
      type: "article",
      locale: "sk_SK",
      url: `/projekty/${project.id}`,
      siteName: "TAL COMPANY",
      title: `${project.title} – ${project.year}`,
      description: `Galéria projektu ${project.title}. Realizoval TAL COMPANY s.r.o.`,
      images: project.image ? [{ url: project.image }] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const project = getProject(id);
  if (!project) notFound();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Domov", item: "https://www.talcompany.sk/" },
      { "@type": "ListItem", position: 2, name: "Galéria", item: "https://www.talcompany.sk/galeria" },
      { "@type": "ListItem", position: 3, name: project.title, item: `https://www.talcompany.sk/projekty/${project.id}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PageHero
        title={project.title}
        subtitle={project.year}
        image={project.image}
        alt={project.title}
      />
      <div className="py-16 md:py-20 bg-white flex flex-col w-full">
        <div className="w-[90vw] mx-auto md:w-full md:max-w-7xl md:px-10 space-y-10">
          <FadeInUp className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-100">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-brand-blue uppercase tracking-wider">
                {project.category}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-dark-gray uppercase tracking-tight">
                {project.title}
              </h2>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                {project.year}
              </div>
            </div>
            <Link
              href="/galeria"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-dark-gray hover:text-brand-blue transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Späť na galériu
            </Link>
          </FadeInUp>

          <ProjectGallery title={project.title} images={project.galleryImages} />

          <div className="flex justify-center pt-4">
            <Link
              href="/galeria"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-dark-gray hover:text-brand-blue transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Späť na galériu
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

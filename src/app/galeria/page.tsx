"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface Project {
  id: string;
  title: string;
  year: string;
  category: string;
  image: string;
  galleryImages: string[];
}

const CATEGORIES = [
  "Všetko",
  "Školy & Nemocnice",
  "Bytové & Rodinné domy",
  "Priemyselné & Inžinierske stavby",
  "Záhrady & Spevnené plochy"
];

const PROJECTS_DATA: Project[] = [
  {
    id: "1",
    title: "Záhradná a krajinná architektúra",
    year: "od roku 2006",
    category: "Záhrady & Spevnené plochy",
    image: "https://www.talcompany.sk/sources/portfolio/1/harmonia_003.jpg",
    galleryImages: [
      "https://www.talcompany.sk/sources/portfolio/1/harmonia_003.jpg",
      "https://www.talcompany.sk/sources/portfolio/1/harmonia_001.jpg",
      "https://www.talcompany.sk/sources/portfolio/1/harmonia_002.jpg"
    ]
  },
  {
    id: "2",
    title: "Polyfunkčný objekt na ul. Pivovarská, Žilina",
    year: "rok 2006",
    category: "Bytové & Rodinné domy",
    image: "https://www.talcompany.sk/sources/portfolio/2/po_pivovarska_001.jpg",
    galleryImages: [
      "https://www.talcompany.sk/sources/portfolio/2/po_pivovarska_001.jpg",
      "https://www.talcompany.sk/sources/portfolio/2/po_pivovarska_002.jpg"
    ]
  },
  {
    id: "3",
    title: "Obytný súbor Amfiteáter-Žilina",
    year: "rok 2007",
    category: "Bytové & Rodinné domy",
    image: "https://www.talcompany.sk/sources/portfolio/3/os_amfiteater_001.jpg",
    galleryImages: ["https://www.talcompany.sk/sources/portfolio/3/os_amfiteater_001.jpg"]
  },
  {
    id: "4",
    title: "Spol. Softel, Žilina",
    year: "rok 2007",
    category: "Priemyselné & Inžinierske stavby",
    image: "https://www.talcompany.sk/sources/portfolio/4/softel_001.jpg",
    galleryImages: ["https://www.talcompany.sk/sources/portfolio/4/softel_001.jpg"]
  },
  {
    id: "5",
    title: "VÚC Žilina",
    year: "rok 2007",
    category: "Školy & Nemocnice",
    image: "https://www.talcompany.sk/sources/portfolio/5/vuc_za_001.jpg",
    galleryImages: ["https://www.talcompany.sk/sources/portfolio/5/vuc_za_001.jpg"]
  },
  {
    id: "6",
    title: "SOU Hlinská, Žilina",
    year: "rok 2008",
    category: "Školy & Nemocnice",
    image: "https://www.talcompany.sk/sources/portfolio/6/sou_hlinska_001.jpg",
    galleryImages: ["https://www.talcompany.sk/sources/portfolio/6/sou_hlinska_001.jpg"]
  },
  {
    id: "7",
    title: "Základná škola v Zázrivej",
    year: "rok 2008",
    category: "Školy & Nemocnice",
    image: "https://www.talcompany.sk/sources/portfolio/7/zs_zazriva_001.jpg",
    galleryImages: [
      "https://www.talcompany.sk/sources/portfolio/7/zs_zazriva_001.jpg",
      "https://www.talcompany.sk/sources/portfolio/7/zs_zazriva_002.jpg",
      "https://www.talcompany.sk/sources/portfolio/7/zs_zazriva_003.jpg",
      "https://www.talcompany.sk/sources/portfolio/7/zs_zazriva_004.jpg",
      "https://www.talcompany.sk/sources/portfolio/7/zs_zazriva_005.jpg"
    ]
  },
  {
    id: "8",
    title: "Hotel Prédium, Vráble",
    year: "rok 2009",
    category: "Priemyselné & Inžinierske stavby",
    image: "https://www.talcompany.sk/sources/portfolio/8/predium_001.jpg",
    galleryImages: ["https://www.talcompany.sk/sources/portfolio/8/predium_001.jpg"]
  },
  {
    id: "9",
    title: "Základná škola v Tvrdošíne",
    year: "rok 2010",
    category: "Školy & Nemocnice",
    image: "https://www.talcompany.sk/sources/portfolio/9/zs_tvrdosin_001.jpg",
    galleryImages: ["https://www.talcompany.sk/sources/portfolio/9/zs_tvrdosin_001.jpg"]
  },
  {
    id: "10",
    title: "Bytový dom v Stráňavoch",
    year: "rok 2010",
    category: "Bytové & Rodinné domy",
    image: "https://www.talcompany.sk/sources/portfolio/10/bd_stranavy_001.jpg",
    galleryImages: ["https://www.talcompany.sk/sources/portfolio/10/bd_stranavy_001.jpg"]
  },
  {
    id: "11",
    title: "Atómové elektrárne Mochovce",
    year: "rok 2010-2013",
    category: "Priemyselné & Inžinierske stavby",
    image: "https://www.talcompany.sk/sources/portfolio/11/ae_mochovce_001.jpg",
    galleryImages: ["https://www.talcompany.sk/sources/portfolio/11/ae_mochovce_001.jpg"]
  },
  {
    id: "12",
    title: "Rodinný dom, Do Medzilužia, Žilina",
    year: "rok 2011",
    category: "Bytové & Rodinné domy",
    image: "https://www.talcompany.sk/sources/portfolio/12/rd_domedziluzia_002.jpg",
    galleryImages: ["https://www.talcompany.sk/sources/portfolio/12/rd_domedziluzia_002.jpg"]
  },
  {
    id: "13",
    title: "Bytový dom, Žilina",
    year: "rok 2011",
    category: "Bytové & Rodinné domy",
    image: "https://www.talcompany.sk/sources/portfolio/13/bd_bratislavska_001.jpg",
    galleryImages: ["https://www.talcompany.sk/sources/portfolio/13/bd_bratislavska_001.jpg"]
  },
  {
    id: "14",
    title: "Železničný tunel Votice",
    year: "rok 2011",
    category: "Priemyselné & Inžinierske stavby",
    image: "https://www.talcompany.sk/sources/portfolio/14/tunel_votice_001.jpg",
    galleryImages: ["https://www.talcompany.sk/sources/portfolio/14/tunel_votice_001.jpg"]
  },
  {
    id: "15",
    title: "Základná škola Kuncová, Praha 5",
    year: "rok 2011",
    category: "Školy & Nemocnice",
    image: "https://www.talcompany.sk/sources/portfolio/15/zs_kuncova_001.jpg",
    galleryImages: ["https://www.talcompany.sk/sources/portfolio/15/zs_kuncova_001.jpg"]
  },
  {
    id: "16",
    title: "Základná škola, Chlupova, Praha 5",
    year: "rok 2011",
    category: "Školy & Nemocnice",
    image: "https://www.talcompany.sk/sources/portfolio/16/zs_chlupova_001.jpg",
    galleryImages: ["https://www.talcompany.sk/sources/portfolio/16/zs_chlupova_001.jpg"]
  },
  {
    id: "17",
    title: "Budova ALPHA, BB Centrum, Praha 4",
    year: "rok 2011-2012",
    category: "Priemyselné & Inžinierske stavby",
    image: "https://www.talcompany.sk/sources/portfolio/17/alpha_praha_001.jpg",
    galleryImages: ["https://www.talcompany.sk/sources/portfolio/17/alpha_praha_001.jpg"]
  },
  {
    id: "18",
    title: "Libenský pivovar, Praha",
    year: "rok 2012",
    category: "Priemyselné & Inžinierske stavby",
    image: "https://www.talcompany.sk/sources/portfolio/18/libereckypivovar_001.jpg",
    galleryImages: ["https://www.talcompany.sk/sources/portfolio/18/libereckypivovar_001.jpg"]
  },
  {
    id: "19",
    title: "RD p. Kočiš, Žilina-Budatín",
    year: "rok 2012",
    category: "Bytové & Rodinné domy",
    image: "https://www.talcompany.sk/sources/portfolio/19/rd_budatin_001.jpg",
    galleryImages: ["https://www.talcompany.sk/sources/portfolio/19/rd_budatin_001.jpg"]
  },
  {
    id: "20",
    title: "Bytový dom v Žiline, ul. Nanterská",
    year: "rok 2012",
    category: "Bytové & Rodinné domy",
    image: "https://www.talcompany.sk/sources/portfolio/20/nanterska_001.jpg",
    galleryImages: ["https://www.talcompany.sk/sources/portfolio/20/nanterska_001.jpg"]
  },
  {
    id: "21",
    title: "Objekty spol. Schiedel v Trenčíne",
    year: "rok 2014, 2015",
    category: "Priemyselné & Inžinierske stavby",
    image: "https://www.talcompany.sk/sources/portfolio/21/schiedel_001.jpg",
    galleryImages: ["https://www.talcompany.sk/sources/portfolio/21/schiedel_001.jpg"]
  },
  {
    id: "22",
    title: "Rodinný dom vo Varíne",
    year: "rok 2014",
    category: "Bytové & Rodinné domy",
    image: "https://www.talcompany.sk/sources/portfolio/22/rd_varin_001.jpg",
    galleryImages: ["https://www.talcompany.sk/sources/portfolio/22/rd_varin_001.jpg"]
  },
  {
    id: "23",
    title: "Predajňa COOP Jednota v Kamennej Porube",
    year: "rok 2015",
    category: "Priemyselné & Inžinierske stavby",
    image: "https://www.talcompany.sk/sources/portfolio/23/coop_kamporuba_001.jpg",
    galleryImages: ["https://www.talcompany.sk/sources/portfolio/23/coop_kamporuba_001.jpg"]
  },
  {
    id: "24",
    title: "Bilingválne gymnázium v Žiline",
    year: "rok 2015",
    category: "Školy & Nemocnice",
    image: "https://www.talcompany.sk/sources/portfolio/24/gbza_001.jpg",
    galleryImages: ["https://www.talcompany.sk/sources/portfolio/24/gbza_001.jpg"]
  },
  {
    id: "25",
    title: "Regulačné stanice SPP v okrese Žilina",
    year: "rok 2015",
    category: "Priemyselné & Inžinierske stavby",
    image: "https://www.talcompany.sk/sources/portfolio/25/rs_spp_001.jpg",
    galleryImages: ["https://www.talcompany.sk/sources/portfolio/25/rs_spp_001.jpg"]
  },
  {
    id: "26",
    title: "Banka VÚB v Žiline",
    year: "rok 2016",
    category: "Priemyselné & Inžinierske stavby",
    image: "https://www.talcompany.sk/sources/portfolio/26/vub_001.jpg",
    galleryImages: ["https://www.talcompany.sk/sources/portfolio/26/vub_001.jpg"]
  },
  {
    id: "27",
    title: "Materská škola v Zástraní",
    year: "rok 2016",
    category: "Školy & Nemocnice",
    image: "https://www.talcompany.sk/sources/portfolio/27/zs_zastranie_001.jpg",
    galleryImages: ["https://www.talcompany.sk/sources/portfolio/27/zs_zastranie_001.jpg"]
  },
  {
    id: "28",
    title: "Stavby nových cestných mostov a nadjazdov",
    year: "stavby",
    category: "Priemyselné & Inžinierske stavby",
    image: "https://www.talcompany.sk/sources/proj1.png",
    galleryImages: ["https://www.talcompany.sk/sources/proj1.png"]
  },
  {
    id: "29",
    title: "CAPITIS development, s.r.o",
    year: "od roku 2019",
    category: "Bytové & Rodinné domy",
    image: "https://www.talcompany.sk/sources/portfolio/29/capitis_(1).jpg",
    galleryImages: [
      "https://www.talcompany.sk/sources/portfolio/29/capitis_(1).jpg",
      "https://www.talcompany.sk/sources/portfolio/29/capitis_(2).jpg",
      "https://www.talcompany.sk/sources/portfolio/29/capitis_(3).jpg",
      "https://www.talcompany.sk/sources/portfolio/29/capitis_(4).jpg"
    ]
  },
  {
    id: "30",
    title: "ÚVN SNP Ružomberok",
    year: "rekonštrukcia, od roku 2019",
    category: "Školy & Nemocnice",
    image: "https://www.talcompany.sk/sources/portfolio/30/uvn_ruzomberok_(1).jpg",
    galleryImages: [
      "https://www.talcompany.sk/sources/portfolio/30/uvn_ruzomberok_(1).jpg",
      "https://www.talcompany.sk/sources/portfolio/30/uvn_ruzomberok_(10).jpg",
      "https://www.talcompany.sk/sources/portfolio/30/uvn_ruzomberok_(11).jpg",
      "https://www.talcompany.sk/sources/portfolio/30/uvn_ruzomberok_(12).jpg",
      "https://www.talcompany.sk/sources/portfolio/30/uvn_ruzomberok_(13).jpg",
      "https://www.talcompany.sk/sources/portfolio/30/uvn_ruzomberok_(14).jpg",
      "https://www.talcompany.sk/sources/portfolio/30/uvn_ruzomberok_(15).jpg",
      "https://www.talcompany.sk/sources/portfolio/30/uvn_ruzomberok_(16).jpg",
      "https://www.talcompany.sk/sources/portfolio/30/uvn_ruzomberok_(17).jpg",
      "https://www.talcompany.sk/sources/portfolio/30/uvn_ruzomberok_(18).jpg",
      "https://www.talcompany.sk/sources/portfolio/30/uvn_ruzomberok_(19).jpg",
      "https://www.talcompany.sk/sources/portfolio/30/uvn_ruzomberok_(2).jpg",
      "https://www.talcompany.sk/sources/portfolio/30/uvn_ruzomberok_(3)-1.jpg",
      "https://www.talcompany.sk/sources/portfolio/30/uvn_ruzomberok_(4).jpg",
      "https://www.talcompany.sk/sources/portfolio/30/uvn_ruzomberok_(5).jpg",
      "https://www.talcompany.sk/sources/portfolio/30/uvn_ruzomberok_(6).jpg",
      "https://www.talcompany.sk/sources/portfolio/30/uvn_ruzomberok_(7).jpg",
      "https://www.talcompany.sk/sources/portfolio/30/uvn_ruzomberok_(8).jpg",
      "https://www.talcompany.sk/sources/portfolio/30/uvn_ruzomberok_(9).jpg"
    ]
  },
  {
    id: "31",
    title: "ÚVN SNP poliklinika Trenčín",
    year: "rekonštrukcia, od roku 2020",
    category: "Školy & Nemocnice",
    image: "https://www.talcompany.sk/sources/portfolio/31/poliklinika_trencin_(1).jpg",
    galleryImages: [
      "https://www.talcompany.sk/sources/portfolio/31/poliklinika_trencin_(1).jpg",
      "https://www.talcompany.sk/sources/portfolio/31/poliklinika_trencin_(2).jpg",
      "https://www.talcompany.sk/sources/portfolio/31/poliklinika_trencin_(3).jpg",
      "https://www.talcompany.sk/sources/portfolio/31/poliklinika_trencin_(4).jpg"
    ]
  }
];

function GalleryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [selectedCategory, setSelectedCategory] = useState("Všetko");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [lightboxImageIdx, setLightboxImageIdx] = useState<number | null>(null);

  // Parse queries
  useEffect(() => {
    const projectId = searchParams.get("id");
    if (projectId) {
      const found = PROJECTS_DATA.find((p) => p.id === projectId);
      if (found) {
        setSelectedProject(found);
      }
    }
  }, [searchParams]);

  const filteredProjects = selectedCategory === "Všetko"
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === selectedCategory);

  const handleOpenProject = (project: Project) => {
    setSelectedProject(project);
    router.push(`/galeria?id=${project.id}`, { scroll: false });
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
    router.push("/galeria", { scroll: false });
  };

  return (
    <div className="py-20 md:py-28 bg-white flex flex-col w-full">
      <div className="max-w-[95%] mx-auto px-6 space-y-12">
        {/* Title */}
        <div className="max-w-3xl space-y-4">
          <span className="text-brand-blue font-semibold uppercase tracking-wider text-sm">— PORTFÓLIO</span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-brand-dark-gray uppercase">
            Galéria Realizácií
          </h1>
          <p className="text-lg text-gray-500 font-medium leading-relaxed">
            Pozrite si prehľad našich úspešných stavebných a rekonštrukčných prác realizovaných na Slovensku a v Českej republike od roku 2006.
          </p>
        </div>

        {/* Filter categories tabs */}
        <div className="flex flex-wrap gap-3 pb-4 border-b border-gray-100">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-brand-blue text-white"
                  : "bg-brand-light-gray text-brand-dark-gray hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid of Projects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleOpenProject(project)}
              className="group cursor-pointer bg-brand-light-gray border border-gray-100 overflow-hidden shadow-sm"
            >
              <div className="relative h-[260px] w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-brand-dark-gray/10 group-hover:bg-brand-blue/80 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Maximize2 className="text-white w-8 h-8" />
                </div>
              </div>
              <div className="p-6 space-y-2">
                <span className="text-xs font-semibold text-brand-blue uppercase tracking-wider">
                  {project.category}
                </span>
                <h3 className="text-lg font-bold text-brand-dark-gray leading-tight group-hover:text-brand-blue transition-colors">
                  {project.title}
                </h3>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest pt-1">
                  {project.year}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Project Detail Overlay Modal --- */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-brand-black/70 backdrop-blur-md flex justify-center items-start overflow-y-auto py-12 px-6">
          <div className="bg-white w-full max-w-6xl shadow-2xl relative border border-gray-100">
            {/* Close Button */}
            <button
              onClick={handleCloseProject}
              className="absolute top-6 right-6 z-10 text-brand-dark-gray hover:text-brand-blue p-2 bg-brand-light-gray transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Content */}
            <div className="p-8 md:p-12 space-y-8">
              <div className="space-y-2 max-w-4xl">
                <span className="text-sm font-semibold text-brand-blue uppercase tracking-widest">
                  {selectedProject.category}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-brand-dark-gray uppercase">
                  {selectedProject.title}
                </h2>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  {selectedProject.year}
                </p>
              </div>

              {/* Gallery Images Grid inside project */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-4 border-t border-gray-100">
                {selectedProject.galleryImages.map((imgSrc, idx) => (
                  <div
                    key={idx}
                    onClick={() => setLightboxImageIdx(idx)}
                    className="group relative aspect-square bg-gray-100 overflow-hidden cursor-zoom-in shadow-sm hover:opacity-85 transition-opacity"
                  >
                    <Image
                      src={imgSrc}
                      alt={`${selectedProject.title} detail ${idx + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- Second Layer Lightbox (Full Screen Zoom) --- */}
      {selectedProject && lightboxImageIdx !== null && (
        <div 
          className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center select-none"
          onClick={() => setLightboxImageIdx(null)}
        >
          {/* Close */}
          <button
            onClick={() => setLightboxImageIdx(null)}
            className="absolute top-6 right-6 text-white hover:text-gray-300 p-2 bg-white/10 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxImageIdx((prev) => 
                prev !== null 
                  ? (prev - 1 + selectedProject.galleryImages.length) % selectedProject.galleryImages.length 
                  : null
              );
            }}
            className="absolute left-6 text-white hover:text-gray-300 p-3 bg-white/10 rounded-full z-10"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Image */}
          <div 
            className="relative w-[90vw] h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedProject.galleryImages[lightboxImageIdx]}
              alt="Zoomed Detail"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Right Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxImageIdx((prev) => 
                prev !== null 
                  ? (prev + 1) % selectedProject.galleryImages.length 
                  : null
              );
            }}
            className="absolute right-6 text-white hover:text-gray-300 p-3 bg-white/10 rounded-full z-10"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm font-semibold">
            {lightboxImageIdx + 1} / {selectedProject.galleryImages.length}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Gallery() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white text-brand-dark-gray font-semibold text-lg uppercase tracking-widest">
        Načítavam galériu...
      </div>
    }>
      <GalleryContent />
    </Suspense>
  );
}

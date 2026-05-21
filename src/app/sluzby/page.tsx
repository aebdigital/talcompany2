import React from "react";
import { 
  Wrench, 
  Flame, 
  Droplet, 
  Home, 
  Trees, 
  Compass, 
  Network, 
  Building2 
} from "lucide-react";

const SERVICES_DATA = [
  {
    title: "Servisné a udržiavacie práce pre všetky druhy stavieb",
    icon: Wrench,
    description: "Komplexný stavebno-technický servis pre prevádzku a bezproblémový stav nehnuteľností.",
    bullets: [
      "Stavebné práce - opravy stien, omietok, obkladov, podláh a dlažby",
      "Zváračské a zámočnícke práce - výroba oceľových konštrukcií",
      "Elektroinštalačné práce vrátane odborných prehliadok a skúšok",
      "Vodoinštalačné, kanalizačné a sanitárne práce",
      "Čistiace práce - podlahy, okná, steny, strechy",
      "Maliarske a natieračské práce, protiplesňové nátery",
      "Komplexná dodávka vzduchotechnických zariadení"
    ]
  },
  {
    title: "Zatepľovanie budov",
    icon: Flame,
    description: "Moderné a certifikované tepelnoizolačné systémy na úsporu energií a zlepšenie komfortu.",
    bullets: [
      "Kontaktné zatepľovacie systémy ETICS",
      "Rekonštrukcia a modernizácia fasád",
      "Strešné zateplenie a hydroizolácia",
      "Energetické audity a technické poradenstvo",
      "Použitie výhradne certifikovaných a odolných materiálov"
    ]
  },
  {
    title: "Hydroizolácia stavieb, komunikácií a tunelov",
    icon: Droplet,
    description: "Profesionálna ochrana pred zemnou vlhkosťou, zrážkovou a tečúcou vodou pre trvanlivé stavby.",
    bullets: [
      "Hydroizolácia základov a suterénnych konštrukcií",
      "Izolácie plochých striech, balkónov, terás a loggií",
      "Hydroizolácia komunikácií, mostoviek a nadjazdov",
      "Špecializované hydroizolácie tunelov a podzemných diel",
      "Sanácia, injektáže a odvlhčenie starého muriva"
    ]
  },
  {
    title: "Výstavba rodinných domov na kľúč",
    icon: Home,
    description: "Kompletné zrealizovanie vašej vízie rodinného bývania od výkopových prác až po finálne stierky.",
    bullets: [
      "Zabezpečenie projektovej dokumentácie a inžinieringu",
      "Hrubá stavba - základy, nosné murivo, krovy a strecha",
      "Vnútorné inštalácie - elektrina, voda, plyn, kúrenie",
      "Dokončovacie práce - potery, stierky, obklady a podlahy",
      "Kolaudácia a odovzdanie hotového domu s certifikátmi"
    ]
  },
  {
    title: "Záhradná a krajinná architektúra",
    icon: Trees,
    description: "Kvalitný návrh, zemné úpravy, výsadby a následný pravidelný servis zelených plôch.",
    bullets: [
      "Sadovnícke a terénne úpravy pri rezidenčných a komerčných stavbách",
      "Výsadba okrasných drevín, krov a kvetinových záhonov",
      "Pokládka kobercových trávnikov a výsev",
      "Návrh a realizácia záhradných jazierok a vodných prvkov",
      "Údržba zelene - kosenie, hnojenie, mulčovanie, jarný/jesenný rez"
    ]
  },
  {
    title: "Úprava spevnených plôch a terénov",
    icon: Compass,
    description: "Kvalitné betónové, kamenné a asfaltové spevnené plochy pre bezproblémový prejazd a chôdzu.",
    bullets: [
      "Výstavba a rekonštrukcie ciest, chodníkov a parkovísk",
      "Pokládka zámkovej, betónovej a kamennej dlažby",
      "Odvodnenie spevnených plôch a terénne modelácie",
      "Pokládka asfaltových a živičných vrstiev"
    ]
  },
  {
    title: "Stavby inžinierskych sietí",
    icon: Network,
    description: "Inžinierske siete od prípojok po zložité kmeňové rozvody pre priemysel a bytové domy.",
    bullets: [
      "Prípojky elektrickej energie, plynu, vody a kanalizácie",
      "Výstavba kmeňových vodovodov a kanalizačných zberačov",
      "Montáž a zapojenie telekomunikačných optických sietí",
      "Kompletné zamerania, projekčná koordinácia a geodetické plány"
    ]
  },
  {
    title: "Developerská a obchodná činnosť",
    icon: Building2,
    description: "Profesionálny proces od vyhľadania pozemku cez stavebnú inžiniersku činnosť až po predaj.",
    bullets: [
      "Majetkovo-právne vysporiadanie pozemkov a nehnuteľností",
      "Kompletná inžinierska činnosť - stavebné povolenia, územné rozhodnutia",
      "Koordinácia subdodávateľov, stavebný a technický dozor",
      "Príprava rozpočtov, kalkulácií a tendrových podkladov",
      "Komunikácia s úradmi, dotknutými orgánmi a investormi"
    ]
  }
];

export default function Services() {
  return (
    <div className="py-20 md:py-28 bg-white flex flex-col w-full">
      <div className="max-w-[95%] mx-auto px-6 space-y-16">
        {/* Header Title */}
        <div className="max-w-3xl space-y-4">
          <span className="text-brand-blue font-semibold uppercase tracking-wider text-sm">— NAŠA EXPERTÍZA</span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-brand-dark-gray uppercase">
            Naše Služby
          </h1>
          <p className="text-lg text-gray-500 font-medium leading-relaxed">
            Poskytujeme komplexné stavebné, inžinierske a obchodné riešenia od A po Z s dôrazom na maximálnu profesionalitu, spoľahlivosť a dodržanie časových harmonogramov.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES_DATA.map((service, i) => {
            const Icon = service.icon;
            return (
              <div 
                key={i} 
                className="bg-brand-light-gray p-8 hover:shadow-xl hover:bg-white transition-all duration-300 border border-gray-100 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Icon and Title */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-brand-blue/10 rounded-none shrink-0">
                      <Icon className="w-8 h-8 text-brand-blue" />
                    </div>
                    <h2 className="text-xl font-bold text-brand-dark-gray tracking-wide mt-1 uppercase">
                      {service.title}
                    </h2>
                  </div>

                  {/* Description */}
                  <p className="text-gray-500 text-sm leading-relaxed font-medium">
                    {service.description}
                  </p>

                  {/* Bullet points */}
                  <ul className="space-y-2 pt-2">
                    {service.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex gap-2 text-xs font-semibold text-brand-dark-gray leading-normal uppercase">
                        <span className="text-brand-blue shrink-0">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

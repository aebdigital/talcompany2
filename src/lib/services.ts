export type Service = {
  title: string;
  description: string;
  image: string;
  alt: string;
  bullets: string[];
};

export const SERVICES: Service[] = [
  {
    title: "Servisné a udržiavacie práce pre všetky druhy stavieb",
    description: "Poskytujeme komplexné servisné a udržiavacie práce pre všetky druhy stavieb. Naše služby zahŕňajú široké spektrum stavebných, technických a čistiacich prác.",
    image: "/sources/stav3.jpg",
    alt: "Servisné a udržiavacie práce",
    bullets: [
      "Stavebné práce - opravy stien, omietok, obkladov, podláh a dlažby",
      "Zváračské a zámočnícke práce - výroba oceľových konštrukcií",
      "Elektroinštalačné práce vrátane odborných prehliadok a skúšok",
      "Vodoinštalačné, kanalizačné a sanitárne práce",
      "Čistiace práce - podlahy, okná, steny, strechy",
      "Maliarske a natieračské práce, protiplesňové nátery",
      "Komplexná dodávka vzduchotechnických zariadení",
    ],
  },
  {
    title: "Komplexné technické riešenia v oblasti zatepľovania budov",
    description: "Moderné a efektívne zatepľovacie systémy pre všetky typy budov. Zabezpečujeme zvýšenie energetickej účinnosti a komfortu s použitím najkvalitnejších materiálov.",
    image: "/sources/portfolio/HERO=EXTRA.jpg",
    alt: "Zatepľovanie budov",
    bullets: [
      "Kontaktné zatepľovacie systémy ETICS",
      "Rekonštrukcia a modernizácia fasád",
      "Strešné zateplenie a izolácia",
      "Energetické audity a poradenstvo",
      "Certifikované materiály a technológie",
    ],
  },
  {
    title: "Hydroizolácia stavieb, komunikácií a tunelov",
    description: "Profesionálne hydroizolačné práce zabezpečujúce ochranu vašich stavieb pred vlhkosťou a vodou. Používame osvedčené technológie a materiály pre dlhodobú ochranu.",
    image: "/sources/izolacia.jpg",
    alt: "Hydroizolácia",
    bullets: [
      "Hydroizolácia základov a pivníc",
      "Hydroizolácia striech a terás",
      "Hydroizolácia komunikácií a mostov",
      "Hydroizolácia tunelov a podzemných objektov",
      "Sanácia vlhkých múrov a konštrukcií",
    ],
  },
  {
    title: "Stavby domov na kľúč",
    description: "Komplexné riešenie výstavby rodinných domov od projektu po kolaudáciu. Zabezpečujeme všetky potrebné kroky výstavby s dôrazom na kvalitu a dodržanie termínov.",
    image: "/sources/RD1.jpg",
    alt: "Stavby domov na kľúč",
    bullets: [
      "Projektová príprava a stavebné povolenia",
      "Základové a nosné konštrukcie",
      "Kompletné stavebné práce - murivo, strechy, izolácue",
      "Dokončovacie práce a vnútorné vybavenie",
      "Kolaudácia a odovzdanie stavby",
    ],
  },
  {
    title: "Záhradná a krajinná architektúra",
    description: "Komplexné služby v oblasti záhradnej a krajinnej architektúry. Od návrhu cez realizáciu až po údržbu zelených plôch a okrasných záhrad.",
    image: "/sources/portfolio/1/lozorno_005.jpg",
    alt: "Záhradná a krajinná architektúra",
    bullets: [
      "Realizácia sadovníckych úprav a krajinnej architektúry",
      "Sadovnícke a zemné práce pri výstavbách",
      "Výsadba okrasných rastlín a drevín",
      "Zakladanie trávnika výsevom a pokladaním kobercov",
      "Realizácia okrasných jazierok",
      "Údržba zelene - kosenie, strihanie, hnojenie, mulčovanie",
    ],
  },
  {
    title: "Úpravy spevnených plôch a terénov (komunikácie, chodníky)",
    description: "Profesionálne úpravy a výstavba komunikácií, chodníkov a parkovísk. Zabezpečujeme kvalitné a trvanlivé riešenia pre všetky typy spevnených plôch.",
    image: "/sources/KOM3.png",
    alt: "Úpravy spevnených plôch",
    bullets: [
      "Výstavba a rekonštrukcia komunikácií",
      "Chodníky a cyklistické trasy",
      "Parkoviská a námestia",
      "Terénne úpravy a odvodnenie",
      "Asfaltové a betónové povrchy",
    ],
  },
  {
    title: "Stavby inžinierskych sietí",
    description: "Kompletná realizácia inžinierskych sietí - elektrické, vodovod, kanalizácia, plyn. Zabezpečujeme projektovanie, výstavbu a pripojenie na verejné siete.",
    image: "/sources/kanal.jpg",
    alt: "Inžinierske siete",
    bullets: [
      "Elektrické rozvody a prípojky",
      "Vodovodné a kanalizačné prípojky",
      "Plynovodné rozvody a pripojenia",
      "Telekomunikačné siete a káblové rozvody",
      "Projektovanie a koordinácia sietí",
    ],
  },
  {
    title: "Developerská a obchodná činnosť",
    description: "Komplexné developerské služby od majetko-právneho vysporiadania nehnuteľností až po kolaudáciu stavby. Zabezpečujeme celý proces od A po Z s profesionálnym prístupom.",
    image: "/sources/dev2.jpg",
    alt: "Developerská činnosť",
    bullets: [
      "Majetko-právne vysporiadanie nehnuteľností",
      "Zabezpečenie podkladov pre projekčnú činnosť",
      "Výkon inžinierskej činnosti - povolenia a rozhodnutia",
      "Koordinácia projektov od prípravy po realizáciu",
      "Komunikácia a vyjednávanie s úradmi a investormi",
      "Príprava tender dokumentácie",
    ],
  },
];

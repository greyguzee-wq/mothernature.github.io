/**
 * ============================================================
 * DANE PRODUKTÓW - Mother Nature Coffee / Ekspresy Jettino
 * ============================================================
 * 
 * JAK DODAĆ NOWE PRODUKTY:
 * 1. Dodaj nowy obiekt do tablicy PRODUCTS poniżej
 * 2. Każdy produkt potrzebuje: id, name, category, price, image, description, specs
 * 3. Umieść zdjęcie produktu w /assets/images/products/
 * 4. Kategorie: "espresso", "capsule", "commercial", "grinder", "accessories"
 * 5. Strona automatycznie wykryje nowy produkt
 * 
 * PRZYKŁAD:
 * {
 *   id: "jettino-new",
 *   name: "Jettino NewModel",
 *   category: "espresso",
 *   price: 899,
 *   image: "assets/images/products/jettino-new.jpg",
 *   badge: "Nowość",              // opcjonalne: "Nowość", "Bestseller", "Promocja" itd.
 *   description: "Krótki opis marketingowy.",
 *   specs: {
 *     "Ciśnienie": "15 bar",
 *     "Zbiornik na wodę": "2L",
 *     "Wymiary": "30×40×35 cm",
 *     "Waga": "8 kg",
 *     "Moc": "1400W",
 *     "Gwarancja": "2 lata"
 *   }
 * }
 * ============================================================
 */

const PRODUCTS = [
  {
    id: "jettino-compact",
    name: "Jettino Compact",
    category: "espresso",
    price: 649,
    image: "assets/images/products/jettino-compact.jpg",
    badge: "Bestseller",
    description: "Idealny wybór na start w świecie kawy premium. Kompaktowy design z profesjonalną ekstrakcją dla bogatej, pełnej w smaku kawy.",
    specs: {
      "Ciśnienie": "15 bar",
      "Zbiornik na wodę": "1.5L",
      "Wymiary": "25×33×30 cm",
      "Waga": "6.2 kg",
      "Moc": "1350W",
      "Młynek": "Zintegrowany stożkowy",
      "Gwarancja": "2 lata"
    }
  },
  {
    id: "jettino-pro",
    name: "Jettino Pro",
    category: "commercial",
    price: 3299,
    image: "assets/images/products/jettino-pro.jpg",
    badge: "",
    description: "Profesjonalny ekspres kolbowy z dwiema grupami zaparzającymi, stworzony do kawiarni i restauracji o dużym ruchu. Precyzyjna kontrola temperatury i mocna para.",
    specs: {
      "Ciśnienie": "15 bar",
      "Bojler": "Podwójny 1.8L + 11.5L",
      "Grupy": "2",
      "Wymiary": "74×52×54 cm",
      "Waga": "58 kg",
      "Moc": "3400W",
      "Dysze pary": "2",
      "Gwarancja": "3 lata"
    }
  },
  {
    id: "jettino-elite",
    name: "Jettino Elite",
    category: "espresso",
    price: 1899,
    badge: "Nowość",
    image: "assets/images/products/jettino-elite.jpg",
    description: "Superautomatyczny ekspres z ekranem dotykowym. Od ziaren do filiżanki w mniej niż 60 sekund — espresso, cappuccino, latte i więcej jednym przyciskiem.",
    specs: {
      "Ciśnienie": "19 bar",
      "Zbiornik na wodę": "2.5L",
      "Pojemnik na ziarna": "300g",
      "Wyświetlacz": "4.3\" kolorowy dotykowy",
      "Wymiary": "28×38×36 cm",
      "Waga": "9.8 kg",
      "Moc": "1500W",
      "System mleka": "Automatyczny spieniacz",
      "Napoje": "12 programowalnych",
      "Gwarancja": "2 lata"
    }
  },
  {
    id: "jettino-capsule",
    name: "Jettino Capsule",
    category: "capsule",
    price: 249,
    image: "assets/images/products/jettino-capsule.jpg",
    badge: "",
    description: "Elegancki ekspres kapsułkowy na jedną porcję. Wysokiej jakości ekstrakcja bez bałaganu. Kompatybilny z kapsułkami Jettino i Nespresso® Original.",
    specs: {
      "Ciśnienie": "19 bar",
      "Zbiornik na wodę": "0.8L",
      "Typ kapsułek": "Jettino / Nespresso® Original",
      "Wymiary": "12×32×24 cm",
      "Waga": "3.1 kg",
      "Moc": "1260W",
      "Czas nagrzewania": "25 sekund",
      "Gwarancja": "2 lata"
    }
  },
  {
    id: "jettino-grinder-x",
    name: "Jettino Grinder X",
    category: "grinder",
    price: 449,
    image: "assets/images/products/jettino-grinder.jpg",
    badge: "",
    description: "Precyzyjny młynek stożkowy z 40 ustawieniami mielenia. Od bardzo drobnego po grube — zawsze równomierna granulacja.",
    specs: {
      "Typ żaren": "Stożkowe stalowe",
      "Ustawienia": "40 stopni",
      "Pojemność zbiornika": "350g",
      "Wymiary": "15×24×38 cm",
      "Waga": "4.5 kg",
      "Moc": "200W",
      "Dozowanie": "Czasowe + ręczne",
      "Gwarancja": "2 lata"
    }
  },
  {
    id: "jettino-office-500",
    name: "Jettino Office 500",
    category: "commercial",
    price: 4599,
    image: "assets/images/products/jettino-office.jpg",
    badge: "Popularny",
    description: "Biurówe rozwiązanie typu bean-to-cup z ekranem dotykowym. Obsługuje do 500 kaw dziennie, posiada automatyczne czyszczenie i monitoring.",
    specs: {
      "Wydajność": "500 filiżanek/dzień",
      "Woda": "Podłączenie bezpośrednie lub zbiornik 5L",
      "Pojemniki na ziarna": "2 × 1kg",
      "Wyświetlacz": "10\" HD dotykowy",
      "Wymiary": "42×55×68 cm",
      "Waga": "38 kg",
      "Moc": "2200W",
      "Napoje": "24 konfigurowalne",
      "Łączność": "Wi-Fi + monitoring",
      "Gwarancja": "3 lata"
    }
  },
  {
    id: "jettino-mini",
    name: "Jettino Mini",
    category: "espresso",
    price: 399,
    image: "assets/images/products/jettino-compact.jpg",
    badge: "",
    description: "Ultrakompaktowy ekspres do małych kuchni i podróży. Pełna ekstrakcja 15 bar w obudowie mniejszej niż książka.",
    specs: {
      "Ciśnienie": "15 bar",
      "Zbiornik na wodę": "0.7L",
      "Wymiary": "18×28×25 cm",
      "Waga": "3.8 kg",
      "Moc": "1100W",
      "Gwarancja": "2 lata"
    }
  },
  {
    id: "jettino-barista",
    name: "Jettino Barista",
    category: "espresso",
    price: 1299,
    image: "assets/images/products/jettino-elite.jpg",
    badge: "Bestseller",
    description: "Półautomatyczny ekspres z kontrolą temperatury PID i manometrem. Dla domowego baristy, który chce pełnej kontroli nad ekstrakcją.",
    specs: {
      "Ciśnienie": "15 bar (manometr)",
      "Bojler": "Thermoblock + PID",
      "Zbiornik na wodę": "2L",
      "Portafilter": "58mm profesjonalny",
      "Wymiary": "30×40×35 cm",
      "Waga": "11 kg",
      "Moc": "1450W",
      "Dysza pary": "Profesjonalna",
      "Gwarancja": "2 lata"
    }
  }
];

/**
 * KATEGORIE - Dodawaj nowe kategorie w razie potrzeby
 */
const CATEGORIES = [
  { id: "all", label: "Wszystkie ekspresy" },
  { id: "espresso", label: "Espresso" },
  { id: "capsule", label: "Kapsułkowe" },
  { id: "commercial", label: "Profesjonalne" },
  { id: "grinder", label: "Młynki" },
  { id: "accessories", label: "Akcesoria" }
];
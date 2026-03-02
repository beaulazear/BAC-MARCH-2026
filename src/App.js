import { useState, useEffect } from "react";
import './App.css';
import { ArtCanvas } from "./components/ArtCanvas";
import { BurstCards } from "./components/BurstCards";
import {
  PawPrint,
  TreePine,
  Home as HomeIcon,
  MessageCircleHeart,
  MapPin,
  Dog,
  Heart,
  Phone,
  Mail,
  Instagram,
} from "lucide-react";
import beauDogsPhoto from "./images/BeauReykaMangoRu.jpeg";
import marmosetPhoto from "./images/Marmoset.jpeg";
import beauAndRuPhoto from "./images/BeauAndRu.JPG";
import fiveDogsPhoto from "./images/5Dogs.jpeg";
import beauAndHornbillPhoto from "./images/BeauAndHornbill.jpeg";
import beauAndRuthPhoto from "./images/BeauAndRuth.jpeg";
import sagePhoto from "./images/Sage.jpeg";

const servicesCards = [
  {
    id: "service-areas",
    title: "Service Locations",
    columnLayout: true,
    columns: [
      {
        label: "Midday walks:",
        value: "Carroll Gardens, Cobble Hill, Gowanus"
      },
      {
        label: "Off-hours walks:",
        value: "Prospect Heights, North Park Slope"
      },
      {
        label: "Pet sitting:",
        value: "Available throughout NYC depending on schedule"
      }
    ],
    shape: "pill",
    icon: MapPin,
    color: "#2E8543",
  },
  {
    id: "walk",
    title: "Dog Walks",
    content:
      "$25 (20-30 min) • $35 (50-60 min). Add $10 for additional dog, $5 for solo walk or off-hours. Photo updates included with every walk.",
    shape: "square",
    tag: "From $25",
    icon: Dog,
    color: "#5C3E9E",
    image: fiveDogsPhoto,
    imageSize: "small",
  },
  {
    id: "petsitting",
    title: "Pet Sitting",
    content:
      "$95 overnight care in your home. Morning, evening, and bedtime walks included. Add $15 for 4th midday walk, $25 for additional dog.",
    shape: "square",
    tag: "$95/night",
    icon: HomeIcon,
    color: "#2E8543",
    image: beauAndRuthPhoto,
    imageSize: "small",
  },
  {
    id: "catvisits",
    title: "Cat Visits",
    content:
      "$25 (one visit) • $40 (two visits). Includes litter box cleaning, feeding, playtime, and companionship. Mail collection and plant watering available.",
    shape: "square",
    tag: "From $25",
    icon: PawPrint,
    color: "#D2494A",
    image: sagePhoto,
    imageSize: "small",
  },
  {
    id: "exotic",
    title: "Exotic Care",
    content:
      "$30 per visit. Professional care for birds, reptiles, and small mammals. Enclosure cleaning, feeding, heat lamp monitoring. 10+ years zoo experience.",
    shape: "square",
    tag: "$30",
    icon: TreePine,
    color: "#5C3E9E",
    image: marmosetPhoto,
    imageSize: "small",
  },
  {
    id: "home",
    title: "Go Back Home",
    content: "",
    shape: "small-center",
    color: "#7A8E6E",
    isHomeButton: true,
  },
];

const aboutCards = [
  {
    id: "intro",
    title: "Hi, I'm Beau ❥",
    content:
      "Lifelong animal lover, originally from Ohio. I moved to NYC in 2016 and built my career in professional animal care — from intern to full-time keeper at the Prospect Park Zoo, then vet assistant at the ASPCA and a local veterinarian's office. Those experiences and the amazing pet owners I met along the way inspired me to create Beau's Animal Care.",
    shape: "wide-left",
    icon: Heart,
    color: "#D2494A",
    image: beauDogsPhoto,
    link: {
      url: "https://www.beaulazear.com/#/resume",
      label: "View My Full Resume",
    },
  },
  {
    id: "trust",
    title: "50+ Regular Clients",
    content:
      "With over 10 years of professional animal care experience, your pet's safety, comfort, and happiness are my top priorities. I work with clients on a recurring basis for midday walks and pet sitting throughout Brooklyn, and also accept one-time appointments for pet sitting across NYC.",
    shape: "narrow-right",
    color: "#5C3E9E",
  },
  {
    id: "brooklyn",
    title: "Serving Brooklyn",
    content:
      "Carroll Gardens, Cobble Hill, & Gowanus for mid day walks. Prospect Heights, North Park Slope, & Crown Heights for adhoc appointments. All of NYC for pet sitting! Your pet isn't just a client — they're family. And family deserves someone with real experience, real care, and a genuine love for animals.",
    shape: "wide-left",
    color: "#D2494A",
    image: beauAndRuPhoto,
    imagePosition: "right",
  },
  {
    id: "contact",
    title: "Contact Me ☎",
    content:
      "Ready to meet? Let's schedule a free meet-and-greet to see if we're a good fit for your pet's needs.",
    shape: "narrow-right",
    icon: MessageCircleHeart,
    color: "#2E8543",
    contacts: [
      {
        type: "phone",
        icon: Phone,
        label: "(718) 614-1878",
        url: "tel:7186141878",
      },
      {
        type: "email",
        icon: Mail,
        label: "beaulazear@gmail.com",
        url: "mailto:beaulazear@gmail.com",
      },
      {
        type: "instagram",
        icon: Instagram,
        label: "@beaus.animal.care",
        url: "https://www.instagram.com/beaus.animal.care/",
      },
    ],
  },
  {
    id: "home",
    title: "Go Back Home",
    content: "",
    shape: "small-center",
    color: "#7A8E6E",
    isHomeButton: true,
  },
];

const contactCards = [
  {
    id: "instagram",
    title: "Follow me on IG ᵔᴗᵔ",
    content: "@beaus.animal.care",
    shape: "third",
    icon: Instagram,
    color: "#D2494A",
    link: {
      url: "https://www.instagram.com/beaus.animal.care/",
      label: "Open Instagram",
    },
  },
  {
    id: "phone",
    title: "Give me a call ☎",
    content: "(718) 614-1878",
    shape: "third",
    icon: Phone,
    color: "#2E8543",
    link: {
      url: "tel:7186141878",
      label: "Call Now",
    },
  },
  {
    id: "email",
    title: "Or send an email! ✉",
    content: "beaulazear@gmail.com",
    shape: "third",
    icon: Mail,
    color: "#5C3E9E",
    link: {
      url: "mailto:beaulazear@gmail.com",
      label: "Send Email",
    },
  },
  {
    id: "home",
    title: "Go Back Home",
    content: "",
    shape: "small-center",
    color: "#7A8E6E",
    isHomeButton: true,
  },
];

function App() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [clickOrigin, setClickOrigin] = useState(null);

  // Preload modal images when component mounts
  useEffect(() => {
    const imagesToPreload = [
      beauDogsPhoto,
      marmosetPhoto,
      beauAndRuPhoto,
      fiveDogsPhoto,
      beauAndHornbillPhoto,
      beauAndRuthPhoto,
      sagePhoto,
    ];

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <>
      <ArtCanvas
        onOpenServices={(origin) => {
          setClickOrigin(origin);
          setServicesOpen(true);
        }}
        onOpenAbout={(origin) => {
          setClickOrigin(origin);
          setAboutOpen(true);
        }}
        onOpenContact={(origin) => {
          setClickOrigin(origin);
          setContactOpen(true);
        }}
      />
      <BurstCards
        cards={servicesCards}
        open={servicesOpen}
        onClose={() => setServicesOpen(false)}
        origin={clickOrigin}
        accentColor="#5B4E8C"
      />
      <BurstCards
        cards={aboutCards}
        open={aboutOpen}
        onClose={() => setAboutOpen(false)}
        origin={clickOrigin}
        accentColor="#C85A4A"
      />
      <BurstCards
        cards={contactCards}
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        origin={clickOrigin}
        accentColor="#7A8E6E"
      />
    </>
  );
}

export default App;

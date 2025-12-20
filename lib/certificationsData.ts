export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  pdfUrl: string;
  thumbnail?: string; // Optional: Image preview of the cert
}

export const certifications: Certification[] = [
  {
    id: "SkySkill",
    title: "Java Developer Intern",
    issuer: "SkySkill Academy",
    date: "2025",
    pdfUrl: "/certificates/SkySkill.pdf",
  },
    {
    id: "LaunchedGlobal",
    title: "Web Development Intern",
    issuer: "Launched Global",
    date: "2025",
    pdfUrl: "/certificates/Paritosh Dash Web.pdf",
  },
  {
    id: "SpokenTutorial",
    title: "PHP and MySQL",
    issuer: "Spoken Tutorial",
    date: "2025",
    pdfUrl: "/certificates/PHP and MySQL.pdf",
  },
  {
    id: "Hedera",
    title: "Hashgraph Developer Course",
    issuer: "Hedera",
    date: "25-NOV-2025",
    pdfUrl: "/certificates/Hashgraph Developer Course.pdf",
  },
];
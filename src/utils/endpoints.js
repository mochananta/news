const BASE_URL = process.env.BASE_URL || "";

const endpoints = [
  {
    primary: "antara",
    paths: ["terbaru", "politik", "hukum", "ekonomi", "bola", "olahraga", "humaniora", "lifestyle", "hiburan", "dunia", "tekno", "otomotif"],
  },
  {
    primary: "cnbc",
    paths: ["terbaru", "investment", "news", "market", "entrepreneur", "syariah", "tech", "lifestyle", "opini", "profil"],
  },
  {
    primary: "cnn",
    paths: ["terbaru", "nasional", "internasional", "ekonomi", "olahraga", "teknologi", "hiburan", "gayaHidup"],
  },
  {
    primary: "jpnn",
    paths: ["terbaru"],
  },
  {
    primary: "kumparan",
    paths: ["terbaru"],
  },
  {
    primary: "merdeka",
    paths: ["terbaru", "jakarta", "dunia", "gaya", "olahraga", "teknologi", "otomotif", "khas", "sehat", "jateng"],
  },
  {
    primary: "okezone",
    paths: ["terbaru", "celebrity", "sports", "otomotif", "economy", "techno", "lifestyle", "bola"],
  },
  {
    primary: "republika",
    paths: ["terbaru", "news", "daerah", "khazanah", "islam", "internasional", "bola", "leisure"],
  },
  {
    primary: "suara",
    paths: ["terbaru", "bisnis", "bola", "lifestyle", "entertainment", "otomotif", "tekno", "health"],
  },
  {
    primary: "tempo",
    paths: ["nasional", "bisnis", "metro", "dunia", "bola", "cantik", "tekno", "otomotif", "seleb", "gaya", "travel", "difabel", "creativelab", "inforial", "event"],
  },
  {
    primary: "tribun",
    paths: ["terbaru", "bisnis", "superskor", "sport", "seleb", "lifestyle", "travel", "parapuan", "otomotif", "techno", "kesehatan"],
  },
];

const endpointsOverview = endpoints.map((endpoint) => {
  return {
    name: endpoint.primary,
    paths: endpoint.paths.map((pathName) => {
      return {
        name: pathName,
        path: `${BASE_URL}/${endpoint.primary.toLowerCase()}/${pathName}/`,
      };
    }),
  };
});

const categoryMapping = {
  olahraga: ["bola", "sport", "sports", "superskor", "olahraga"],
  teknologi: ["tekno", "tech", "technology", "techno", "creativelab"],
  hiburan: ["entertainment", "hiburan", "seleb", "celebrity", "leisure"],
  ekonomi: ["ekonomi", "bisnis", "market", "investment", "entrepreneur", "economy", "inforial"],
  otomotif: ["otomotif"],
  lifestyle: ["lifestyle", "gaya", "cantik", "parapuan", "event"],
  kesehatan: ["health", "kesehatan", "sehat", "difabel"],
  internasional: ["dunia", "internasional", "jakarta", "jateng", "daerah"],
  nasional: ["nasional", "metro", "politik", "hukum", "news", "syariah", "opini"],
  travel: ["travel", "jalan-jalan"],
  humaniora: ["humaniora", "khazanah", "difabel"],
  khas: ["khas"],
  agama: ["islam"],
};

module.exports = { endpoints, endpointsOverview, categoryMapping };

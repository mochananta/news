const BASE_URL = process.env.BASE_URL || "";

const endpoints = [
  // {
  //   primary: "antara",
  //   paths: ["terbaru", "politik", "hukum", "ekonomi", "bola", "olahraga", "humaniora", "lifestyle", "hiburan", "dunia", "tekno", "otomotif"],
  // },
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
    paths: ["terbaru", "lifestyle", "entertainment", "otomotif", "tekno", "health"],
  },
  {
    primary: "tempo",
    paths: ["nasional", "bisnis", "metro", "dunia", "bola", "cantik", "tekno", "otomotif", "seleb", "gaya", "travel", "difabel", "creativelab", "inforial", "event"],
  },
  {
    primary: "tribun",
    paths: ["terbaru", "seleb", "lifestyle", "parapuan", "otomotif", "techno", "kesehatan"],
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
  teknologi: ["tekno", "tech", "technology", "techno", "creativelab", "otomotif"],
  hiburan: ["entertainment", "hiburan", "seleb", "celebrity", "leisure", "lifestyle", "gaya", "cantik", "parapuan", "event", "khas"],
  ekonomi: ["ekonomi", "bisnis", "market", "investment", "entrepreneur", "economy", "inforial", "travel", "jalan-jalan"],
  kesehatan: ["health", "kesehatan", "sehat", "humaniora", "khazanah", "difabel"],
  internasional: ["dunia", "internasional"],
  nasional: ["nasional", "metro", "politik", "hukum", "news", "syariah", "opini", "jakarta", "jateng", "daerah"],
  agama: ["islam"],
};

module.exports = { endpoints, endpointsOverview, categoryMapping };

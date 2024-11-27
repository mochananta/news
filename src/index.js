require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { endpoints, endpointsOverview, categoryMapping } = require("./utils/endpoints");
const feedid = require("feedid");

const app = express();
const PORT = process.env.PORT || 9000;

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate=59");
  next();
});

endpoints.forEach((endpoint) => {
  app.get(`/${endpoint.primary}/:category`, async (req, res) => {
    const { category } = req.params;
    console.log(`Fetching data for: ${endpoint.primary}/${category}`);

    try {
      const response = await feedid[endpoint.primary][category]();
      if (response) {
        return res.status(200).send({ data: response });
      }
      return res.status(404).send({ data: null, message: "Category not found", success: false });
    } catch (error) {
      console.error("Error fetching data:", error);
      return res.status(500).send({
        data: null,
        message: `Internal server error: ${error.message}`,
        success: false,
      });
    }
  });
});

app.get("/kategori/:category", async (req, res) => {
  const { category } = req.params;
  console.log(`Fetching data for category: ${category}`);

  const categoryLower = category.toLowerCase();

  const validPaths = categoryMapping[categoryLower];
  if (!validPaths) {
    return res.status(404).send({
      data: null,
      message: `Category "${category}" is not valid.`,
      success: false,
    });
  }

  let combinedData = [];
  let errors = [];

  await Promise.all(
    endpoints.map(async (endpoint) => {
      const relevantPaths = endpoint.paths.filter((path) => validPaths.includes(path.toLowerCase()));

      if (relevantPaths.length > 0) {
        try {
          const dataForPortal = await Promise.all(
            relevantPaths.map(async (path) => {
              const response = await feedid[endpoint.primary][path]();
              
              // Hanya menampilkan log kesalahan atau pesan sukses
              if (response.success) {
                console.log(`Data fetched successfully for ${endpoint.primary}/${path}`);
              } else {
                console.log(`Error fetching data for ${endpoint.primary}/${path}: ${response.message}`);
              }

              // Proses data hanya jika ada
              const extractedData = response?.data?.posts || [];
              if (Array.isArray(extractedData) && extractedData.length > 0) {
                return extractedData.map((post) => ({
                  link: post.link,
                  title: post.title,
                  pubDate: post.pubDate,
                  description: post.description,
                  thumbnail: post.thumbnail,
                }));
              } else {
                return [];
              }
            })
          );

          if (dataForPortal.length > 0) {
            combinedData.push({
              portal: endpoint.primary,
              subCategory: relevantPaths.join(", "),  
              data: dataForPortal.flat(),
            });
          } else {
            combinedData.push({
              portal: endpoint.primary,
              subCategory: relevantPaths.join(", "),
              data: [],
            });
          }
        } catch (error) {
          errors.push({ portal: endpoint.primary, message: error.message });
        }
      }
    })
  );

  if (combinedData.length === 0) {
    return res.status(404).send({
      data: null,
      message: "No data found for the specified category.",
      success: false,
      errors,
    });
  }

  return res.status(200).send({
    data: combinedData,
    message: "Data fetched successfully.",
    success: true,
    errors: errors.length > 0 ? errors : null,
  });
});


app.get("/kategori/:category/date/:date", async (req, res) => {
  const { category, date } = req.params;
  console.log(`Fetching combined data for category: ${category} and date: ${date}`);

  const categoryLower = category.toLowerCase();
  const validPaths = categoryMapping[categoryLower];

  if (!validPaths) {
    return res.status(404).send({
      data: null,
      message: `Category "${category}" is not valid.`,
      success: false,
    });
  }

  console.log(`Valid paths for category "${category}": ${validPaths.join(", ")}`);

  let combinedData = [];
  let errors = [];

  await Promise.all(
    endpoints.map(async (endpoint) => {
      const relevantPaths = endpoint.paths.filter((path) => validPaths.includes(path.toLowerCase()));

      if (relevantPaths.length > 0) {
        try {
          const dataForPortal = await Promise.all(
            relevantPaths.map(async (path) => {
              const response = await feedid[endpoint.primary][path](date); // Passing date as parameter if needed by the endpoint
              return response;
            })
          );

          if (dataForPortal.length > 0) {
            combinedData.push({
              portal: endpoint.primary,
              data: dataForPortal,
            });
          }
        } catch (error) {
          console.error(`Error fetching data from ${endpoint.primary}:`, error.message);
          errors.push({ portal: endpoint.primary, message: error.message });
        }
      }
    })
  );

  if (combinedData.length === 0) {
    return res.status(404).send({
      data: null,
      message: "No data found for the specified category and date.",
      success: false,
      errors,
    });
  }

  return res.status(200).send({
    data: combinedData,
    message: "Data fetched successfully.",
    success: true,
    errors: errors.length > 0 ? errors : null,
  });
});

app.get("/", (req, res) => {
  return res.send({
    message: "News is up and running!",
    success: true,
    endpoints: endpointsOverview,
  });
});

app.all("*", (req, res) => {
  console.warn(`Route not found: ${req.originalUrl}`);
  return res.status(404).send({ data: null, message: "Not found", success: false });
});

app.listen(PORT, () => {
  console.log(`API server is running on http://localhost:${PORT}`);
});

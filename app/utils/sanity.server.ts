import sanityClient from "@sanity/client";

const sanityProjectId = process.env.SANITY_STUDIO_API_PROJECT_ID ?? "";
const sanityDataset = process.env.SANITY_STUDIO_API_DATASET ?? "";
const sanityApiToken = process.env.SANITY_API_TOKEN ?? "";

const isProduction = process.env.NODE_ENV === "production";

export const client = sanityClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: "2022-02-12",
  token: sanityApiToken,
  useCdn: isProduction, // `false` if you want to ensure fresh data
});

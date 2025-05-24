const productionUrl = "https://osfw.foundation";
const developmentUrl = "http://localhost:8080";

export default {
  name: "Open-Source Firmware Foundation",
  authorName: "Open-Source Firmware Foundation",
  url: process.env.NODE_ENV === "production" ? productionUrl : developmentUrl,
  authorEmail: "contact@osfw.foundation",
  metaDesc: "Open-Source Firmware Foundation is a non-profit organization dedicated to the development and promotion of open-source firmware.",
};

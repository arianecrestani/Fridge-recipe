const serverURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:9000"
    : "https://fridge-recipe-server.vercel.app";

export { serverURL };

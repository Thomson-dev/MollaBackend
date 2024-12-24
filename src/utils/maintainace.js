export const maintenanceMode = (req, res, next) => {
    res.status(503).json({ message: "Service is currently unavailable. Please try again later." });
  };
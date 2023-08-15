export const TryCatch = (controller) => async (req, res, next) => {
  try {
    await controller(req, res);
  } catch (error) {
    console.log("🚀 ~ file: TryCatch.js:5 ~ TryCatch ~ error:", error);
    return next(error);
  }
};

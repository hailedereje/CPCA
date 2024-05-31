
export const validateRequest = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body).then(() => { next() });
  } catch (error) {
    console.error("error happend at validation",error)
    return res.status(400).json({ errors: error.message});
  }
};

import { StructError } from "superstruct";
import ApiError from "../core/ApiError";

export function init(app) {
  app.use((err, req, res, next) => {
    if (err instanceof StructError) {
      const { message } = err;
      res.status(422).json({ code: 4000, message });
      return;
    }
    if (err instanceof ApiError) {
      const { message, statusCode, code } = err;
      res.status(statusCode).json({ code, message });
      return;
    }
    next(err);
  });
}

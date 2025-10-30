import { INTERNAL_ERROR } from "../enums/http-status.enum.js";
import Auth from "../auth/index.js";

const login = (req, res) => {
  try {
    const { email } = req.body;

    const authUser = { id: 1, email };
    const jwt = Auth.generateJWT(authUser);

    res.json({
      jwt,
    });
  } catch (err) {
    res
      .status(INTERNAL_ERROR)
      .json({ error: "Error generating token", message: err });
  }
};

export default {
  login,
};

import User from "../models/User";

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    //email de user para autenticação/login
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    if (!(await user.compareHash(password))) {
      return res.status(400).json({ error: "Senha não coincide" });
    }

    return res.json({ user, token: User.generateToken(user) });
  }
}

export default new SessionController();

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authConfig from "../../config/auth";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

//antes de salvar(inclui update), criptografia da senha
UserSchema.pre("save", async function(next) {
  //se não houve modificação, sair
  if (!this.isModified("password")) {
    return next();
  }
  //criptografa o password com bcryptjs
  this.password = await bcrypt.hash(this.password, 8);
});

//metodo que compara se a senha passada como parametro é igual a senha no db
UserSchema.methods = {
  compareHash(password) {
    return bcrypt.compare(password, this.password);
  }
};

//gerar Token
UserSchema.statics = {
  generateToken({ id }) {
    return jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.ttl
    });
  }
};

export default mongoose.model("User", UserSchema);

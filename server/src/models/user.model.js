import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";
import sequelize from "../db/index.js";

const SALT_ROUNDS = 10;

class User extends Model {
  async isPasswordCorrect(plainPassword) {
    return bcrypt.compare(plainPassword, this.password);
  }

  // strip password (and any sensitive fields) before sending to client
  toSafeObject() {
    const { id, username, email, address, createdAt, updatedAt } = this.get({
      plain: true,
    });
    return { id, username, email, address, createdAt, updatedAt };
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: {
        msg: "Username is already taken",
      },
      validate: {
        notEmpty: { msg: "Username is required" },
        len: {
          args: [3, 50],
          msg: "Username must be between 3 and 50 characters",
        },
      },
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: {
        msg: "Email is already registered",
      },
      validate: {
        notEmpty: { msg: "Email is required" },
        isEmail: { msg: "Email must be a valid email address" },
      },
      set(value) {
        // normalize email to lowercase before saving
        this.setDataValue("email", value?.toLowerCase().trim());
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Password is required" },
      },
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
        }
      },
    },
  },
);

export default User;

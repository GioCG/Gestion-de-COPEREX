import { body, param } from "express-validator";
import { validarCampos } from "./validar-campos.js";
import { existenteEmail,existenteCompanyEmail } from "../helpers/db-validator.js";
import { validarJWT } from "../middleware/validar-jwt.js";


export const registerValidator = [
    body("name", "The name is required").not().isEmpty(),
    body("email", "The email must be valid").isEmail(),
    body("email").custom(existenteEmail),
    body("password", "La contraseña debe tener mínimo 8 caracteres").isLength({ min: 8 }),    
    validarCampos
];

export const companyValidator = [
    body("companyName", "The name is required").not().isEmpty(),
    body("email", "The email must be valid").isEmail(),
    body("email").custom(existenteCompanyEmail),
    validarCampos
];

export const loginValidator = [
    body("email").optional().isEmail().withMessage("Enter a valid email address"),
    body("name").optional().isString().withMessage("Enter a valid name"),
    body("password", "La contraseña debe tener mínimo 8 caracteres").isLength({ min: 8 }),    
    validarCampos
];

export const editPublicacionValidator = [
    validarJWT,
    param("id").isMongoId().withMessage("ID no válido de MongoDB"),
    validarCampos
];
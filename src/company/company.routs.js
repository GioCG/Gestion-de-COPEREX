import { Router } from "express";
import { listCompany,addCompany } from "./company.controler.js";
import {deleteFileOnError} from "../middleware/delete-file-on-error.js"
import {companyValidator} from "../middleware/validator.js"

const router = Router();
 
router.get(
    '/',
    listCompany
);
 
router.post(
    '/',
    companyValidator,
    deleteFileOnError,
    addCompany
)
 
export default router;
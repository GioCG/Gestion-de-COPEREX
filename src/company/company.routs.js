import { Router } from "express";
import { listCompany,addCompany } from "./company.controler.js";
import {deleteFileOnError} from "../middleware/delete-file-on-error.js"

const router = Router();
 
router.get(
    '/',
    listCompany
);
 
router.post(
    '/',
    deleteFileOnError,
    addCompany
)
 
export default router;
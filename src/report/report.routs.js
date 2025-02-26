import { Router } from "express";
import { generateExcelReport } from "../report/report.controller.js";
const router = Router();
 
router.post(
    '/',
    generateExcelReport
)
 
export default router;

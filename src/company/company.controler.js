import Company from './company.model.js'
import { generateExcelFile } from "../report/report.controller.js";


export const listCompany = async (req, res) => {
    try {
        const { limite = 10, desde = 0, orderBy = "name" } = req.query;
        
        let query = { estado: true };

        let sortOrder = {};
        if (orderBy === "yearsOfCareer") {
            sortOrder.yearsOfCareer = -1; 
        } else if (orderBy === "category") {
            sortOrder.category = 1; 
        } else if (orderBy === "name") {
            const direction = req.query.sortDirection === "desc" ? -1 : 1;
            sortOrder.companyName = direction; 
        }

        const limitValue = Math.max(1, Number(limite));
        const skipValue = Math.max(0, Number(desde));

        const [total, companies] = await Promise.all([
            Company.countDocuments(query),
            Company.find(query)
                .sort(sortOrder) 
                .skip(skipValue)
                .limit(limitValue)
        ]);

        return res.status(200).json({
            success: true,
            total,
            companies
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Error al intentar mostrar las compañías",
            error: err.message
        });
    }
};


export const addCompany = async (req, res) => {
    try {
        const data = req.body;

        const company = await Company.create({
            companyName: data.companyName,
            email: data.email,
            impactLevel: data.impactLevel,
            yearsOfCareer: data.yearsOfCareer,
            category: data.category
        });

        res.status(201).json({
            message: "Company registered successfully",
            companyDetails: {
                company: company.companyName
            }
        });

        setTimeout(() => {
            generateExcelFile()
                .then(() => console.log(" Reporte actualizado en segundo plano"))
                .catch(err => console.error(" Error en la generación del reporte:", err));
        }, 0);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Company registration failed",
            error: error.message
        });
    }
};



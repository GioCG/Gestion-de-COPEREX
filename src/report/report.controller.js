import * as XLSX from "xlsx";
import { writeFileSync } from "fs";
import Company from "../company/company.model.js";

export async function generateExcelFile() {
    try {
        const companies = await Company.find().exec();

        const data = companies.map(company => ({
            "Nombre de la empresa": company.companyName,
            "Email": company.email,
            "Nivel de impacto": company.impactLevel,
            "Años de carrera": company.yearsOfCareer,
            "Categoría": company.category,
            "Estado": company.estado ? "Activo" : "Inactivo",
            "Fecha de creación": company.createdAt.toISOString(),
            "Fecha de actualización": company.updatedAt.toISOString()
        }));

        const ws_data = [
            ["Nombre de la empresa", "Email", "Nivel de impacto", "Años de carrera", "Categoría", "Estado", "Fecha de creación", "Fecha de actualización"],
            ...data.map(company => Object.values(company))
        ];

        const ws = XLSX.utils.aoa_to_sheet(ws_data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Empresas");

        const filePath = "./reporte_empresas.xlsx";
        writeFileSync(filePath, XLSX.write(wb, { type: "buffer", bookType: "xlsx" }));

        console.log(" Reporte generado con éxito");

    } catch (error) {
        console.error(" Error al generar el reporte:", error);
    }
}

export async function generateExcelReport(req, res) {
    try {
        await generateExcelFile(); 

        const filePath = "./reporte_empresas.xlsx";
        res.download(filePath, "reporte_empresas.xlsx", err => {
            if (err) {
                console.error("❌ Error al enviar el archivo:", err);
                res.status(500).send("Error al generar el reporte.");
            }
        });

    } catch (error) {
        console.error("❌ Error al generar el reporte:", error);
        res.status(500).send("Error al generar el reporte.");
    }
}

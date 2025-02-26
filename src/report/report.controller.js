import { writeFile } from "xlsx";
import Company from "./models/Company"; 
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/GestorCOPEREX", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

async function generateExcelReport() {
    try {
        const companies = await Company.find().exec();

        const data = companies.map(company => ({
            "Nombre de la empresa": company.companyName,
            "Email": company.email,
            "Nivel de impacto": company.impactLevel,
            "Años de carrera": company.yearsOfCareer,
            "Categoría": company.category,
            "Estado": company.estado ? "Activo" : "Inactivo",
            "Fecha de creación": company.createdAt,
            "Fecha de actualización": company.updatedAt
        }));

        const ws_data = [
            ["Nombre de la empresa", "Email", "Nivel de impacto", "Años de carrera", "Categoría", "Estado", "Fecha de creación", "Fecha de actualización"], // Encabezados
            ...data.map(company => [
                company["Nombre de la empresa"],
                company["Email"],
                company["Nivel de impacto"],
                company["Años de carrera"],
                company["Categoría"],
                company["Estado"],
                company["Fecha de creación"],
                company["Fecha de actualización"]
            ])
        ];

        const ws = XLSX.utils.aoa_to_sheet(ws_data);

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Empresas");

        writeFile(wb, "reporte_empresas.xlsx");

        console.log("¡Reporte generado con éxito!");
    } catch (error) {
        console.error("Error al generar el reporte:", error);
    }
}   
generateExcelReport();

import Company from './company.model.js'

export const listCompany = async (req, res)=>{
    const query = { status: true };
    try {
        
        const total = await Company.countDocuments(query);

        res.status(200).json({
            success: true,
            total,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener publicaciones',
            error
        })
    }
};

export const addCompany = async (req,res) => {
    try {
        const data = req.body;

        const company = await Company.create({
            companyName: data.companyName,
            email: data.email,
            impactLevel: data.impactLevel,
            yearsOfCareer: data.yearsOfCareer,
            category: data.category
        })

        return res.status(201).json({
            message: "Company registered successfully",
            companyDetails: {
                company: company.companyName
            }
        });

    } catch (error) {
        
        console.log(error);

        return res.status(500).json({
            message: "Company registration failed",
            error: error.message
        })

    }
}

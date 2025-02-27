import Company from './company.model.js'

export const listCompany = async (req, res) => {
    try {
        const { limite = 10, desde = 0 } = req.query;
        const query = { estado: true }; 

        const limitValue = Math.max(1, Number(limite)); 
        const skipValue = Math.max(0, Number(desde));

        const [total, companies] = await Promise.all([
            Company.countDocuments(query),
            Company.find(query)
                .sort({ companyName: 1 }) 
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

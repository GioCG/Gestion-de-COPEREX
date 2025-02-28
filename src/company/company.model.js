import { Schema, model } from "mongoose";

const CompanySchema = Schema(
    {
        companyName: {type: String, required: [true, "Name is required"], maxLength: [25, "Cant be overcome 25 characters"]},
        email: {type: String, required: [true, "Email is required"], unique: true},
        impactLevel: {type: String, required: [true, "impact level is required"]}, 
        yearsOfCareer: {type: String, required: [true, "years of career is required"]},
        category: {type: String, required: [true, "category is required"]},
        estado: {type: Boolean, default: true},
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model('Company', CompanySchema);
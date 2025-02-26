import { Schema, model } from "mongoose";

const CompanySchema = Schema(
    {
        companyName: {type: String,required: [true, "Name is required"],maxLength: [25, "Cant be overcome 25 characters"]},
        email: {type: String,required: [true, "Email is required"],unique: true},
        impactLevel: {type: String,required: [true, "impact level is required"],unique: true},
        yearsOfCareer: {type: String,required: [true, "years of career is required"],unique: true},
        category: {type: String,required: [true, "category is required"],unique: true},
        estado: {type: Boolean,default: true,},
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model('Company', CompanySchema);
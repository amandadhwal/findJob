// import { Company } from "../models/company.model.js";

// export const registerCompany=async(req,res)=>{
// try{
//     const {companyName} = req.body;
//     console.log('req.id:', req.param.id);
//     if(!companyName)
//         {
//             return res.status(400).json({
//                 message:"enter company name",
//                 success:false,
//             });
//         }

//     // if(!req.id) {
//     //     return res.status(401).json({
//     //         message: "User not authenticated. Please login first.",
//     //         success: false,
//     //     });
//     // }
    

//     let company = await Company.findOne({name:companyName})
//     {
//         if(company)
//         {
//             return res.status(404).json({
//                 message:"company already register",
//                 success:false
//             })
//         }
//     }

//     company = await Company.create({
//         name:companyName,
//         userId:req.user.id,
//     })

//     return res.status(201).json({
//         message:"company register succesfully",
//         company,
//         success:true
//     })

//     }catch(error){
//         console.log(error);
//     }
// }

import { Company } from "../models/company.model.js";

export const registerCompany = async (req, res) => {
    try {
        console.log('=== CONTROLLER DEBUG ===');
        console.log('req.user:', req.user);
        console.log('req.id:', req.id);
        console.log('req.body:', req.body);
        console.log('=== END CONTROLLER DEBUG ===');
        
        const { companyName } = req.body;
        
        if (!companyName) {
            return res.status(400).json({
                message: "enter company name",
                success: false,
            });
        }

        // Check if req.user exists and has id
        if (!req.user || !req.user.id) {
            console.log('Authentication failed - req.user not found');
            // return res.status(401).json({
            //     message: "User not authenticated. Please login first.",
            //     success: false,
            // });
        }

        // Check if company already exists
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "company already register",
                success: false
            });
        }

        // Create new company
        company = await Company.create({
            name: companyName,
            userId: req.user.id,
        });

        return res.status(201).json({
            message: "company register succesfully",
            company,
            success: true
        });

    } catch (error) {
        console.log('Controller error:', error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const getCompany = async(req,res)=>
{
    try {
        const userId = req.id;
        const companies = await Company.find({userId});

        if(!companies)
        {
            return res.status(404).json({
                message:"company not found",
                success:false
            })
        }
        return res.status(201).json({
            companies,
            success:true
        })
        
    } catch (error) {
        console.log(error);
    }
}

export const getCompanyById=async(req,res)=>{
    try {
        
        const companyId= req.params.id;

        const company = await Company.findById(companyId);

        if(!company)
        {
            return res.status(404).json({
                message:"comapny not found",
                success:false
            })
        }

        return res.status(201).json({
            company,
            success:true
        })
        
    } catch (error) {
        console.log(error);
    }
}

export const updateCompany = async(req,res)=>{
    try{
    const {name,description,website,location} = req.body;
    const file = req.file;
    //cloudnary ayega idhar

    const updateData = {name,description,website,location};
    console.log("update data",updateData);

    const company = await Company.findByIdAndUpdate(req.params.id,updateData,{new :true});
    if(!company)
    {
        return res.status(404).json({
            message:"companu not found",
            success:false
        })
    }
        return res.status(201).json({
            message:"companu data updated",
            company,
            success:true
        })
    }
    catch(error)
    {
        console.log(error);
    }

}

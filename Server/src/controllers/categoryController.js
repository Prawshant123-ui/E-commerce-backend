const prisma = require("../config/prisma")
const generateSlug = require('../utils/generateSlug')

const createCategory = async (req, res) => {
    try {
        const { name } = req.body
        const slug = generateSlug(name)

        const existingCategory = await prisma.category.findFirst({
            where: {
                OR: [
                    { name },
                    { slug }
                ]
            }
        })

        if (existingCategory) {
            return res.status(400).json({ success: false, message: "Category already existed!!" })
        }

        const category = await prisma.category.create({
            data: { name, slug }
        })

        return res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: category,
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}


const getAllCategories=async(req,res)=>{
    try {
        const categories = await prisma.category.findMany({
  where: {
    isDeleted: false,
  },
  include: {
    _count: {
      select: {
        products: true,
      },
    },
  },
});

        return res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
    } catch (error) {
          console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
    }
}

const getCategoryById=async(req,res)=>{
    try {
        const id=Number(req.params.id)

        const category=await prisma.category.findFirst({
            where:{
                id,
                isDeleted:false
            }
        })

         if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
     return res.status(200).json({
      success: true,
      data: category,
    });
    } catch (error) {
         console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
    }
}


const updateCategory=async(req,res)=>{
    try {
        const id=Number(req.params.id)
        const {name}=req.body

        const category=await prisma.category.findUnique({
            where:{
                id
            }   
        })
          if (!category || category.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const slug=generateSlug(name)

     const duplicate = await prisma.category.findFirst({
      where: {
        slug,
        NOT: {
          id,
        },
      },
    });

    if (duplicate) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        name,
        slug,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: updatedCategory,
    });
    } catch (error) {
           console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
    }
}

const deleteCategory = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category || category.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    await prisma.category.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { createCategory,getAllCategories,getCategoryById,updateCategory,deleteCategory }
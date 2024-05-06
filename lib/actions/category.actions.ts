//adding category using server actions
"use server";
import { CreateCategoryParams } from "@/types";
import { connectToDatabase } from "../database";
import Category from "../database/models/category.models";
import { handleError } from "../utils";

export const createCatgory = async ({ categoryName }: CreateCategoryParams) => {
  try {
    await connectToDatabase();
    const newCatgory = await Category.create({ name: categoryName });
    return JSON.parse(JSON.stringify(newCatgory));
  } catch (error) {
    handleError(error);
  }
};

export const getAllCategories = async () => {
  try {
    await connectToDatabase();
    const Categories = await Category.find({});
    return JSON.parse(JSON.stringify(Categories));
  } catch (error) {
    handleError(error);
  }
};

"use server";
import { Templates } from "@prisma/client";
import { currentUser, currentUserServer } from "../../hooks/use-current-user";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const createPlayground = async (data: {
  title: string;
  template: Templates;
  description?: string;
  userId: string;
}) => {
  const { title, template, description } = data;
  const user = currentUser();
  try {
    const playground = await db.playground.create({
      data: {
        title,
        template,
        description,
        userId: user?.id!,
      },
    });
    return playground;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllPlaygroundForUser = async () => {
  const user =  await currentUserServer();
  if (!user) {
    throw new Error("user authentication failed!");
  }
  try {
    const allPlayground = await db.playground.findMany({
      where: { userId: user?.id! },
      include: {
        user: true,
        Starmark: {
          where: {
            userId: user?.id!,
          },
          select: {
            isMarked: true,
          },
        },
      },
    });
    return allPlayground;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProjectById = async (id: string) => {
  try {
    await db.playground.delete({
      where: { id },
    });
    revalidatePath("/home");
  } catch (error) {
    console.log(error);
  }
};

export const editProjectById = async (
  id: string,
  data: { title: string; description: string }
) => {
  try {
    await db.playground.update({
      where: { id },
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const duplicateProjectById = async (id: string) => {
  try {
    const originalPlayground = await db.playground.findUnique({
      where: { id },
    });
    if (!originalPlayground) throw new Error("playground not found");
   const duplicatedPlayground= await db.playground.create({
      data: {
        title: `${originalPlayground.title} (copy)`,
        description: originalPlayground.description,
        userId: originalPlayground.userId,
        template: originalPlayground.template,
      },
    });
    revalidatePath("/home")
    return duplicatedPlayground;
  } catch (error) {
    console.log(error);
    return null;
  }
};

"use server";

import { db } from "@/firebase/admin";


export async function uploadSermon(params: SermonProps){

  const {title, message, sermonId} = await params;

  try {
    const sermon = {
      title,
      message,
      sermonId
    }

    let sermonRef;

        if (sermonId) {
            sermonRef = db.collection("students").doc(sermonId);
        } else {
            sermonRef = db.collection("students").doc();
        }

        await sermonRef.set(sermon);

        return { success: true, studentId: sermonRef.id };
  } catch (error) {
    console.error("Error saving student:", error);
    return { success: false };
  }
}

export async function getAllSermons() {
  const querySnapshot = await db
    .collection("students")
    .orderBy("resultDocFilled")
    .get();

  if (querySnapshot.empty) return null;

  const sermonDoc = querySnapshot.docs;
  return sermonDoc.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}



export async function getSermonById(id: string): Promise<SermonProps | null> {
  const sermon = await db.collection("sermons").doc(id).get();

  return { id: sermon.id, ...sermon.data() } as SermonProps;
}

// Function to update a user's profile
export async function updatesermon(studentId: string, studentCourse: string, studentDegree: string,) {
  const userDocRef = db.collection("students").doc(studentId);

  try {
    await userDocRef.update({
      course: studentCourse,
      degree: studentDegree,
      resultDocFilled: "Yes"
    })
    console.log("✅ Document successfully updated!");
  } catch (error) {
    console.error("⚠️ Error updating document: ", error);
  }
}

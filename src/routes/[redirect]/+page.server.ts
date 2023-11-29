import type { PageServerLoad } from "./$types";
import {
  collection,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import db from "../../lib/firebase.js";
import { redirect } from "@sveltejs/kit";

interface Params {
  redirect: string;
}

export const load: PageServerLoad = async ({ params }: { params: Params }) => {
  const linksRef = collection(db, "links");

  const consult = query(linksRef, where("shortName", "==", params.redirect));

  const queryDb = await getDocs(consult);

  if (!queryDb.empty) {
    const doc = queryDb.docs[0];
    await updateDoc(doc.ref, {
      count: doc.data().count += 1,
      lastAcessDay: serverTimestamp(),
    });
    throw redirect(301, doc.data().url);
  } else {
    console.error("Document not found");
  }
};

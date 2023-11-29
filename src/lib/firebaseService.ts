// firebaseService.js
import {
  collection,
  deleteDoc,
  doc,
  type DocumentData,
  getDocs,
  onSnapshot,
  query,
  QuerySnapshot,
  type Unsubscribe,
  where,
} from "firebase/firestore";
import db from "$lib/firebase";
import type { Link } from "./types";

export async function getLinksData(dataLinks: Link[]): Promise<any> {
  const linksDoc = collection(db, "links");
  let linkDataArr: DocumentData[] = [];

  for (let i = 0; i < dataLinks.length; i++) {
    const queryDb = query(
      linksDoc,
      where("shortName", "==", dataLinks[i].shortName),
    );

    try {
      const queryLinks: QuerySnapshot<DocumentData> = await getDocs(queryDb);
      queryLinks.forEach((link) => {
        linkDataArr.push(link.data());
      });
    } catch (err) {
      console.error(err, "Error");
      // Implement error handling, e.g., display error message to the user
    }
  }
  return linkDataArr;
}

export async function deleteLinkById(
  id: string,
  dataLinks: { update: (callback: (array: Link[]) => Link[]) => void },
) {
  const linkDocRef = doc(db, "links", id);
  await deleteDoc(linkDocRef);

  dataLinks.update((array) => {
    const index = array.findIndex((link) => link.id === id);
    if (index !== -1) {
      array.splice(index, 1);
    }
    return array;
  });
}

export function subscribeToLinksChanges(
  callback: (id: string) => void,
): Unsubscribe {
  const unsubscribe = onSnapshot(collection(db, "links"), (snap) => {
    snap.docChanges().forEach((change) => {
      if (change.type === "removed") {
        callback(change.doc.id);
      }
    });
  });
  return unsubscribe;
}

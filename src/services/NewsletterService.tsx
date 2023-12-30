import { firestore, storage } from '../firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

class NewsletterService {
    async getAllNewsletters() {
        try {
            const newsletters = await getDocs(collection(firestore, 'newsletters'));
            return newsletters.docs.map((doc) => ({
                id: doc.id,
              ...doc.data(),
            }));
        } catch (error) {
            console.error("Error loading newsletters:", error);
        }
    }

    async createNewsletter(name: string, description: string, pdfFile: File) {
        try {
          const dateUpload = Timestamp.now().toDate().getTime();
          const storageRef = ref(storage, 'newsletter_pdfs/' + dateUpload + '_' + pdfFile.name);
          const uploadTask = uploadBytes(storageRef, pdfFile);
    
          await uploadTask;
          const pdfUrl = await getDownloadURL(storageRef);
    
          const docRef = await addDoc(collection(firestore, 'newsletters'), {
            name,
            description,
            pdfUrl,
          });
    
          return docRef.id;
        } catch (error) {
          console.error("Error creating newsletter:", error);
        }
      }

    async updateNewsletter(id: string, name: string, description: string, pdfFile: File | null, oldPdfUrl: string | null) {
        try {
            const newsletterRef = doc(firestore, 'newsletters', id);

            if (pdfFile && oldPdfUrl) {
                const oldStorageRef = ref(storage, oldPdfUrl);
                await deleteObject(oldStorageRef);
            }
    
            if (pdfFile) {
                const dateUpload = Timestamp.now().toDate().getTime();
                const storageRef = ref(storage, 'newsletter_pdfs/' + dateUpload + '_' + pdfFile.name);
                const uploadTask = uploadBytes(storageRef, pdfFile);
    
                await uploadTask;
                const pdfUrl = await getDownloadURL(storageRef);
    
                await updateDoc(newsletterRef, {
                    name,
                    description,
                    pdfUrl,
                });
            } else {
                await updateDoc(newsletterRef, {
                    name,
                    description,
                });
            }
        } catch (error) {
            console.error("Error updating newsletter:", error);
        }
    }

    async deleteNewsletter(id: string, pdfUrl: string | null) {
        try {
          const newsletterRef = doc(firestore, 'newsletters', id);
          await deleteDoc(newsletterRef);
      
          if (pdfUrl) {
            const storageRef = ref(storage, pdfUrl);
            await deleteObject(storageRef);
          }
        } catch (error) {
          console.error("Error deleting newsletter:", error);
        }
      }
}

export default new NewsletterService();

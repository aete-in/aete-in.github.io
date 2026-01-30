import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadProfilePhoto = async (userId, file) => {
    if (!storage) throw new Error("Storage not initialized");
    if (!file) return null;

    const storageRef = ref(storage, `profile-photos/${userId}/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
};

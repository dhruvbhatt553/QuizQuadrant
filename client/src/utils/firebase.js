import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { imageDB } from '../config/firebase';
import { v4 } from 'uuid';

const uploadImage = async (file) => {
    if(file!=null) {
        const imgRef = ref(imageDB, `images/${v4()}`);
        const response = await uploadBytes(imgRef, file);
        const imageURL = await getDownloadURL(response.ref);
        return imageURL;
    } else {
        return "";
    }
}

export { uploadImage };
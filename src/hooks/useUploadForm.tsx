import { ChangeEvent, useState } from "react";

const useUploadForm = () => {
    const [url, setUrl] = useState<string | ArrayBuffer | null>('');
    const reader = new FileReader();
    const handleFileChange  = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            console.log(e.target.files)
            reader.readAsDataURL(e.target.files[0])

            reader.onload = () => {
                setUrl(reader.result)
            }
        }
    };

    return (
        {
            url,
            handleFileChange 
        }
    )
}

export default useUploadForm

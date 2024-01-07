import { ChangeEvent, useState } from 'react';

// interface UploadFormProps {
//     uploader: (file: File) => void;
// }

const UploadForm = () => {
    const [url, setUrl] = useState<string | ArrayBuffer | null>('');
    const reader = new FileReader();
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            console.log(e.target.files)
            reader.readAsDataURL(e.target.files[0])

            reader.onload = () => {
                setUrl(reader.result)
            }
        }
    };
    console.log(url)
    return (
        <>
            <form>
                <input type="file" accept="image/*" onChange={handleChange} />
            </form>
            {
                url ? <img id="imgPreview" src={url as string} alt="" /> : ''
            }

        </>
    );
};

export default UploadForm;

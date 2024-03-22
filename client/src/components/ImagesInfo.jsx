/* eslint-disable react/prop-types */
import { FileInput, Label } from 'flowbite-react';
import { toast } from "react-toastify";




// eslint-disable-next-line no-unused-vars
function ImagesInfo({ formData, setFormData }) {

    async function handleFile(e) {
        const { files, name } = e.target;
        console.log(files);
        console.log(`name: ${name}`);
        try {
            const images = Array.from(files);
            const form = new FormData();
            images.forEach((image) => {
                form.append("images", image);
            });

            const res = await fetch("/api/v1/upload", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: form,
            });
            const data = await res.json();

            setFormData((prev) => ({ ...prev, [name]: data.link }));

            toast.success(data.message);
        } catch (error) {
            console.log(error);
            toast.error("Document Upload Failed");
        }
    }

    return (
        <div className='flex items-center justify-center mt-2 gap-2'>
            <div>
                <div className="mb-5 block">
                    <div>
                        <Label htmlFor="passport" value="Passport Size photo" />
                    </div>
                    <FileInput id="passport" name='passport' onChange={(e) => handleFile(e)} />
                </div>
                <div className="mb-5 block">
                    <div>
                        <Label htmlFor="aadhar" value="Aadhar Card image" />
                    </div>
                    <FileInput id="aadhar" name='aadhar' onChange={(e) => handleFile(e)} />
                </div>
                <div className="mb-5 block">
                    <div>
                        <Label htmlFor="driving" value="Driving Licence image" />
                    </div>
                    <FileInput id="driving" name='driving' onChange={(e) => handleFile(e)} />
                </div>
            </div>
            <div>
                <div className="mb-5 block">
                    <div>
                        <Label htmlFor="electricity" value="Electricity bill image" />
                    </div>
                    <FileInput id="electricity" name='electricity' onChange={(e) => handleFile(e)} />
                </div>
                <div className="mb-5 block">
                    <div>
                        <Label htmlFor="plc" value="PLC image" />
                    </div>
                    <FileInput id="plc" name='plc' onChange={(e) => handleFile(e)} />
                </div>
                <div className="mb-5 block">
                    <div>
                        <Label htmlFor="insurance" value="Insurance image" />
                    </div>
                    <FileInput id="insurance" name='insurance' onChange={(e) => handleFile(e)} />
                </div>
            </div>
        </div>
    );
}

export default ImagesInfo;
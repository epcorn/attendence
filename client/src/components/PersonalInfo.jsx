/* eslint-disable react/prop-types */

import { Label, TextInput } from 'flowbite-react';

function PersonalInfo({ formData, setFormData }) {
    return (
        <div className="  personal-info-container">
            <div>
                <div className=" block">
                    <Label htmlFor="firstname" value="Name" />
                </div>
                <TextInput id="firstname" type="text" required value={formData.firstname} onChange={(e) => setFormData({ ...formData, firstname: e.target.value })} />
            </div>
            <div>
                <div className=" block">
                    <Label htmlFor="lastname" value="Lastname" />
                </div>
                <TextInput id="lastname" type="text" required value={formData.lastname} onChange={(e) => setFormData({ ...formData, lastname: e.target.value })} />
            </div>
            <div>
                <div className=" block">
                    <Label htmlFor="email" value="Your email" />
                </div>
                <TextInput id="email" placeholder="name@company.com" required />
            </div>
            <div>
                <div className=" block">
                    <Label htmlFor="bg" value="Blood Group" />
                </div>
                <TextInput id="bg" placeholder="o+" required />
            </div>
        </div>
    );
}

export default PersonalInfo;
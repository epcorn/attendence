/* eslint-disable react/prop-types */

import { Label, TextInput } from "flowbite-react";

function PersonalInfo({ formData, setFormData }) {
  return (
    <div className="">
      <div className=" mb-2">
        <Label className="font-bold" htmlFor="firstname" value="Name" />
        <TextInput
          id="firstname"
          type="text"
          required
          className="felx-2"
          value={formData.firstname}
          onChange={(e) =>
            setFormData({ ...formData, firstname: e.target.value })
          }
        />
      </div>
      <div className=" mb-2">
        <Label className="font-bold" htmlFor="lastname" value="Lastname" />
        <TextInput
          className=""
          id="lastname"
          type="text"
          required
          value={formData.lastname}
          onChange={(e) =>
            setFormData({ ...formData, lastname: e.target.value })
          }
        />
      </div>
      <div className=" mb-2">
        <Label className="font-bold" htmlFor="email" value="Your email" />
        <TextInput id="email" placeholder="name@company.com" required />
      </div>
      <div className=" mb-2">
        <Label className="font-bold" htmlFor="bg" value="Blood Group" />
        <TextInput id="bg" placeholder="o+" required />
      </div>
    </div>
  );
}

export default PersonalInfo;

import { Label, TextInput } from "flowbite-react";
import { useState } from "react";

const FamilyInfo = () => {
  const [activeMember, setActiveMember] = useState(0);
  const [familyMembers, setFamilyMembers] = useState([
    { id: 1, firstname: "", lastname: "", relation: "", email: "", phone: "" },
    { id: 2, firstname: "", lastname: "", relation: "", email: "", phone: "" },
    { id: 3, firstname: "", lastname: "", relation: "", email: "", phone: "" },
    { id: 4, firstname: "", lastname: "", relation: "", email: "", phone: "" },
  ]);

  const handleMemberClick = (index) => {
    setActiveMember(index);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFamilyMembers((state) =>
      state.map((element, idx) =>
        idx === activeMember ? { ...element, [name]: value } : element
      )
    );
  };

  return (
    <div className="">
      <div className="flex space-x-2 justify-center items-center">
        {familyMembers.map((member, index) => (
          <button
            key={member.id}
            onClick={() => handleMemberClick(index)}
            className={`rounded-full w-10 h-10 bg-blue-400 text-white focus:outline-none ${
              activeMember === index ? "bg-blue-800" : ""
            }`}
          >
            {member.id}
          </button>
        ))}
      </div>
      <div className=" mb-2">
        <Label className="font-bold" htmlFor="firstname" value="First name" />
        <TextInput
          id="firstname"
          type="text"
          required
          name="firstname"
          className="felx-2"
          value={familyMembers[activeMember].firstname}
          onChange={handleInputChange}
        />
      </div>
      <div className=" mb-2">
        <Label className="font-bold" htmlFor="lastname" value="Lastname" />
        <TextInput
          className=""
          id="lastname"
          type="text"
          name="lastname"
          required
          value={familyMembers[activeMember].lastname}
          onChange={handleInputChange}
        />
      </div>
      <div className=" mb-2">
        <Label className="font-bold" htmlFor="relation" value="Relationship" />
        <TextInput
          className=""
          id="relation"
          type="text"
          name="relation"
          required
          value={familyMembers[activeMember].relation}
          onChange={handleInputChange}
        />
      </div>
      <div className=" mb-2">
        <Label className="font-bold" htmlFor="email" value="Your email" />
        <TextInput
          id="email"
          placeholder="name@company.com"
          required
          name="email"
          value={familyMembers[activeMember].email}
          onChange={handleInputChange}
        />
      </div>
      <div className=" mb-2">
        <Label className="font-bold" htmlFor="tel" value="Phone" />
        <TextInput
          id="tel"
          placeholder="Phone"
          required
          name="phone"
          value={familyMembers[activeMember].phone}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default FamilyInfo;

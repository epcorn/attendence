import { useState } from "react";
import PersonalInfo from './PersonalInfo';
import FamilyInfo from "./FamilyInfo";
import ImagesInfo from "./ImagesInfo";
import CompanyInfo from "./CompanyInfo";

function Form() {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    division: "",
    category: "",
    company: "",
    blood: "",
    family: {},
    images: {
      aadhar: "",
      driving: "",
      electricity: "",
      pcc: "",
      insurance: "",
      passport: "",
      image: "",
    }
  });

  const FormTitles = ["Personal Info", "Family Info", "Images", "Company"];

  const PageDisplay = () => {
    if (page === 0) {
      return <PersonalInfo formData={formData} setFormData={setFormData} />;
    } else if (page === 1) {
      return <FamilyInfo formData={formData} setFormData={setFormData} />;
    } else if (page === 2) {
      return <ImagesInfo formData={formData} setFormData={setFormData} />;
    } else {
      return <CompanyInfo formData={formData} setFormData={setFormData} />;

    }
  };

  return (
    <div className='form'>
      <div className='progressbar'>
        <div
          style={{ width: page === 0 ? "25%" : page === 1 ? "50%" : page === 2 ? "75%" : "100%" }}
        ></div>
      </div>
      <div className='form-container' >
        <div className='header' >
          <h1>{FormTitles[page]}</h1>
        </div>
        <div className='body' >{PageDisplay()}</div>
        <div className='footer'>
          <button
            disabled={page === 0}
            onClick={() => {
              setPage((currPage) => currPage - 1);
            }}
          >
            Prev
          </button>
          <button
            onClick={() => {
              if (page === FormTitles.length - 1) {
                alert("FORM SUBMITTED");
                console.log(formData);
              } else {
                setPage((currPage) => currPage + 1);
              }
            }}
          >
            {page === FormTitles.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Form;

import { useForm } from "react-hook-form";
import Header from "../../templates/Header/Header";
import { services } from "../../../Services";
import Modal from "../../templates/Modal/Modal";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const company = ["Jazztel", "Orange", "Simyo"];

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm();
  const [change, setChange] = useState(false);

  const handleClose = () => {
    setChange(false);
  };

  const post = async (data: object) => {
    console.log(data);
      const create = await services.postData(
        "http://localhost:3000/admins",
        data)

      if (create) {
        setChange(true);
      }
  };

  const dni = watch('')

  return (
    <>
      <Header title="Register" />
      <div className="container py-4 px-3 mx-auto">
        <form className="row g-3 " onSubmit={handleSubmit(post)}>
          <div className="col-md-6">
            <label htmlFor="input_name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="input_name"
              data-testid='input_name'
              {...register("user_name", {
                required: true,
                pattern: /^[A-Z][a-z]*$/,
              })}
            />
            {errors.user_name?.type === "required" && (
              <p className="text-danger fw-bold">name required</p>
            )}
            {errors.user_name?.type === "pattern" && (
              <p className="text-danger fw-bold">name invalide</p>
            )}
          </div>
          <div className="col-md-6">
            <label htmlFor="input_last-name" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="input_last-name"
              data-testid='input_last-name'
              {...register("user_last_name", {
                required: true,
                pattern: /^[A-ZÁÉÍÓÚÜÑ'][a-záéíóúüñ'.-]+$/,
              })}
            />
            {errors.user_last_name?.type === "required" && (
              <p className="text-danger fw-bold">last name required</p>
            )}
            {errors.user_last_name?.type === "pattern" && (
              <p className="text-danger fw-bold">last name invalid</p>
            )}
          </div>
          <div className="col-md-6">
            <label htmlFor="input_dni" className="form-label">
              DNI
            </label>
            <input
              type="text"
              className="form-control"
              id="input_dni"
              data-testid='input_dni'
              {...register("user_dni", {
                required: true,
                pattern: /^\d{8}[A-Za-z]$/,
              })}
            />
            {errors.user_dni?.type === "required" && (
              <p className="text-danger fw-bold">DNI required</p>
            )}
            {errors.user_dni?.type === "pattern" && (
              <p className="text-danger fw-bold">DNI invalid</p>
            )}
          </div>
          
          <div className="col-md-4">
            <label htmlFor="input_company" className="form-label">
              Company
            </label>
            <select
              id="input_company"
              className="form-select"
              data-testid='input_company'
              {...register("user_company", { required: true })}
              defaultValue=""
            >
              <option value="" disabled></option>
              {company.map((a, index) => (
                <option key={index} value={a}>
                  {a}
                </option>
              ))}
            </select>
            {errors.user_company?.type === "required" && (
              <p className="text-danger fw-bold">company required</p>
            )}
          </div>

          <div className="col-md-2">
            <label htmlFor="input_postal-code" className="form-label">
              Postal Code
            </label>
            <input
              type="text"
              className="form-control"
              data-testid='input_postal-code'
              id="input_postal-code"
              {...register("user_postal_code", {
                required: true,
                pattern: /^\d{5}$/,
              })}
            />
            {errors.user_postal_code?.type === "required" && (
              <p className="text-danger fw-bold">postal code required</p>
            )}
            {errors.user_postal_code?.type === "pattern" && (
              <p className="text-danger fw-bold">postal code invalid</p>
            )}
          </div>
          <Link to={'/terms-conditions'} target="_blank">
            Please read the Terms and Conditions and privacy policy
          </Link>
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="input_check"
                data-testid='input_check'
                {...register("user_check", {
                  required: true,
                })}
              />
              <label className="form-check-label" htmlFor="input_check">
                I accept the terms and conditions
              </label>
              {errors.user_check?.type === "required" && (
                <p className="text-danger fw-bold">accept required</p>
              )}
            </div>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary mt-2">
              Register
            </button>
          </div>
        </form>
      </div>

      <Modal
        to={"/send-data"}
        button={"Accept"}
        display={change}
        onClose={handleClose}
        modalTitle={"Data Sent Correctly"}
        modalText={''}
      />
    </>
  );
};

export default Register;

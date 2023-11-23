import { FieldValues, useForm } from "react-hook-form";
import Header from "../../templates/Header/Header";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLoaderData } from 'react-router-dom';
import { services } from "../../../services/services";
import Modal from "../../templates/Modal/Modal";

const Register = () => {
  const { companies } = useLoaderData();
  
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [change, setChange] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleClose = () => {
    setChange(false);
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  const post = async (data) => {
    try {
      const response = await services.postRegisterUser(data);
      
      const userUuid = response.user_id; // Asumiendo que el servidor devuelve el UUID como user_id
      console.log('UUID received from server:', userUuid);


      console.log('UUID received from server:', userUuid);
      if (userUuid) {
        localStorage.setItem('userUuid', userUuid);
      } else {
        console.error('No UUID present in the response');
      }

      // Almacenar el UUID en el almacenamiento local
      // localStorage.setItem('userUuid', userUuid);

      const expires = new Date();
      expires.setFullYear(expires.getFullYear() + 1);
      document.cookie = `userId=${userUuid}; path=/; expires=${expires.toUTCString()}; Samesite=Lax`;
      console.log('Cookie created:', document.cookie);
      setChange(true);
    } catch (error) {
      // Aquí manejamos el error de registro
      let message = 'There was an unexpected error during registration. Please try again later.';
      if (error.response?.status === 409) {
        message = 'An account with the provided details already exists. Please log in or use different details.';
      } else if (error.message) {
        message += ` Error: ${error.message}`;
      }
      setErrorMessage(message);
      setShowErrorModal(true); // Mostramos el modal de error con el mensaje adecuado
    }
  };



  return (
    <>
      <Header title="Registro" />
      <div className="container py-4 px-3 d-flex flex-column mt-4 container-form">
        
        <form className="row g-3" onSubmit={handleSubmit(postRegister)}>
          <div className="col-md-6">
            <label htmlFor="input_name" className="form-label">
              Nombres
            </label>
            <input
              type="text"
              className="form-control"
              id="input_name"
              data-testid="input_name"
              {...register("user_name", {
                required: true,
                pattern:
                  /^([A-ZÁÉÍÓÚÜÑ]?[a-záéíóúüñÁÉÍÓÚÜÑ']+)?(\s[A-ZÁÉÍÓÚÜÑ]?[a-záéíóúüñÁÉÍÓÚÜÑ']+)?$/,
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
              Apellidos
            </label>
            <input
              type="text"
              className="form-control"
              id="input_last-name"
              data-testid="input_last-name"
              {...register("user_lastname", {
                required: true,
                pattern:
                  /^([A-ZÁÉÍÓÚÜÑ]?[a-záéíóúüñÁÉÍÓÚÜÑ']+)?(\s[A-ZÁÉÍÓÚÜÑ]?[a-záéíóúüñÁÉÍÓÚÜÑ']+)?$/,
              })}
            />
            {errors.user_lastname?.type === "required" && (
              <p className="text-danger fw-bold">last name required</p>
            )}
            {errors.user_lastname?.type === "pattern" && (
              <p className="text-danger fw-bold">last name invalid</p>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="company_select" className="form-label">
              Company
            </label>
            <select id="company_select" className="form-select" {...register("company_id", { required: true })}>
              <option value="" disabled>Select a company</option>
              {companies.map((company) => (
                <option key={company.company_id} value={company.company_id}>
                  {company.company_name}
                </option>
              ))}
            </select>

            {errors.company_id?.type === "required" && (
              <p className="text-danger fw-bold">company required</p>
            )}
          </div>

          <div className="col-md-2">
            <label htmlFor="input_postal-code" className="form-label">
              Codigo Postal
            </label>
            <input
              type="text"
              className="form-control"
              data-testid="input_postal-code"
              id="input_postal-code"
              {...register("postal_code", {
                required: true,
                pattern: /^\d{5}$/,
              })}
            />
            {errors.postal_code?.type === "required" && (
              <p className="text-danger fw-bold">postal code required</p>
            )}
            {errors.postal_code?.type === "pattern" && (
              <p className="text-danger fw-bold">postal code invalid</p>
            )}
          </div>

          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="input_check"
                data-testid="input_check"
                {...register("user_check", {
                  required: true,
                })}
              />
              <label className="form-check-label" htmlFor="input_check">
                Estoy de acuerdo con la{" "}
                <Link to={"/terms-conditions"}>política de privacidad</Link>
              </label>
              {errors.user_check?.type === "required" && (
                <p className="text-danger fw-bold">accept required</p>
              )}
            </div>
          </div>


          <div className="button-register d-flex justify-content-center w-100">
            <button
              type="submit"
              className="btn btn-primary mt-2 button-submit"
            >
              Me Registro
            </button>
          </div>
        </form>
      </div>




      <Modal
        to={"/send-data"}
        button={"Continuar"}
        display={change}
        onClose={handleClose}
        modalTitle={"¡Registro con éxito!"}
      />

      {/* Error Modal */}
      <Modal
        button={"Close"}
        display={showErrorModal}
        onClose={handleCloseErrorModal}
        modalTitle={"Registration Error"}
        modalText={errorMessage}
      />
    </>
  );
};

export default Register;

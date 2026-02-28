import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap-v5";
import { connect } from "react-redux";
import * as EmailValidator from "email-validator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { editUserCredentials } from "../../store/action/userAction";

const ChangeUserCredentialsModal = ({
    show,
    onClose,
    selectedUser,
    editUserCredentials,
    isSaving,
}) => {
    const [formValue, setFormValue] = useState({
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [errors, setErrors] = useState({
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirm: false,
    });

    useEffect(() => {
        if (!show || !selectedUser) {
            return;
        }

        setFormValue({
            email: selectedUser.email || "",
            password: "",
            password_confirmation: "",
        });
        setErrors({
            email: "",
            password: "",
            password_confirmation: "",
        });
    }, [show, selectedUser]);

    const handleValidation = () => {
        const validationErrors = {};

        if (!formValue.email) {
            validationErrors.email = "El correo es obligatorio.";
        } else if (!EmailValidator.validate(formValue.email)) {
            validationErrors.email = "Ingresa un correo electronico valido.";
        }

        if (!formValue.password) {
            validationErrors.password = "La contrasena es obligatoria.";
        } else if (formValue.password.length < 6) {
            validationErrors.password = "La contrasena debe tener minimo 6 caracteres.";
        }

        if (!formValue.password_confirmation) {
            validationErrors.password_confirmation = "Confirma la contrasena.";
        } else if (formValue.password_confirmation !== formValue.password) {
            validationErrors.password_confirmation = "La confirmacion no coincide con la contrasena.";
        }

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setFormValue((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!selectedUser || !handleValidation()) {
            return;
        }

        editUserCredentials(
            selectedUser.id,
            {
                email: formValue.email,
                password: formValue.password,
                password_confirmation: formValue.password_confirmation,
            },
            () => onClose()
        );
    };

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Cambiar correo y contrasena</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <div className="mb-4">
                        <Form.Label>Correo</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            value={formValue.email}
                            onChange={handleOnChange}
                            autoComplete="email"
                            placeholder="correo@ejemplo.com"
                        />
                        <span className="text-danger d-block fw-400 fs-small mt-2">
                            {errors.email || null}
                        </span>
                    </div>

                    <div className="mb-4">
                        <Form.Label>Nueva contrasena</Form.Label>
                        <div className="input-group">
                            <Form.Control
                                type={showPassword.password ? "text" : "password"}
                                name="password"
                                value={formValue.password}
                                onChange={handleOnChange}
                                autoComplete="new-password"
                                placeholder="Minimo 6 caracteres"
                            />
                            <span
                                className="showpassword"
                                onClick={() =>
                                    setShowPassword((prevState) => ({
                                        ...prevState,
                                        password: !prevState.password,
                                    }))
                                }
                            >
                                <FontAwesomeIcon
                                    icon={showPassword.password ? faEye : faEyeSlash}
                                    className="top-0 m-0 fa"
                                />
                            </span>
                        </div>
                        <span className="text-danger d-block fw-400 fs-small mt-2">
                            {errors.password || null}
                        </span>
                    </div>

                    <div className="mb-2">
                        <Form.Label>Confirmar contrasena</Form.Label>
                        <div className="input-group">
                            <Form.Control
                                type={showPassword.confirm ? "text" : "password"}
                                name="password_confirmation"
                                value={formValue.password_confirmation}
                                onChange={handleOnChange}
                                autoComplete="new-password"
                                placeholder="Confirma la contrasena"
                            />
                            <span
                                className="showpassword"
                                onClick={() =>
                                    setShowPassword((prevState) => ({
                                        ...prevState,
                                        confirm: !prevState.confirm,
                                    }))
                                }
                            >
                                <FontAwesomeIcon
                                    icon={showPassword.confirm ? faEye : faEyeSlash}
                                    className="top-0 m-0 fa"
                                />
                            </span>
                        </div>
                        <span className="text-danger d-block fw-400 fs-small mt-2">
                            {errors.password_confirmation || null}
                        </span>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose} disabled={isSaving}>
                        Cancelar
                    </Button>
                    <Button variant="primary" type="submit" disabled={isSaving}>
                        Guardar credenciales
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

const mapStateToProps = (state) => {
    const { isSaving } = state;
    return { isSaving };
};

export default connect(mapStateToProps, { editUserCredentials })(
    ChangeUserCredentialsModal
);

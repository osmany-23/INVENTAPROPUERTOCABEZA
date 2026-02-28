import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faKey, faPenToSquare, faTrash} from '@fortawesome/free-solid-svg-icons';
import {placeholderText} from '../sharedMethod';
import { can, canCrud } from "../can";

const ActionButton = (props) => {
    const {
        goToEditProduct,
        item,
        onClickDeleteModel = true,
        isDeleteMode = true,
        isEditMode = true,
        goToDetailScreen,
        isViewIcon = false,
        isCredentialMode = false,
        onClickCredentialModel = null,
    } = props;
    const canUpdateItem = isEditMode !== false && canCrud("update");
    const canDeleteItem = isDeleteMode !== false && canCrud("delete");
    const canManageAdminUsers = can("manage_roles");
    const isUserRow = Array.isArray(item.role_name) || typeof item.email === "string";
    const normalizedRoleNames = Array.isArray(item.role_name)
        ? item.role_name.map((role) => String(role).trim().toLowerCase())
        : [];
    const isAdminRecord = isUserRow && (
        String(item?.name || "").trim().toLowerCase() === "admin" ||
        String(item?.email || "").trim().toLowerCase() === "admin@infy-pos.com" ||
        normalizedRoleNames.includes("admin")
    );
    const canEditProtectedRecord = !isAdminRecord || canManageAdminUsers;

    return (
        <>
            {isViewIcon ?
                <button title={placeholderText('globally.view.tooltip.label')}
                        className='btn text-success px-2 fs-3 ps-0 border-0'
                        onClick={(e) => {
                            e.stopPropagation();
                            goToDetailScreen(item.id)
                        }}>
                    <FontAwesomeIcon icon={faEye}/>
                </button> : null
            }
            {isCredentialMode && typeof onClickCredentialModel === "function" && canEditProtectedRecord ? (
                <button
                    title="Cambiar correo y contrasena"
                    className="btn text-warning fs-3 border-0 px-xxl-2 px-1"
                    onClick={(e) => {
                        e.stopPropagation();
                        onClickCredentialModel(item);
                    }}
                >
                    <FontAwesomeIcon icon={faKey}/>
                </button>
            ) : null}
            {!canEditProtectedRecord || !canUpdateItem ? null :
                <button title={placeholderText('globally.edit.tooltip.label')}
                        className='btn text-primary fs-3 border-0 px-xxl-2 px-1'
                        onClick={(e) => {
                            e.stopPropagation();
                            goToEditProduct(item);
                        }}
                >
                    <FontAwesomeIcon icon={faPenToSquare}/>
                </button>
            }
            {isAdminRecord || !canDeleteItem ? null :
                <button title={placeholderText('globally.delete.tooltip.label')}
                        className='btn px-2 pe-0 text-danger fs-3 border-0'
                        onClick={(e) => {
                            e.stopPropagation();
                            onClickDeleteModel(item);
                        }}
                >
                    <FontAwesomeIcon icon={faTrash}/>
                </button>
            }
        </>
    )
};
export default ActionButton;

import React, { useEffect, useMemo, useState } from "react";
import { Form } from "react-bootstrap-v5";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { editRole } from "../../store/action/roleAction";
import { getFormattedMessage, placeholderText } from "../../shared/sharedMethod";

const ACTIONS = ["view", "create", "update", "delete"];
const ACTION_LABELS = {
    view: "VER",
    create: "CREAR",
    update: "EDITAR",
    delete: "ELIMINAR",
};
const MODULE_ALIASES = {
    customers: "customer",
    users: "user",
    suppliers: "supplier",
    credits: "credit",
    creditos: "credit",
    batch: "lot",
    batches: "lot",
    product_batch: "lot",
    product_batches: "lot",
    lotes: "lot",
    lots: "lot",
};
const MODULE_LABELS = {
    credit: "Credito",
    lot: "Lotes",
    customer: "Clientes",
    supplier: "Proveedores",
    user: "Usuarios",
};

const normalizeAction = (action = "") => {
    const value = String(action).toLowerCase();
    if (value === "edit") return "update";
    if (value === "remove") return "delete";
    if (ACTIONS.includes(value) || value === "special") return value;
    return "special";
};

const inferModuleAction = (permission) => {
    const permissionName = permission?.permissionName || "";
    let moduleName = permission?.module || "";
    let action = normalizeAction(permission?.action);

    if (!moduleName && permissionName.includes(".")) {
        const [rawModule, rawAction] = permissionName.split(".", 2);
        moduleName = rawModule;
        action = normalizeAction(rawAction);
    }

    if (!moduleName && permissionName.startsWith("manage_")) {
        moduleName = permissionName.replace("manage_", "");
        action = "special";
    }

    if (!moduleName) {
        moduleName = "otros";
    }

    const normalizedModuleName = String(moduleName).toLowerCase();

    return {
        module: MODULE_ALIASES[normalizedModuleName] || normalizedModuleName,
        action,
    };
};

const formatModuleLabel = (module) =>
    MODULE_LABELS[module] ||
    String(module)
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

const arraysHaveSameValues = (arr1 = [], arr2 = []) => {
    if (arr1.length !== arr2.length) {
        return false;
    }

    const sorted1 = [...arr1].sort((a, b) => Number(a) - Number(b));
    const sorted2 = [...arr2].sort((a, b) => Number(a) - Number(b));
    return JSON.stringify(sorted1) === JSON.stringify(sorted2);
};

const flattenPermissionIds = (permissionGroups = []) =>
    permissionGroups.flatMap((permission) =>
        Array.isArray(permission?.permissions)
            ? permission.permissions.map((item) => item.id)
            : []
    );

const hasAnySelection = (permissionGroup = []) =>
    permissionGroup.some((permission) => Boolean(permission?.selected));

const RoleForm = (props) => {
    const { addRolesData, singleRole, editRole, permissionsArray, id } = props;
    const navigate = useNavigate();

    const [permissions, setPermissions] = useState(permissionsArray || []);
    const [saveButtonEnable, setSaveButtonEnable] = useState([]);
    const [allChecked, setAllChecked] = useState(false);
    const [rolesValue, setRolesValue] = useState({
        name: "",
        permissions: [],
    });
    const [errors, setErrors] = useState({
        name: "",
        permissions: "",
    });

    useEffect(() => {
        setPermissions(permissionsArray || []);
    }, [permissionsArray]);

    useEffect(() => {
        setRolesValue({
            name: singleRole ? singleRole.name : "",
            permissions: singleRole ? singleRole.permissions : [],
        });
    }, [singleRole]);

    useEffect(() => {
        const selected = permissions
            .filter((permission) => permission.selected)
            .map((permission) => permission.id);
        setSaveButtonEnable(selected);
        setAllChecked(permissions.length > 0 && permissions.every((item) => item.selected));
    }, [permissions]);

    const initialSelectedIds = useMemo(() => {
        if (!singleRole?.permissions) {
            return [];
        }
        return singleRole.permissions.map((permission) => permission.id);
    }, [singleRole]);

    const disabled =
        saveButtonEnable.length === 0 ||
        (singleRole &&
            singleRole.name === rolesValue.name &&
            arraysHaveSameValues(initialSelectedIds, saveButtonEnable));

    const permissionGroups = useMemo(() => {
        const grouped = {};
        permissions.forEach((permission) => {
            const { module, action } = inferModuleAction(permission);
            if (!grouped[module]) {
                grouped[module] = {
                    module,
                    label: formatModuleLabel(module),
                    actions: {},
                    specials: [],
                };
            }

            if (action === "special") {
                grouped[module].specials.push(permission);
            } else {
                if (!grouped[module].actions[action]) {
                    grouped[module].actions[action] = {
                        action,
                        permissions: [],
                    };
                }

                grouped[module].actions[action].permissions.push(permission);
            }
        });

        return Object.values(grouped)
            .map((group) => ({
                ...group,
                specials: [...group.specials].sort((a, b) =>
                    a.name.localeCompare(b.name)
                ),
            }))
            .sort((a, b) => a.label.localeCompare(b.label));
    }, [permissions]);

    const tablePermissionGroups = useMemo(() => {
        return permissionGroups.filter(
            (group) =>
                Object.values(group.actions).some(
                    (actionGroup) => actionGroup.permissions.length > 0
                )
        );
    }, [permissionGroups]);

    const additionalSpecialPermissions = useMemo(() => {
        return permissionGroups.flatMap((group) =>
            group.specials.map((permission) => ({
                ...permission,
                moduleLabel: group.label,
            }))
        );
    }, [permissionGroups]);

    const handleValidation = () => {
        const validationErrors = {};
        let isValid = false;

        if (!rolesValue.name) {
            validationErrors.name = getFormattedMessage("role.input.name.validate.label");
        } else if (rolesValue.name.length > 50) {
            validationErrors.name = getFormattedMessage("role.input.name.valid.validate.label");
        } else if (saveButtonEnable.length === 0) {
            validationErrors.permissions = "Please select permissions";
        } else {
            isValid = true;
        }

        setErrors(validationErrors);
        return isValid;
    };

    const onChangeInput = (event) => {
        event.preventDefault();
        setRolesValue((inputs) => ({ ...inputs, [event.target.name]: event.target.value }));
        setErrors({});
    };

    const setPermissionCheckedByIds = (ids, checked) => {
        const permissionIds = Array.isArray(ids) ? ids : [ids];
        setPermissions((prevPermissions) =>
            prevPermissions.map((permission) =>
                permissionIds.includes(permission.id)
                    ? { ...permission, selected: checked }
                    : permission
            )
        );
    };

    const handleChanged = (permissionIds, checked) => {
        setPermissionCheckedByIds(permissionIds, checked);
    };

    const handleAllChanged = (checked) => {
        setPermissions((prevPermissions) =>
            prevPermissions.map((permission) => ({ ...permission, selected: checked }))
        );
    };

    const toggleModuleAll = (moduleName, checked) => {
        const ids = tablePermissionGroups
            .filter((group) => group.module === moduleName)
            .flatMap((group) =>
                flattenPermissionIds(Object.values(group.actions))
            );

        setPermissionCheckedByIds(ids, checked);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (!handleValidation()) {
            return;
        }

        addRolesData({
            ...rolesValue,
            permissions: saveButtonEnable,
        });
    };

    const onEdit = (event) => {
        event.preventDefault();
        if (!handleValidation() || disabled) {
            return;
        }

        editRole(
            id,
            {
                ...rolesValue,
                permissions: saveButtonEnable,
            },
            navigate
        );
    };

    return (
        <div className="container-fluid pt-10">
            <div className="card custom-card p-5 bg-white">
                <Form className="m-4">
                    <div className="row">
                        <div className="col-md-12">
                            <Form.Group className="mb-5 form-group">
                                <Form.Label className="form-label fs-6 fw-bolder text-gray-700 mb-3">
                                    {getFormattedMessage("globally.input.name.label")}:
                                </Form.Label>
                                <span className="required" />
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder={placeholderText("globally.input.name.placeholder.label")}
                                    className="form-control-solid"
                                    autoFocus
                                    onChange={onChangeInput}
                                    value={rolesValue.name}
                                />
                                <span className="text-danger">{errors.name || null}</span>
                            </Form.Group>
                        </div>

                        <div className="col-md-12">
                            <Form.Group className="mb-5 form-group">
                                <div className="d-flex col-md-12 flex-wrap align-items-center justify-content-between mb-4 gap-3">
                                    <Form.Label className="form-label fs-6 fw-bolder text-gray-700 mb-0">
                                        {getFormattedMessage("role.input.permission.label")}:
                                    </Form.Label>
                                    <span className="required" />
                                </div>

                                <div className="table-responsive">
                                    <table className="table align-middle table-row-bordered">
                                        <thead>
                                            <tr>
                                                <th>
                                                    <label className="form-check form-check-custom form-check-solid form-check-inline d-flex align-items-center my-0 cursor-pointer custom-label">
                                                        <input
                                                            id="selectAllGlobal"
                                                            type="checkbox"
                                                            checked={allChecked}
                                                            onChange={(event) =>
                                                                handleAllChanged(event.target.checked)
                                                            }
                                                            className="me-3 form-check-input cursor-pointer"
                                                        />
                                                        <div className="control__indicator" />
                                                        {getFormattedMessage(
                                                            "role.select.all-permission.label"
                                                        )}
                                                    </label>
                                                </th>
                                                {ACTIONS.map((action) => (
                                                    <th
                                                        className="text-center"
                                                        key={`permission-head-${action}`}
                                                    >
                                                        {ACTION_LABELS[action]}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tablePermissionGroups.map((group) => {
                                                const modulePermissions = flattenPermissionIds(
                                                    Object.values(group.actions)
                                                );
                                                const isModuleChecked =
                                                    modulePermissions.length > 0 &&
                                                    modulePermissions.every((permissionId) =>
                                                        permissions.some(
                                                            (permission) =>
                                                                permission.id === permissionId &&
                                                                permission.selected
                                                        )
                                                    );

                                                return (
                                                    <tr key={group.module}>
                                                        <td>
                                                            <label className="form-check form-check-custom form-check-solid form-check-inline d-flex align-items-center my-0 cursor-pointer custom-label">
                                                                <input
                                                                    type="checkbox"
                                                                    className="me-3 form-check-input cursor-pointer"
                                                                    checked={isModuleChecked}
                                                                    onChange={(event) =>
                                                                        toggleModuleAll(
                                                                            group.module,
                                                                            event.target.checked
                                                                        )
                                                                    }
                                                                />
                                                                <div className="control__indicator" />
                                                                {group.label}
                                                            </label>
                                                        </td>
                                                        {ACTIONS.map((action) => {
                                                            const actionGroup =
                                                                group.actions[action];
                                                            const actionPermissions =
                                                                actionGroup?.permissions || [];
                                                            const actionPermissionIds =
                                                                actionPermissions.map(
                                                                    (permission) => permission.id
                                                                );
                                                            const isActionChecked =
                                                                hasAnySelection(
                                                                    actionPermissions
                                                                );

                                                            return (
                                                                <td
                                                                    className="text-center"
                                                                    key={`${group.module}-${action}`}
                                                                >
                                                                    {actionPermissions.length > 0 ? (
                                                                        <input
                                                                            type="checkbox"
                                                                            className="form-check-input cursor-pointer"
                                                                            checked={isActionChecked}
                                                                            onChange={(event) =>
                                                                                handleChanged(
                                                                                    actionPermissionIds,
                                                                                    event.target.checked
                                                                                )
                                                                            }
                                                                        />
                                                                    ) : (
                                                                        <span className="text-muted">-</span>
                                                                    )}
                                                                </td>
                                                            );
                                                        })}
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>

                                {additionalSpecialPermissions.length > 0 && (
                                    <div className="mt-4">
                                        <h6 className="mb-3">Permisos adicionales</h6>
                                        <div className="d-flex col-md-12 flex-wrap">
                                            {additionalSpecialPermissions.map((permission) => (
                                                <div className="col-md-4" key={permission.id}>
                                                    <label className="form-check form-check-custom form-check-solid form-check-inline d-flex align-items-center my-3 cursor-pointer custom-label">
                                                        <input
                                                            type="checkbox"
                                                            checked={Boolean(permission.selected)}
                                                            onChange={(event) =>
                                                                handleChanged(
                                                                    permission.id,
                                                                    event.target.checked
                                                                )
                                                            }
                                                            className="me-3 form-check-input cursor-pointer"
                                                        />
                                                        <div className="control__indicator" />
                                                        {`${permission.moduleLabel}: ${permission.name}`}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <span className="text-danger">{errors.permissions || null}</span>
                            </Form.Group>
                        </div>

                        <div className="d-flex mt-5">
                            {singleRole ? (
                                <div onClick={onEdit}>
                                    <input
                                        className="btn btn-primary me-3"
                                        type="submit"
                                        value={placeholderText("globally.save-btn")}
                                        disabled={disabled}
                                    />
                                </div>
                            ) : (
                                <div onClick={onSubmit}>
                                    <input
                                        className="btn btn-primary me-3"
                                        type="submit"
                                        value={placeholderText("globally.save-btn")}
                                        disabled={!rolesValue.name || saveButtonEnable.length === 0}
                                    />
                                </div>
                            )}
                            <Link to="/app/roles" className="btn btn-light btn-active-light-primary me-3">
                                {getFormattedMessage("globally.cancel-btn")}
                            </Link>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default connect(null, { editRole })(RoleForm);

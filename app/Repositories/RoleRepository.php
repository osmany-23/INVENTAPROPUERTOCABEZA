<?php

namespace App\Repositories;

use App\Models\Permission;
use App\Models\Role;
use Exception;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

/**
 * Class RoleRepository
 */
class RoleRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'name',
        'display_name',
        'created_at',
    ];

    /**
     * Return searchable fields
     */
    public function getFieldsSearchable(): array
    {
        return $this->fieldSearchable;
    }

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Role::class;
    }

    /**
     * @return \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Eloquent\Model
     */
    public function storeRole($input)
    {
        try {
            DB::beginTransaction();
            $input['display_name'] = $input['name'];
            $input['permissions'] = $this->expandPermissionsWithLegacy($input['permissions'] ?? []);
            /** @var Role $role */
            $role = Role::create($input);
            $role->givePermissionTo($input['permissions']);
            DB::commit();

            return $role;
        } catch (Exception $exception) {
            DB::rollBack();
            throw new UnprocessableEntityHttpException($exception->getMessage());
        }
    }

    /**
     * @return mixed
     */
    public function updateRole($input, $id)
    {
        try {
            DB::beginTransaction();
            $input['display_name'] = $input['name'];
            $input['permissions'] = $this->expandPermissionsWithLegacy($input['permissions'] ?? []);
            /** @var Role $role */
            $role = Role::find($id);
            $role->update($input);
            $role->syncPermissions($input['permissions']);
            DB::commit();

            return $role;
        } catch (Exception $exception) {
            throw new UnprocessableEntityHttpException($exception->getMessage());
        }
    }

    private function expandPermissionsWithLegacy(array $permissions): array
    {
        $permissions = array_values(array_filter($permissions, function ($permission) {
            return ! is_null($permission) && $permission !== '';
        }));

        if (empty($permissions)) {
            return [];
        }

        $permissionIds = collect($permissions)
            ->filter(fn ($permission) => is_numeric($permission))
            ->map(fn ($permission) => (int) $permission)
            ->values()
            ->all();

        $permissionNames = collect($permissions)
            ->reject(fn ($permission) => is_numeric($permission))
            ->map(fn ($permission) => strtolower(trim((string) $permission)))
            ->filter()
            ->values()
            ->all();

        $selectedPermissions = Permission::query()
            ->where(function ($query) use ($permissionIds, $permissionNames) {
                if (! empty($permissionIds)) {
                    $query->whereIn('id', $permissionIds);
                }

                if (! empty($permissionNames)) {
                    if (! empty($permissionIds)) {
                        $query->orWhereIn('name', $permissionNames);
                    } else {
                        $query->whereIn('name', $permissionNames);
                    }
                }
            })
            ->get(['id', 'name']);

        if ($selectedPermissions->isEmpty()) {
            return array_values(array_unique($permissionIds));
        }

        $selectedIds = $selectedPermissions->pluck('id')->all();
        $selectedNames = $selectedPermissions->pluck('name')->all();

        $legacyNames = collect(expandPermissionsWithLegacyNames($selectedNames))
            ->filter(fn ($permissionName) => str_starts_with($permissionName, 'manage_'))
            ->unique()
            ->values()
            ->all();

        $legacyIds = Permission::query()
            ->whereIn('name', $legacyNames)
            ->pluck('id')
            ->all();

        return array_values(array_unique(array_merge($selectedIds, $legacyIds)));
    }
}

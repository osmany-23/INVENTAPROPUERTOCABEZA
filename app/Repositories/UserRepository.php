<?php

namespace App\Repositories;

use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

/**
 * Class UserRepository
 */
class UserRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'created_at',
        //        'roles.name',
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
        return User::class;
    }

    /**
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator|\Illuminate\Support\Collection|mixed
     */
    public function storeUser($input)
    {
        try {
            DB::beginTransaction();
            $input['password'] = Hash::make($input['password']);
            $user = $this->create($input);
            if (isset($input['role_id'])) {
                $user->assignRole($input['role_id']);
            }
            if (isset($input['image']) && ! empty($input['image'])) {
                $user->addMedia($input['image'])->toMediaCollection(User::PATH,
                    config('app.media_disc'));
            }
            DB::commit();

            return $user;
        } catch (Exception $e) {
            DB::rollBack();
            throw new UnprocessableEntityHttpException($e->getMessage());
        }
    }

    /**
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator|\Illuminate\Support\Collection|mixed
     */
    public function updateUser($input, $id)
    {
        try {
            DB::beginTransaction();

            if (empty($input['password'])) {
                unset($input['password']);
            } else {
                $input['password'] = Hash::make($input['password']);
            }

            unset($input['confirm_password']);

            $user = $this->update($input, $id);

            if (isset($input['role_id'])) {
                $user->syncRoles($input['role_id']);
            }
            if (isset($input['image']) && $input['image']) {
                $user->clearMediaCollection(User::PATH);
                $user['image_url'] = $user->addMedia($input['image'])->toMediaCollection(User::PATH,
                    config('app.media_disc'));
            }
            DB::commit();

            return $user;
        } catch (Exception $e) {
            DB::rollBack();
            throw new UnprocessableEntityHttpException($e->getMessage());
        }
    }

    /**
     * @return User|\Illuminate\Contracts\Auth\Authenticatable|null
     */
    public function updateUserProfile($input)
    {
        try {
            DB::beginTransaction();
            unset($input['role_id']);

            $user = Auth::user();
            $user->update($input);

            if ((! empty($input['image']))) {
                $user->clearMediaCollection(User::PATH);
                $user->media()->delete();
                $user->addMedia($input['image'])->toMediaCollection(User::PATH, config('app.media_disc'));
            }
            DB::commit();

            return $user;
        } catch (\Exception $e) {
            DB::rollBack();

            throw new UnprocessableEntityHttpException($e->getMessage());
        }
    }

    /**
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator|\Illuminate\Support\Collection|mixed
     */
    public function getUsers($perPage)
    {
        $loginUserId = Auth::id();

        if (request()->get('returnAll') == 'true') {
            return $this->paginate($perPage);
        }

        return $this->scopeQuery(function ($query) use ($loginUserId) {
            return $query->where('id', '!=', $loginUserId);
        })->paginate($perPage);
    }

    public function updatePassword(array $input): User
    {
        /** @var User $user */
        $user = Auth::user();
        if (! Hash::check($input['current_password'], $user->password)) {
            throw new UnprocessableEntityHttpException('Current password is invalid.');
        }
        $input['password'] = Hash::make($input['new_password']);
        $user->update($input);

        return $user;
    }

    public function updateUserCredentials(array $input, int $id): User
    {
        try {
            DB::beginTransaction();

            /** @var User $targetUser */
            $targetUser = User::findOrFail($id);

            $targetUser->email = $input['email'];
            $targetUser->password = Hash::make($input['password']);
            $targetUser->save();

            DB::commit();

            return $targetUser;
        } catch (Exception $e) {
            DB::rollBack();
            throw new UnprocessableEntityHttpException($e->getMessage());
        }
    }
}

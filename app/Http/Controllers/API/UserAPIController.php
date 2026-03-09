<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\UpdateChangePasswordRequest;
use App\Http\Requests\UpdateUserCredentialsRequest;
use App\Http\Requests\UpdateUserProfileRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use App\Models\POSRegister;
use App\Models\User;
use App\Repositories\UserRepository;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * Class UserAPIController
 */
class UserAPIController extends AppBaseController
{
    /** @var UserRepository */
    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function index(Request $request): UserCollection
    {
        abort_unless(hasPermissionStrict('user.view'), 403);

        $perPage = getPageSize($request);
        $users = $this->userRepository->getUsers($perPage);
        UserResource::usingWithCollection();

        return new UserCollection($users);
    }

    public function store(CreateUserRequest $request): UserResource
    {
        abort_unless(hasPermissionStrict('user.create'), 403);

        $input = $request->all();
        $user = $this->userRepository->storeUser($input);

        return new UserResource($user);
    }

    public function show($id): UserResource
    {
        abort_unless(hasPermissionStrict('user.view'), 403);

        $user = $this->userRepository->find($id);

        return new UserResource($user);
    }

    /**
     * @return UserResource|JsonResponse
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        abort_unless(hasPermissionStrict('user.update'), 403);

        if (Auth::id() == $user->id) {
            return $this->sendError('User can\'t be updated.');
        }
        $input = $request->all();
        $user = $this->userRepository->updateUser($input, $user->id);

        return new UserResource($user);
    }

    public function destroy(User $user): JsonResponse
    {
        abort_unless(hasPermissionStrict('user.delete'), 403);

        if (Auth::id() == $user->id) {
            return $this->sendError('User can\'t be deleted.');
        }
        $this->userRepository->delete($user->id);

        return $this->sendSuccess('User deleted successfully');
    }

    public function updateCredentials(UpdateUserCredentialsRequest $request, User $user): UserResource
    {
        abort_unless(hasPermissionStrict('user.update_credentials'), 403);

        $input = $request->only(['email', 'password']);
        $updatedUser = $this->userRepository->updateUserCredentials($input, $user->id);

        return new UserResource($updatedUser);
    }

    public function editProfile(): UserResource
    {
        $user = Auth::user();

        return new UserResource($user);
    }

    public function updateProfile(UpdateUserProfileRequest $request): UserResource
    {
        $input = $request->all();
        $updateUser = $this->userRepository->updateUserProfile($input);

        return new UserResource($updateUser);
    }

    public function changePassword(UpdateChangePasswordRequest $request): JsonResponse
    {
        $input = $request->all();
        try {
            $this->userRepository->updatePassword($input);

            return $this->sendSuccess('Password updated successfully');
        } catch (Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }

    public function updateLanguage(Request $request): JsonResponse
    {
        $language = $request->get('language');
        $user = Auth::user();
        $user->update([
            'language' => $language,
        ]);

        return $this->sendResponse($user->language, 'Language Updated Successfully');
    }

    public function config(Request $request)
    {
        $user = Auth::user();

        $userPermissions = expandPermissionsWithLegacyNames(
            $user->getAllPermissions()->pluck('name')->toArray()
        );

        $composerData = [];
        $composerPath = base_path('composer.json');
        if (is_readable($composerPath)) {
            $composerData = json_decode(file_get_contents($composerPath), true) ?: [];
        }
        $currentVersion = $composerData['version'] ?? '';
        $dateFormat = getSettingValue('date_format', 'Y-m-d');

        $openRegister = POSRegister::where('user_id', Auth::id())
            ->whereNull('closed_at')
            ->exists();

        return $this->sendResponse([
            'permissions' => $userPermissions,
            'version' => $currentVersion,
            'date_format' => $dateFormat,
            'is_version' => getSettingValue('show_version_on_footer', 0),
            'is_currency_right' => getSettingValue('is_currency_right', 0),
            'open_register' => $openRegister ? false : true,
        ], 'Config retrieved successfully.');
    }
}

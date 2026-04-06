<?php

namespace App\Repositories;

use App\DotenvEditor;
use App\Models\Setting;
use Exception;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;
use Throwable;

/**
 * Class SettingRepository
 */
class SettingRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'key',
        'value',
    ];

    /**
     * @var string[]
     */
    protected $allowedFields = [
        'key',
        'value',
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
    public function model(): string
    {
        return Setting::class;
    }

    /**
     * @return mixed
     */
    public function updateSettings($input)
    {
        try {
            DB::beginTransaction();
            if (isset($input['logo']) && !empty($input['logo'])) {
                /** @var Setting $setting */
                $setting = Setting::where('key', '=', 'logo')->first();
                $preparedLogo = $this->prepareSystemLogoUpload($input['logo']);
                try {
                    $setting->clearMediaCollection(Setting::PATH);
                    $mediaAdder = $setting->addMedia($preparedLogo);

                    if ($preparedLogo !== $input['logo']) {
                        $mediaAdder->usingFileName($this->getLogoFileName($input['logo']));
                    }

                    $media = $mediaAdder->toMediaCollection(Setting::PATH, config('app.media_disc'));
                } finally {
                    if (is_string($preparedLogo) && File::exists($preparedLogo)) {
                        File::delete($preparedLogo);
                    }
                }

                $setting = $setting->refresh();
                $setting->update(['value' => $media->getFullUrl()]);
                $input['logo'] = $setting->getLogoAttribute();
            }

            $settingInputArray = Arr::only($input, [
                'currency', 'email', 'company_name', 'phone', 'developed', 'footer', 'default_language',
                'default_customer', 'default_warehouse', 'stripe_key', 'stripe_secret', 'sms_gateway', 'twillo_sid',
                'twillo_token', 'twillo_from', 'smtp_host', 'smtp_port', 'smtp_username', 'smtp_password',
                'smtp_Encryption', 'address', 'show_version_on_footer', 'country', 'state', 'city', 'postcode',
                'date_format', 'purchase_code', 'purchase_return_code', 'sale_code', 'sale_return_code', 'expense_code',
                'is_currency_right', 'show_logo_in_receipt', 'show_app_name_in_sidebar', 'require_initial_payment',
            ]);

            $booleanSettingKeys = [
                'show_version_on_footer',
                'is_currency_right',
                'show_logo_in_receipt',
                'show_app_name_in_sidebar',
                'require_initial_payment',
            ];

            foreach ($settingInputArray as $key => $value) {
                if (in_array($key, $booleanSettingKeys, true)) {
                    Setting::query()->updateOrCreate(
                        ['key' => $key],
                        ['value' => filter_var($value, FILTER_VALIDATE_BOOLEAN) ? '1' : '0']
                    );
                    continue;
                }

                if (isset($value) && $value !== '') {
                    Setting::query()->updateOrCreate(['key' => $key], ['value' => $value]);
                }
            }
            $input['logo'] = Setting::where('key', '=', 'logo')->first()->logo;
            DB::commit();

            return $input;
        } catch (Exception $exception) {
            DB::rollBack();
            throw new UnprocessableEntityHttpException($exception->getMessage());
        }
    }

    public function updateReceiptSetting($input)
    {
        try {
            DB::beginTransaction();

            $settingInputArray = Arr::only($input, ['show_note','show_phone','show_customer','show_address','show_email','show_warehouse','show_tax_discount_shipping','show_logo_in_receipt','show_barcode_in_receipt','notes', 'show_product_code']);

            foreach ($settingInputArray as $key => $value) {
                $setting = Setting::where('key' ,$key)->first();
                if($setting){
                    $setting->update(['value' => $value]);
                }
                else
                {
                    $setting = new Setting();
                    $setting->key = $key;
                    $setting->value = $value;
                    $setting->save();
                }
            }
            DB::commit();

            return $input;
        } catch (Exception $exception) {
            DB::rollBack();
            throw new UnprocessableEntityHttpException($exception->getMessage());
        }
    }

    public function updateMailEnvSetting($input)
    {
        $env = new DotenvEditor();
        $inputArr = Arr::except($input, ['_token']);
        $env->setAutoBackup(true);

        $envData = [
            'MAIL_MAILER' => (empty($inputArr['mail_mailer'])) ? '' : $inputArr['mail_mailer'],
            'MAIL_HOST' => (empty($inputArr['mail_host'])) ? '' : $inputArr['mail_host'],
            'MAIL_PORT' => (empty($inputArr['mail_port'])) ? '' : $inputArr['mail_port'],
            'MAIL_USERNAME' => (empty($inputArr['mail_username'])) ? '' : $inputArr['mail_username'],
            'MAIL_PASSWORD' => (empty($inputArr['mail_password'])) ? '' : $inputArr['mail_password'],
            'MAIL_FROM_ADDRESS' => (empty($inputArr['mail_from_address'])) ? '' : $inputArr['mail_from_address'],
            'MAIL_ENCRYPTION' => (empty($inputArr['mail_encryption'])) ? '' : $inputArr['mail_encryption'],
        ];

        foreach ($envData as $key => $value) {
            $this->createOrUpdateEnv($env, $key, $value);
        }
    }

    public function createOrUpdateEnv($env, $key, $value): bool
    {
        if (!$env->keyExists($key)) {
            $env->addData([
                $key => $value,
            ]);

            return true;
        }
        $env->changeEnv([
            $key => $value,
        ]);

        return true;
    }

    /**
     * @return mixed
     */
    public function getEnvData()
    {
        $env = new DotenvEditor();
        $key = $env->getContent();
        $data = collect($key)->only([
            'MAIL_MAILER', 'MAIL_HOST', 'MAIL_PORT', 'MAIL_USERNAME', 'MAIL_PASSWORD', 'MAIL_FROM_ADDRESS', 'MAIL_ENCRYPTION',
        ])->toArray();

        return [
            'mail_mailer' => $data['MAIL_MAILER'],
            'mail_host' => $data['MAIL_HOST'],
            'mail_port' => $data['MAIL_PORT'],
            'mail_username' => $data['MAIL_USERNAME'],
            'mail_password' => $data['MAIL_PASSWORD'],
            'mail_from_address' => $data['MAIL_FROM_ADDRESS'],
            'mail_encryption' => $data['MAIL_ENCRYPTION'],
        ];
    }

    private function prepareSystemLogoUpload(UploadedFile $logo)
    {
        $extension = strtolower($logo->getClientOriginalExtension() ?: $logo->extension() ?: 'png');

        if (!in_array($extension, ['png', 'jpg', 'jpeg', 'webp', 'gif'], true)) {
            return $logo;
        }

        $tempDirectory = storage_path('app/temp/system-logos');
        File::ensureDirectoryExists($tempDirectory);

        $temporaryLogoPath = $tempDirectory.DIRECTORY_SEPARATOR.uniqid('system-logo-', true).'.'.$extension;

        try {
            $manager = new ImageManager([
                'driver' => config('media-library.image_driver', 'gd'),
            ]);

            $bestCandidate = $this->getBestLogoTrimCandidate(
                $manager,
                $logo->getRealPath(),
                $extension
            );

            if ($bestCandidate === null) {
                return $logo;
            }

            $bestCandidate->save($temporaryLogoPath, 90);

            return $temporaryLogoPath;
        } catch (Throwable $exception) {
            if (File::exists($temporaryLogoPath)) {
                File::delete($temporaryLogoPath);
            }

            return $logo;
        }
    }

    private function getBestLogoTrimCandidate(
        ImageManager $manager,
        string $sourcePath,
        string $extension
    ) {
        $sourceImage = $manager->make($sourcePath)->orientate();
        $originalArea = max(1, $sourceImage->width() * $sourceImage->height());
        $bestCandidate = null;
        $bestArea = $originalArea;

        $trimStrategies = [];

        if (in_array($extension, ['png', 'webp', 'gif'], true)) {
            $trimStrategies[] = 'transparent';
        }

        $trimStrategies[] = 'top-left';
        $trimStrategies[] = 'bottom-right';

        foreach ($trimStrategies as $trimStrategy) {
            $candidate = $manager->make($sourcePath)->orientate();
            $candidate->trim($trimStrategy, null, 20, 0);

            $candidateArea = max(1, $candidate->width() * $candidate->height());

            if ($candidateArea < $bestArea) {
                $bestArea = $candidateArea;
                $bestCandidate = $candidate;
            }
        }

        if ($bestCandidate === null) {
            return null;
        }

        $trimmedEnough = $bestArea <= (int) ($originalArea * 0.92);

        return $trimmedEnough ? $bestCandidate : null;
    }

    private function getLogoFileName(UploadedFile $logo): string
    {
        $name = pathinfo($logo->getClientOriginalName(), PATHINFO_FILENAME);
        $extension = strtolower($logo->getClientOriginalExtension() ?: $logo->extension() ?: 'png');

        return (Str::slug($name) ?: 'system-logo').'.'.$extension;
    }
}

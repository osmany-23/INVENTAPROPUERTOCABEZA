<?php

namespace Database\Seeders;

use App\Models\MailTemplate;
use Illuminate\Database\Seeder;

class DefaultEmailTemplateSeeder extends Seeder
{
    public function run(): void
    {
        MailTemplate::query()->updateOrCreate(
            ['type' => MailTemplate::MAIL_TYPE_SALE],
            [
                'template_name' => 'GREETING TO CUSTOMER ON SALES !',
                'content' => '<p>Hi, {customer_name}</p><p>Your sales Id is {sales_id}</p><p>Sales Date: {sales_date}</p><p>Total Amount: {sales_amount}</p><p>You have paid: {paid_amount}</p><p>Due amount: {due_amount}</p><p>Regards,  {app_name}</p>',
                'status' => false,
            ]
        );

        MailTemplate::query()->updateOrCreate(
            ['type' => MailTemplate::MAIL_TYPE_SALE_RETURN],
            [
                'template_name' => 'GREETING TO CUSTOMER ON SALES RETURN !',
                'content' => '<p>Hi, {customer_name}</p><p>Your sales return Id is {sales_return_id}</p><p>Sales return Date: {sales_return_date}</p><p>Total Amount: {sales_return_amount}</p><p>Regards,  {app_name}</p>',
                'status' => false,
            ]
        );
    }
}

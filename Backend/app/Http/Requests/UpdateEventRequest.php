<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEventRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
    'admin_id'    => 'exists:users,id',
    'title'       => 'sometimes|string|max:255',
    'description' => 'sometimes|string',
    'location'    => 'sometimes|string',
    'date'        => 'sometimes|date',
    'capacity'    => 'sometimes|integer|min:1',
    'price'       => 'sometimes|numeric|min:0',
    'image_path'  => 'sometimes|image|mimes:jpg,jpeg,png,webp|max:2048',
    'status'      => 'sometimes|in:active,inactive',
        ];
    }
}

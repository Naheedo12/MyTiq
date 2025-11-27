<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEventRequest extends FormRequest
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
    'title'       => 'required|string|max:255',
    'description' => 'required|string',
    'location'    => 'required|string',
    'date'        => 'required|date',
    'capacity'    => 'required|integer|min:1',
    'price'       => 'required|numeric|min:0',
    'image_path'  => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
    'status'      => 'required|in:active,inactive',
        ];
    }
}

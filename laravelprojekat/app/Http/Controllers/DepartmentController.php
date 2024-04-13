<?php

namespace App\Http\Controllers;

use App\Http\Resources\DepartmentResource;
use Illuminate\Http\Request;
use App\Models\Department;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class DepartmentController extends Controller
{
    public function index()
    {
        $departments = Department::all();

        return response()->json(['departments' => DepartmentResource::collection($departments)]);
    }

    public function show($id)
    {
        $department = Department::findOrFail($id);

        return response()->json(['department' => $department]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'description' => 'required|string',
            'address' => 'required|string',
            'contact_phone' => 'required|string',
            'contact_email' => 'required|email',
            'head_of_department' => 'required|string',
            'number_of_employees' => 'required|integer',
            'budget' => 'required|numeric',
            'founding_year' => 'required|date_format:Y',
            'facilities' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->toArray());
        }

        $department = Department::create($request->all());

        return response()->json(['department' => new DepartmentResource($department)], 201);
    }

    public function update(Request $request, $id)
    {
        $department = Department::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'description' => 'required|string',
            'address' => 'required|string',
            'contact_phone' => 'required|string',
            'contact_email' => 'required|email',
            'head_of_department' => 'required|string',
            'number_of_employees' => 'required|integer',
            'budget' => 'required|numeric',
            'founding_year' => 'required|date_format:Y',
            'facilities' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->toArray());
        }

        $department->update($request->all());

        return response()->json(['department' => new DepartmentResource($department)]);
    }

    public function destroy($id)
    {
        $department = Department::findOrFail($id);
        $department->delete();

        return response()->json(['message' => 'Department deleted successfully']);
    }
}

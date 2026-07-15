<?php

namespace App\Http\Controllers;

use App\Models\GalleryImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{
    public function index()
    {
        // Return latest uploaded images first
        return response()->json(GalleryImage::orderBy('created_at', 'desc')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'image' => 'nullable|file|image|max:5120', // Supports up to 5MB uploads
            'url' => 'nullable|string',
        ]);

        $url = $request->url;

        // Save local file if uploaded
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $path = $file->store('uploads', 'public');
            $url = asset('storage/' . $path);
        }

        if (empty($url)) {
            return response()->json(['error' => 'No image file or URL provided.'], 400);
        }

        $image = GalleryImage::create([
            'title' => $request->title,
            'category' => $request->category,
            'url' => $url,
        ]);

        return response()->json($image, 201);
    }

    public function destroy($id)
    {
        $image = GalleryImage::findOrFail($id);

        // Remove physical local file if it resides in storage uploads
        if (str_contains($image->url, '/storage/uploads/')) {
            $filename = basename($image->url);
            Storage::disk('public')->delete('uploads/' . $filename);
        }

        $image->delete();

        return response()->json(['message' => 'Image successfully removed from catalog.']);
    }
}

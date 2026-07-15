<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $images = [
            ['url' => '/wedding_reception.jpg', 'category' => 'Wedding', 'title' => 'Grand Reception'],
            ['url' => '/floral_centerpiece.jpg', 'category' => 'Wedding', 'title' => 'Elegant Florals'],
            ['url' => '/ruracio_njeri_ted.jpg', 'category' => 'Traditional', 'title' => 'Njeri & Ted Traditional Wedding'],
            ['url' => '/evening_reception.jpg', 'category' => 'Wedding', 'title' => 'Evening Ambiance'],
            ['url' => '/graduation_birthday.jpg', 'category' => 'Birthday', 'title' => 'Celebration Arch'],
            ['url' => 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80', 'category' => 'Wedding', 'title' => 'Luxury Bouquet'],
            ['url' => 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80', 'category' => 'Baby Shower', 'title' => 'Outdoor Baby Shower'],
            ['url' => 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80', 'category' => 'Wedding', 'title' => 'Floral Arches'],
            ['url' => 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80', 'category' => 'Evening', 'title' => 'Gala Night'],
            ['url' => 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80', 'category' => 'Birthday', 'title' => 'Vibrant Celebrations'],
            ['url' => 'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?auto=format&fit=crop&q=80', 'category' => 'Traditional', 'title' => 'Cultural Heritage'],
        ];

        foreach ($images as $img) {
            \App\Models\GalleryImage::create($img);
        }
    }
}

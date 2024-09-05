<?php

namespace App\Models;

use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Spatie\Permission\Models\Role as SpatieRole;

class role extends SpatieRole
{
    use HasSlug;

    protected $fillable = [
        'name',
        'full_name',
        'guard_name',
    ];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
        ->generateSlugsFrom('full_name')
        ->saveSlugsTo('name')
        ->doNotGenerateSlugsOnUpdate();
    }
}

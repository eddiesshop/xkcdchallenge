<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    protected $table = 'likes';

    protected $guarded = ['id'];

    public function user(){
        return $this->belongsTo('App\User');
    }
}

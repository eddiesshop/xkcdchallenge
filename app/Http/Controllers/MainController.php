<?php

namespace App\Http\Controllers;

use App\Like;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MainController extends Controller
{
    public function homepage()
    {
        return view('welcome');
    }

    public function mainpage(Request $request)
    {
        if(Auth::guest()) return $this->homepage();

        return view('main');
    }

    public function postLike(Request $request)
    {
        $like = Like::firstOrCreate([
            'user_id' => $request->user()->id,
            'comic_id' => $request->comic_id
        ]);

        return response()->json(['liked' => $like->exists, 'data' => $like]);
    }

    public function getLike(Request $request)
    {
        $result = Like::firstOrNew([
            'user_id' => $request->user()->id,
            'comic_id' => $request->comic_id
        ]);

        return response()->json(['liked' => $result->exists]);
    }

    public function getLikes(Request $request)
    {
        $likes = Like::whereUserId($request->user()->id)->get();

        return response()->json([
            'likes' => $likes,
            'count' => $likes->count()
        ]);
    }

    public function deleteLike(Request $request)
    {
        $like = Like::whereComicId($request->comic_id)->first();

        $result = $like ? $like->delete() : false;

        return response()->json(['deleted' => $result]);
    }
}

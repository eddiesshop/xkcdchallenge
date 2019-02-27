<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

Route::get('/', 'MainController@mainpage');

Route::group(['middleware' => ['auth']], function(){
    Route::get('like/{comic_id}', 'MainController@getLike');
    Route::post('like/{comic_id}', 'MainController@postLike');
    Route::delete('like/{comic_id}', 'MainController@deleteLike');
    Route::get('likes', 'MainController@getLikes');
});
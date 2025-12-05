<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Models\Event;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{
    public function index(){
        $events=Event::all();
        return response()->json(['message'=>'tous les evenements :',
                                 'events'=>$events]);
    }

    public function show(Event $event){
        return response()->json(['events'=>$event]);

    }

    public function store(StoreEventRequest $Request){
        $admin=Auth::user();
         $event=$Request->validated();
         $event['admin_id']=$admin->id;
         $result = Cloudinary::upload($Request->file('image_path')->getRealPath());
         $url = $result->getSecurePath();
         $event['image_path']=$url;
         $events=Event::create($event);
         return response()->json(['message'=>'Events ajouté avec succès',
                                'event'=>$events]);
    }

    public function update(UpdateEventRequest $Request ,Event $event){
        $events=$Request->validated();
        if ($Request->hasFile('image')) {
            if ($event->image_path) {
                $publicId = pathinfo(parse_url($event->image_path, PHP_URL_PATH), PATHINFO_FILENAME);
                Cloudinary::destroy($publicId);
            }

            $uploadedImage = Cloudinary::upload(
                $Request->file('image_path')->getRealPath(),
                ['resource_type' => 'image']
            )->getSecurePath();

            $events['image_path'] = $uploadedImage;
        }
        $event->update($events);

        return response()->json(['message'=>'events modifié avec succès',
                                 'events'=>$event]);

    }

    public function destroy(Event $event){
        if ($event->image_path) {
            $publicId = pathinfo(parse_url($event->image_path, PHP_URL_PATH), PATHINFO_FILENAME);

            Cloudinary::destroy($publicId, ['resource_type' => 'image']);
        }
        $event->delete();
        return response()->json(['message'=>'event supprimé avec succès']);
    }
}

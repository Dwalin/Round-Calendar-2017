<?php

//namespace RestApi\Api\Models;
use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Message;

class Counters extends Model
{
    public  $id;
    public  $name;

    public function initialize() {
        $this->hasMany(
            "id",
            "Counters",
            "type_id"
        );
    }


    public function beforeCreate() {

    }

    public function beforeUpdate() {

    }

}

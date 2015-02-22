<?php
namespace app\controllers;

use yii\rest\ActiveController;

class CatController extends ActiveController
{
    public $modelClass = 'app\models\Cat';
}
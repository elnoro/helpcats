<?php 
namespace app\models;

class CatSearchItem extends \yii\elasticsearch\ActiveRecord
{
    public function attributes()
    {
        return ['id', 'name', 'description'];
    }

    public function getCat()
    {
    	return Cat::findOne($this->id);
    }
}

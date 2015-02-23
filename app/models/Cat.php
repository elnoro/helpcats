<?php
namespace app\models;

use yii\db\ActiveRecord;

class Cat extends ActiveRecord
{
	public function fields()
	{
		return array_merge(parent::fields(), ['images' => function ($model) {
			$images = [];
			foreach ($model->images as $catImage) {
				$images[] = $catImage->url;
			}
			return $images;
		}]);
	}

	public function getImages()
	{
		return $this->hasMany(CatImage::className(), ['cat_id' => 'id']);
	}

	public function rules()
	{
		return [['source', 'unique']];
	}
}
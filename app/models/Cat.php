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

	public function afterSave()
	{
		if (is_null($item = CatSearchItem::get($this->id))) {
			$item = new CatSearchItem;
			$item->id = $this->id;
		} 
		$item->name = $this->name;
		$item->description = $this->description;
		$item->save();
	}

	public function afterDelete()
	{
		CatSearchItem::get($this->id)->delete();
	}
}
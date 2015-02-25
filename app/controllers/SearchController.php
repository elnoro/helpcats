<?php

namespace app\controllers;

use yii\rest\Controller;

class SearchController extends Controller
{
    public function actionIndex()
    {
        $query = \app\models\CatSearchItem::find()->query([
            "fuzzy_like_this" => [
                "fields" => ["name", "description"],
                "like_text" => \Yii::$app->request->getBodyParam('query', ''),
            ]
        ]);
        return array_map(function ($e) {
            return [
                'id'   => $e->primaryKey,
                'name' => $e->name,
            ];
        }, $query->all());
    }
}

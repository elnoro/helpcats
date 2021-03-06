<?php
namespace app\commands;

use yii\console\Controller;
use yii\helpers\Console;
use app\models\CatSearchItem;
use app\models\Cat;

class ParserController extends Controller
{
    public function actionRun() {
    	try {
	    	foreach ($this->getLinksToAds() as $link) {
	    		$this->parseAd($link);
	    	}
	    	echo $this->ansiFormat('Parsing finished', Console::FG_GREEN) . PHP_EOL;
	    	return self::EXIT_CODE_NORMAL;
    	}
    	catch (Exception $e) {
	    	echo $this->ansiFormat("Problem: {$e->getMessage()}", Console::FG_RED) . PHP_EOL;
	    	return self::EXIT_CODE_ERROR;
    	}
    }

    public function actionIndex()
    {
		\Yii::$app->elasticsearch->createCommand()->deleteAllIndexes();
		foreach (\app\models\Cat::find()->all() as $cat) {
			$item              = new \app\models\CatSearchItem;
			$item->primaryKey  = $cat->id;
			$item->name        = $cat->name;
			$item->description = $cat->description;
			$item->save();
		}
    }

	protected function getBaseUrl()
	{
		return 'https://www.avito.ru';
	}

	protected function getParserElem($url)
	{
		return \serhatozles\simplehtmldom\SimpleHTMLDom::file_get_html($url);
	}

	protected function getSourceUrl()
	{
		return $this->getBaseUrl() . "/rossiya/koshki?i=1&q=отдам";
	}

	protected function getLinksToAds()
	{
		$p = $this->getParserElem($this->getSourceUrl());
		$links = $p->find('.catalog-list a.photo-wrapper');
		return array_map(
			function ($href) { return $this->getBaseUrl() . $href; },
			array_map(function ($link) { return $link->href; }, $links)
		);
	}

    protected function parseAd($url)
    {
    	$p = $this->getParserElem($url);
    	$cat = new \app\models\Cat;
    	$cat->name = $p->find('h1', 0)->plaintext;
    	$cat->description = $p->find('#desc_text', 0)->plaintext;
    	$cat->contacts = trim($p->find('#seller', 0)->plaintext) . ', ' . trim($p->find('#map', 0)->plaintext);
    	$cat->source = $url;
    	if ($cat->save()) {
    		foreach ($p->find('a.gallery-link') as $a) {
    			if (!$a->hasAttribute('data-fallback')) // игнорируем дубликаты с большим разрешением
	    			$this->addImage($cat, $a->href);
    		}
    	}
    }

    protected function addImage(\app\models\Cat $cat, $url)
    {
		$image = new \app\models\CatImage;
		$image->cat_id = $cat->id;
		$image->url = $url;
		$image->save();
    }
}
